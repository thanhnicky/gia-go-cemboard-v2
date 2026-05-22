import { ZALO_URL } from "./constants";

export function FinalCTA() {
  return (
    <section className="bg-[var(--cement)]/50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
          Sẵn sàng bắt đầu
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Bạn đang có dự án Cemboard cần sơn giả gỗ?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Hạng mục nhỏ đặt hàng ngay — Công trình lớn nhắn Zalo tư vấn.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#dat-hang"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-8 py-4 text-base font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Đặt hàng nhanh — Hạng mục nhỏ
          </a>
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-semibold text-foreground hover:bg-muted"
          >
            Nhắn Zalo — Tư vấn công trình
          </a>
        </div>
        <div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
          <p className="text-center sm:text-left">Đã chọn màu và combo</p>
          <p className="text-center sm:text-left">Cần báo giá dự án chi tiết</p>
        </div>
      </div>
    </section>
  );
}
