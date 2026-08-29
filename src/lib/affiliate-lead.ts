// Affiliate lead tracking (Phase C): observes the conversion touchpoints on the
// landing page (order form submit, Zalo / hotline / email clicks) and turns them
// into an affiliate lead carrying the attribution stored by
// ./affiliate-attribution.
//
// Events are captured through a single delegated listener on `document`, so no
// component, CTA, form handler, GA4 or GTM wiring is touched.
//
// Privacy:
//   - Click leads carry only Lotus' own public contact details (the hotline /
//     Zalo number / sales mailbox already hardcoded in components/lotus/
//     constants.ts and rendered into the HTML).
//   - form_submit carries the customer details the visitor typed into the order
//     form, so sales can follow up and the partner portal can show the lead.
//     They are POSTed over HTTPS to the tracking API only. This module never
//     writes them to localStorage and never logs them, in any environment.
//
// /track-lead is live in production (Phase D verified: OPTIONS/CORS, the four
// lead types, dedupe, and forged-attribution rejection all confirmed against
// aff.sonlotus.vn), so sending is enabled.

import { getAffiliateAttribution } from "./affiliate-attribution";

const TRACK_LEAD_URL = "https://aff.sonlotus.vn/api/affiliate/track-lead";

const LEAD_TRACKING_ENABLED: boolean = true;

/** Boolean-only guard so refreshing the thank-you page cannot duplicate a lead. */
const FORM_LEAD_FLAG_KEY = "lotus_affiliate_lead_form_v1";
const REPEAT_EVENT_WINDOW_MS = 10_000;
const REQUEST_TIMEOUT_MS = 8_000;

export type LeadType = "form_submit" | "zalo_click" | "phone_click" | "email_click";

/**
 * For click leads: the Lotus contact the visitor reached out through.
 * For form_submit: the details the visitor typed into the order form.
 */
export type LeadData = {
  zalo_phone?: string;
  phone?: string;
  email?: string;
  name?: string;
  province?: string;
  district?: string;
  product_interest?: string;
  area_sqm?: number;
  message?: string;
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
 * Fire-and-forget delivery over `fetch`, attempted exactly once per event.
 *
 * `sendBeacon` is deliberately NOT used. Its only advantage is surviving a page
 * unload, which never happens here: every Zalo CTA opens with target="_blank",
 * and tel: / mailto: hand off to the OS without unloading. In exchange it would
 * report success as soon as the request is queued, so a rejected CORS preflight
 * (`application/json` is not a safelisted content type) would silently drop the
 * lead with no way to detect or fall back. `fetch` surfaces that failure and
 * lets us read the API response; `keepalive` still covers an unexpected unload.
 *
 * /track-lead must answer OPTIONS with Access-Control-Allow-Headers: Content-Type,
 * exactly like /track-click already does.
 */
function sendLead(payload: LeadPayload): void {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  void fetch(TRACK_LEAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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

function text(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, max);
  return trimmed || undefined;
}

/**
 * Reads the order OrderForm persisted as `order_<phone>` right before redirecting.
 * Fields are whitelisted so an unexpected addition to the form is never forwarded
 * by accident, and nothing is written back to storage.
 */
function readSubmittedOrder(phone: string): LeadData {
  let order: Record<string, unknown> = {};
  try {
    const raw = localStorage.getItem(`order_${phone}`);
    if (raw) order = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    // Unreadable payload: fall back to the phone we already have.
  }

  const data: LeadData = {
    phone: text(order.phone, 20) ?? text(phone, 20),
    name: text(order.name, 80),
    province: text(order.province, 60),
    message: text(order.note, 500),
    product_interest: text(order.combo, 300),
  };
  // Drop empty keys so the API receives only what the visitor actually provided.
  for (const key of Object.keys(data) as (keyof LeadData)[]) {
    if (data[key] === undefined) delete data[key];
  }
  return data;
}

/**
 * The order form reports its lead from the thank-you page instead of the raw
 * `submit` event, because OrderForm only reaches /thank-you after Zod validation
 * and the upstream request both succeeded.
 *
 * The customer details come from the record OrderForm itself already wrote to
 * localStorage before redirecting; this module only reads it, and POSTs it over
 * HTTPS to the tracking API. `email`, `district` and `area_sqm` are omitted
 * because the form does not collect them.
 */
function trackConfirmedFormSubmit() {
  const path = window.location.pathname;
  if (!path.startsWith("/thank-you")) return;

  const queryPhone = new URLSearchParams(window.location.search).get("phone");
  const segmentPhone = path.match(/^\/thank-you\/([^/]+)/)?.[1];
  const phone = queryPhone || (segmentPhone ? decodeURIComponent(segmentPhone) : "");
  if (!phone) return;
  if (readFormFlag()) return;

  writeFormFlag();
  trackLead("form_submit", readSubmittedOrder(phone));
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
