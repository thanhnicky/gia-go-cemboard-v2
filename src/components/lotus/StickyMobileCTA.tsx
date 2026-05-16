import { ZALO_URL } from "./constants";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3 py-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a
          href="#dat-hang"
          className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-[var(--brand-foreground)]"
        >
          Đặt hàng
        </a>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground"
        >
          Zalo tư vấn
        </a>
      </div>
    </div>
  );
}
