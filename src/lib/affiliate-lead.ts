// Affiliate lead tracking (Phase C): observes the conversion touchpoints on the
// landing page (order form submit, Zalo / hotline / email clicks) and turns them
// into an affiliate lead carrying the attribution stored by
// ./affiliate-attribution.
//
// Events are captured through a single delegated listener on `document`, so no
// component, CTA, form handler, GA4 or GTM wiring is touched.
//
// Privacy: `lead_data` only ever carries Lotus' own public contact details (the
// hotline / Zalo number / sales mailbox already hardcoded in components/lotus/
// constants.ts and rendered into the HTML). Customer name, phone, email,
// address, note and order contents are never read, stored or sent, and nothing
// is written to localStorage.
//
// NOTE: sending is intentionally DISABLED for Phase C. Flip
// LEAD_TRACKING_ENABLED to true to start posting to /track-lead.

import { getAffiliateAttribution } from "./affiliate-attribution";

const TRACK_LEAD_URL = "https://aff.sonlotus.vn/api/affiliate/track-lead";

/** Phase C ships with the request disabled — no customer/form/Zalo data leaves the page. */
const LEAD_TRACKING_ENABLED: boolean = false;

/** Boolean-only guard so refreshing the thank-you page cannot duplicate a lead. */
const FORM_LEAD_FLAG_KEY = "lotus_affiliate_lead_form_v1";
const REPEAT_EVENT_WINDOW_MS = 10_000;
const REQUEST_TIMEOUT_MS = 8_000;

export type LeadType = "form_submit" | "zalo_click" | "phone_click" | "email_click";

/**
 * Contact details of Lotus itself, echoed back so the affiliate dashboard knows
 * which channel was used. Never customer data.
 */
export type LeadData = {
  zalo_phone?: string;
  phone?: string;
  email?: string;
};

export type LeadPayload = {
  affiliate_code: string;
  affiliate_link_id: string;
  landing_page_id: string;
  visitor_id: string;
  lead_type: LeadType;
  lead_source: string;
  lead_data: LeadData;
};

const isBrowser = () => typeof window !== "undefined";

function devLog(message: string) {
  // Only the lead type / API error code is ever logged, and only outside production.
  if (import.meta.env.DEV) console.info(`[affiliate-lead] ${message}`);
}

/** Returns null when there is no live attribution — an organic visit is not an affiliate lead. */
export function buildLeadPayload(leadType: LeadType, leadData: LeadData): LeadPayload | null {
  const attribution = getAffiliateAttribution();
  if (!attribution?.affiliate_code) return null;
  if (!attribution.affiliate_link_id || !attribution.landing_page_id) return null;

  return {
    affiliate_code: attribution.affiliate_code,
    affiliate_link_id: attribution.affiliate_link_id,
    landing_page_id: attribution.landing_page_id,
    visitor_id: attribution.visitor_id,
    lead_type: leadType,
    lead_source: `${window.location.origin}/`,
    lead_data: leadData,
  };
}

/**
 * Fire-and-forget delivery, attempted at most once per event.
 *
 * `sendBeacon` goes first because a Zalo / hotline click navigates away and would
 * cancel an in-flight request. It carries `Content-Type: application/json` via the
 * Blob type, which stays inside the CORS-safelist so no preflight is triggered.
 * If the browser refuses to queue it we fall back to a single `keepalive` fetch.
 * In development we use fetch directly so the API response is visible.
 */
function sendLead(payload: LeadPayload): void {
  const body = JSON.stringify(payload);
  const beaconAvailable =
    !import.meta.env.DEV &&
    typeof navigator !== "undefined" &&
    typeof navigator.sendBeacon === "function";

  try {
    if (beaconAvailable) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(TRACK_LEAD_URL, blob)) return;
      devLog("sendBeacon refused the payload, falling back to fetch");
    }
    postLead(body);
  } catch {
    // Tracking must never surface an error to the visitor.
  }
}

function postLead(body: string): void {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  void fetch(TRACK_LEAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    signal: controller.signal,
    keepalive: true,
  })
    .then(async (response) => {
      if (!import.meta.env.DEV) return;
      if (!response.ok) return devLog(`track-lead responded with status ${response.status}`);
      const json = (await response.json()) as Record<string, unknown>;
      // Only the outcome is logged — never lead_id, visitor_id or affiliate_code.
      devLog(
        json.success === true
          ? `track-lead accepted "${String(json.lead_type ?? "")}"`
          : `track-lead rejected: ${String(json.error ?? "UNKNOWN")}`,
      );
    })
    .catch(() => devLog("track-lead request failed"))
    .finally(() => clearTimeout(timeout));
}

const lastSentAt = new Map<LeadType, number>();

/** Records one lead. Safe to call from anywhere; silently no-ops when not applicable. */
export function trackLead(leadType: LeadType, leadData: LeadData = {}): void {
  if (!isBrowser()) return;

  const previous = lastSentAt.get(leadType);
  if (previous !== undefined && Date.now() - previous < REPEAT_EVENT_WINDOW_MS) return;

  const payload = buildLeadPayload(leadType, leadData);
  if (!payload) return;
  lastSentAt.set(leadType, Date.now());

  if (!LEAD_TRACKING_ENABLED) {
    devLog(`captured "${leadType}" — sending disabled (LEAD_TRACKING_ENABLED = false)`);
    return;
  }
  sendLead(payload);
}

/** Digits only, so `tel:0943966662` and `zalo.me/0943966662` normalise identically. */
function digits(value: string): string | undefined {
  const cleaned = value.replace(/[^0-9+]/g, "").slice(0, 20);
  return cleaned || undefined;
}

type Classified = { leadType: LeadType; leadData: LeadData };

function classifyAnchor(target: EventTarget | null): Classified | null {
  if (!(target instanceof Element)) return null;
  const anchor = target.closest("a[href]");
  const href = anchor?.getAttribute("href");
  if (!href) return null;

  if (/^tel:/i.test(href)) {
    return { leadType: "phone_click", leadData: { phone: digits(href.slice(4)) } };
  }
  if (/^mailto:/i.test(href)) {
    const email = href.slice(7).split("?")[0].trim().slice(0, 120);
    return { leadType: "email_click", leadData: email ? { email } : {} };
  }
  try {
    const url = new URL(href, window.location.href);
    const host = url.hostname.toLowerCase();
    if (host === "zalo.me" || host.endsWith(".zalo.me")) {
      return {
        leadType: "zalo_click",
        leadData: { zalo_phone: digits(url.pathname.replace(/^\//, "")) },
      };
    }
  } catch {
    return null;
  }
  return null;
}

function handleClick(event: Event) {
  // Capture phase + passive: we only observe, never preventDefault or stopPropagation.
  const classified = classifyAnchor(event.target);
  if (classified) trackLead(classified.leadType, classified.leadData);
}

function readFormFlag(): boolean {
  try {
    return sessionStorage.getItem(FORM_LEAD_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

function writeFormFlag() {
  try {
    sessionStorage.setItem(FORM_LEAD_FLAG_KEY, "1");
  } catch {
    // Storage unavailable: worst case the lead is reported again on refresh.
  }
}

/**
 * The order form reports its lead from the thank-you page instead of the raw
 * `submit` event, because OrderForm only reaches /thank-you after Zod validation
 * and the upstream request both succeeded. The phone parameter is used purely as
 * proof that a submit happened — its value is never read, stored or sent, which
 * is why `lead_data` stays empty for form_submit.
 */
function trackConfirmedFormSubmit() {
  const path = window.location.pathname;
  if (!path.startsWith("/thank-you")) return;

  const hasPhoneQuery = new URLSearchParams(window.location.search).has("phone");
  const hasPhoneSegment = /^\/thank-you\/[^/]+/.test(path);
  if (!hasPhoneQuery && !hasPhoneSegment) return;
  if (readFormFlag()) return;

  writeFormFlag();
  trackLead("form_submit");
}

let started = false;

/**
 * Attaches the delegated listeners exactly once per page load. Safe under React
 * StrictMode double-invoke and re-renders.
 */
export function initAffiliateLeadTracking(): void {
  if (!isBrowser() || started) return;
  started = true;

  document.addEventListener("click", handleClick, { capture: true, passive: true });
  trackConfirmedFormSubmit();
}
