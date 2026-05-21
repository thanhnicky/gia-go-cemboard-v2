import heroImg from "@/assets/hero-facade.jpg";
import { ZALO_URL } from "./constants";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-6 lg:pt-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
            Sơn Giả Gỗ Chuyên Nghiệp Cho Nhà Thầu
          </span>
          <h1 className="mt-5 font-serif text-[2.4rem] font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-[3.6rem]">
            Sơn giả gỗ cemboard đúng hệ - <br className="hidden sm:inline" />
            bàn giao đẹp {" "}
            <em className="not-italic text-[var(--brand)]">CĐT hài lòng.</em>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Hệ sơn Lotus được phát triển riêng cho tấm  xi măng — đúng hệ cho vách, lam, sàn, hàng rào. Tư vấn kỹ thuật 1-1 trước khi chốt đơn, hỗ trợ quy trình thi công khi cần Conwood, Cemboard và Fiber
          </p>
          <ul className="mt-7 grid gap-3 text-sm sm:text-base">
            {[
              "Chuyên dụng cho Fiber Cement, Smartwood, Conwood, Cemboard.",
              "Hiệu ứng vân gỗ chân thực, nhiều tone từ sáng đến nâu đậm.",
              "Hệ sơn gốc nước, độ bền màu cao ngoài trời.",
              "Bám dính tốt trên xi măng — không lo bong tróc sau bàn giao.",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]"
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6.2L5 8.7L9.7 3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-foreground/85">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#dat-hang"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3.5 text-base font-semibold text-[var(--brand-foreground)] shadow-[0_8px_24px_-12px_oklch(0.42_0.11_38/0.6)] transition-transform hover:-translate-y-0.5"
            >
              Đặt hàng nhanh
              <span aria-hidden>→</span>
            </a>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Tư vấn qua Zalo
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Dùng sai hệ sơn = bong tróc sau 1 mùa mưa = làm lại tốn công. Gửi ảnh hạng mục — Lotus xác nhận đúng hệ miễn phí trước khi bạn mua.Gửi ảnh hạng mục để Lotus tư vấn đúng loại trước khi đặt.
          </p>
        </div>
        <div className="relative lg:col-span-6">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_60px_-30px_oklch(0.22_0.025_45/0.35)]">
            <img
              src={heroImg}
              alt="Mặt tiền tấm xi măng hoàn thiện vân gỗ Lotus"
              width={1536}
              height={1280}
              className="h-[420px] w-full object-cover sm:h-[520px] lg:h-[640px]"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/85 px-4 py-3 backdrop-blur-md">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Hệ sơn áp dụng
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                Lotus Wood Primer + Lotus Wood Plank Paint
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
