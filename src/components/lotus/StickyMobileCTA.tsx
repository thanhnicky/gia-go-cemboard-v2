import { ZALO_URL } from "./constants";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-walnut/15 bg-cream/95 px-3 py-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center bg-[#0068FF] px-4 py-3 text-[11px] uppercase tracking-[0.15em] text-white"
        >
          Nhắn Zalo
        </a>
        <a
          href="#bao-gia"
          className="inline-flex items-center justify-center border border-walnut/30 px-4 py-3 text-[11px] uppercase tracking-[0.15em] text-charcoal"
        >
          Đặt hàng
        </a>
      </div>
    </div>
  );
}
