// Affiliate attribution (Phase B1): reads ?ref + UTM from the URL, registers the
// click with the tracking API once per page load, and persists the attribution
// locally so a later conversion can be credited.
//
// Privacy: only the affiliate identifiers, UTM values from the URL and a random
// visitor_id are stored. No IP, user-agent, device, fingerprint or PII.

const STORAGE_KEY = "lotus_affiliate_attribution_v1";
const TRACK_CLICK_URL = "https://aff.sonlotus.vn/api/affiliate/track-click";
const REF_PATTERN = /^[A-Za-z0-9-]{1,64}$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DEFAULT_COOKIE_DURATION_DAYS = 60;
const REQUEST_TIMEOUT_MS = 8_000;

export type AffiliateAttribution = {
  affiliate_code?: string;
  affiliate_link_id?: string;
  landing_page_id?: string;
  visitor_id: string;
  expires_at?: string;
  cookie_duration_days?: number;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

const isBrowser = () => typeof window !== "undefined" && typeof localStorage !== "undefined";

function devWarn(message: string) {
  if (import.meta.env.DEV) console.warn(`[affiliate-attribution] ${message}`);
}

function readStored(): AffiliateAttribution | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as AffiliateAttribution;
    return typeof record.visitor_id === "string" ? record : null;
  } catch {
    return null;
  }
}

function writeStored(record: AffiliateAttribution) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable (private mode / quota). Tracking must stay silent.
  }
}

function isExpired(record: AffiliateAttribution): boolean {
  if (!record.expires_at) return false;
  const expiresAt = Date.parse(record.expires_at);
  return Number.isNaN(expiresAt) || expiresAt <= Date.now();
}

/** True when the record holds a complete, API-verified, unexpired attribution. */
function hasLiveAttribution(record: AffiliateAttribution | null): boolean {
  if (!record?.affiliate_code || !record.affiliate_link_id || !record.landing_page_id) return false;
  return !isExpired(record);
}

export function createUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function resolveVisitorId(stored: AffiliateAttribution | null): string {
  const existing = stored?.visitor_id;
  return existing && UUID_PATTERN.test(existing) ? existing : createUuid();
}

function readParam(params: URLSearchParams, name: string): string | null {
  const value = params.get(name)?.trim();
  return value ? value.slice(0, 200) : null;
}

type TrackClickResult = {
  affiliate_code?: string;
  affiliate_link_id: string;
  landing_page_id: string;
  visitor_id?: string;
  expires_at: string;
  cookie_duration_days: number;
  counted?: boolean;
};

function asUuid(value: unknown): string | undefined {
  return typeof value === "string" && UUID_PATTERN.test(value) ? value : undefined;
}

/**
 * Validates the flat track-click response. Returns null unless the API confirmed
 * the click with both attribution ids, so unverified refs are never persisted.
 */
function normalizeResponse(json: unknown): TrackClickResult | null {
  if (!json || typeof json !== "object") return null;
  const payload = json as Record<string, unknown>;
  if (payload.success !== true) return null;

  const affiliate_link_id = asUuid(payload.affiliate_link_id);
  const landing_page_id = asUuid(payload.landing_page_id);
  if (!affiliate_link_id || !landing_page_id) {
    devWarn("track-click response is missing attribution ids");
    return null;
  }

  const cookieDuration = Number(payload.cookie_duration_days);
  const cookie_duration_days =
    Number.isFinite(cookieDuration) && cookieDuration > 0
      ? cookieDuration
      : DEFAULT_COOKIE_DURATION_DAYS;

  const rawExpires = typeof payload.expires_at === "string" ? payload.expires_at : undefined;
  const expires_at =
    rawExpires && !Number.isNaN(Date.parse(rawExpires))
      ? rawExpires
      : new Date(Date.now() + cookie_duration_days * 86_400_000).toISOString();

  const affiliateCode = typeof payload.affiliate_code === "string" ? payload.affiliate_code : "";

  return {
    affiliate_code: REF_PATTERN.test(affiliateCode) ? affiliateCode.toUpperCase() : undefined,
    affiliate_link_id,
    landing_page_id,
    visitor_id: asUuid(payload.visitor_id),
    expires_at,
    cookie_duration_days,
    counted: payload.counted === true,
  };
}

async function trackClick(body: Record<string, unknown>): Promise<TrackClickResult | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(TRACK_CLICK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
      keepalive: true,
    });
    if (!response.ok) {
      devWarn(`track-click responded with status ${response.status}`);
      return null;
    }
    return normalizeResponse(await response.json());
  } catch {
    devWarn("track-click request failed");
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/** Reads the stored attribution, dropping it if the cookie window has passed. */
export function getAffiliateAttribution(): AffiliateAttribution | null {
  if (!isBrowser()) return null;
  const stored = readStored();
  if (!stored) return null;
  if (!hasLiveAttribution(stored)) {
    // Expired or incomplete: drop everything except the visitor id.
    if (stored.affiliate_code) writeStored({ visitor_id: stored.visitor_id });
    return null;
  }
  return stored;
}

let started = false;

/**
 * Runs the attribution flow exactly once per page load. Safe to call from React
 * effects (StrictMode double-invoke and re-renders are ignored).
 */
export function initAffiliateAttribution(): void {
  if (!isBrowser() || started) return;
  started = true;

  const stored = readStored();
  const visitorId = resolveVisitorId(stored);
  const params = new URLSearchParams(window.location.search);
  const ref = readParam(params, "ref");
  const affiliateCode = ref && REF_PATTERN.test(ref) ? ref.toUpperCase() : null;

  // No usable ref in the URL: keep any live attribution, expire the rest.
  if (!affiliateCode) {
    if (stored && hasLiveAttribution(stored)) {
      if (stored.visitor_id !== visitorId) writeStored({ ...stored, visitor_id: visitorId });
      return;
    }
    writeStored({ visitor_id: visitorId });
    return;
  }

  const utmSource = readParam(params, "utm_source");
  const utmMedium = readParam(params, "utm_medium");
  const utmCampaign = readParam(params, "utm_campaign");

  void trackClick({
    affiliate_code: affiliateCode,
    landing_page_url: `${window.location.origin}/`,
    campaign: utmCampaign || null,
    visitor_id: visitorId,
    utm_medium: utmMedium || null,
    utm_campaign: utmCampaign || null,
  }).then((result) => {
    if (!result) {
      // Unverified refs are never persisted; only keep the visitor id so a later
      // visit can retry with the same identity.
      if (!hasLiveAttribution(readStored())) writeStored({ visitor_id: visitorId });
      return;
    }
    // Last valid affiliate ref wins.
    writeStored({
      affiliate_code: result.affiliate_code ?? affiliateCode,
      affiliate_link_id: result.affiliate_link_id,
      landing_page_id: result.landing_page_id,
      visitor_id: result.visitor_id ?? visitorId,
      expires_at: result.expires_at,
      cookie_duration_days: result.cookie_duration_days,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
    });
  });
}
