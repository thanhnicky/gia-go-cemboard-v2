import { ZALO_URL } from "./constants";

export function FinalCTA() {
  return (
    <section className="bg-[var(--cement)]/50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
          Sẵn sàng bắt đầu
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Đã có hạng mục và màu gần phù hợp?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Đặt hàng ngay để Lotus xác nhận đúng hệ sơn, chốt màu và lên đơn
          chuẩn cho dự án của bạn.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#dat-hang"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-8 py-4 text-base font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Đặt hàng nhanh
          </a>
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-semibold text-foreground hover:bg-muted"
          >
            Nhắn Zalo tư vấn
          </a>
        </div>
      </div>
    </section>
  );
}
