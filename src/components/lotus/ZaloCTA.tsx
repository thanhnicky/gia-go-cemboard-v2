import { ZALO_URL } from "./constants";

export function ZaloCTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-border bg-[var(--brand)] px-6 py-12 text-center text-[var(--brand-foreground)] sm:px-10 sm:py-16">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand-foreground)]/70">
            Dành cho công trình lớn
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
            Công trình lớn cần tư vấn?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--brand-foreground)]/85 sm:text-lg">
            Gửi ảnh hạng mục qua Zalo — Lotus tư vấn đúng hệ theo hạng mục, xác nhận màu trên mẫu thực tế và báo giá theo dự án.
          </p>
          <ul className="mx-auto mt-6 max-w-xl grid gap-2 text-sm text-[var(--brand-foreground)]/90 sm:grid-cols-3">
            <li>Tư vấn đúng hệ theo hạng mục</li>
            <li>Xác nhận màu trên mẫu thực tế</li>
            <li>Báo giá theo dự án và tiến độ</li>
          </ul>
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-foreground)] px-8 py-4 text-base font-semibold text-[var(--brand)] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Nhắn Zalo — Tư vấn dự án
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
