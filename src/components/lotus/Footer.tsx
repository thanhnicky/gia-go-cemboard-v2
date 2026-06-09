import {
  HOTLINE,
  HOTLINE_TEL,
  ZALO_URL,
  EMAIL,
  WEBSITE,
  COMPANY_NAME,
  COMPANY_TAX,
  COMPANY_ADDRESS,
} from "./constants";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="font-serif text-[18px] text-cream">Lotus — Sơn giả gỗ trên tấm xi măng</p>
            <p className="mt-3 text-[13px] leading-relaxed text-cream/60">
              Hệ sơn vân gỗ chuyên dụng cho Smartwood, Conwood, Cemboard, fiber cement. Tư vấn đúng hệ cho từng hạng mục.
            </p>
            <div className="mt-5 space-y-1 text-[12px] text-cream/45">
              <p className="text-cream/65">{COMPANY_NAME}</p>
              <p>MST: {COMPANY_TAX}</p>
              <p>{COMPANY_ADDRESS}</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/40">Liên hệ</p>
            <ul className="mt-4 space-y-2 text-[13px] text-cream/70">
              <li>Hotline: <a href={HOTLINE_TEL} className="text-cream hover:text-clay transition">{HOTLINE}</a></li>
              <li>Zalo: <a href={ZALO_URL} target="_blank" rel="noreferrer" className="text-cream hover:text-clay transition">Nhắn tin ngay</a></li>
              <li>Email: <a href={`mailto:${EMAIL}`} className="text-cream hover:text-clay transition">{EMAIL}</a></li>
              <li>Website: <a href={`https://${WEBSITE}`} target="_blank" rel="noreferrer" className="text-cream hover:text-clay transition">{WEBSITE}</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/40">Văn phòng</p>
            <p className="mt-4 text-[13px] leading-relaxed text-cream/70">{COMPANY_ADDRESS}</p>
            <p className="mt-2 text-[12px] text-cream/40">Giờ làm việc: 8:00 – 18:00 (T2 – T7)</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-cream/10 pt-6 text-[11px] text-cream/35 sm:flex-row">
          <p>© {new Date().getFullYear()} Sơn giả gỗ Lotus. Thương hiệu Việt Nam.</p>
          <p>Bảng màu hiển thị chỉ mang tính tham khảo.</p>
        </div>
      </div>
    </footer>
  );
}
