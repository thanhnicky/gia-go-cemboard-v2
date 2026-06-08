import { ZALO_URL } from "./constants";

export function FinalCTA() {
  return (
    <section className="bg-[var(--cement)]/50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
          Sẵn sàng bắt đầu
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Dự án Cemboard của bạn cần sơn giả gỗ?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          <strong>Hạng mục nhỏ:</strong> Đặt hàng ngay — Nhận hàng trong 2-3 ngày. <strong>Công trình lớn:</strong> Nhắn Zalo để được tư vấn miễn phí.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#dat-hang"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-8 py-4 text-base font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Đặt hàng ngay — Nhận hàng nhanh
          </a>
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-semibold text-foreground hover:bg-muted"
          >
            Tư vấn miễn phí — Nhắn Zalo
          </a>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-card px-5 py-4 text-left">
          <p className="text-sm font-semibold text-foreground mb-2">Tại sao chọn Lotus?</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-green-600 mt-0.5 flex-shrink-0">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Đúng hệ sơn cho từng loại Cemboard/Fiber Cement
            </li>
            <li className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-green-600 mt-0.5 flex-shrink-0">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tư vấn kỹ thuật 1-1 trước khi chốt đơn
            </li>
            <li className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-green-600 mt-0.5 flex-shrink-0">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Bền màu 5+ năm ngoài trời, chịu nắng mưa
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
