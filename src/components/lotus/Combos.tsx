const COMBOS = [
  {
    tag: "Phổ biến nhất",
    name: "Combo Vách & Lam",
    desc: "Cho mặt tiền, vách trang trí, lam che nắng, hàng rào fiber cement.",
    items: [
      "Lotus Wood Primer Paint — lớp lót",
      "Lotus Wood Plank Paint — lớp phủ vân gỗ",
      "Chổi / con lăn tạo vân (tuỳ chọn)",
    ],
    coverage: "Định mức tham khảo: 6–8 m²/lít/lớp",
  },
  {
    tag: "Cho sàn ngoài trời",
    name: "Combo Sàn Decking",
    desc: "Cho sàn ban công, lối đi sân vườn, deck hồ bơi, khu vực chịu mài mòn.",
    items: [
      "Lotus Wood Primer Paint — lớp lót sàn",
      "Lotus Decking Paint — lớp phủ chuyên sàn",
      "Hướng dẫn thi công đi kèm",
    ],
    coverage: "Định mức tham khảo: 5–7 m²/lít/lớp",
  },
  {
    tag: "Theo m²",
    name: "Báo giá theo diện tích",
    desc: "Lotus tính trọn gói theo m² thực tế cho dự án từ 50 m² trở lên.",
    items: [
      "Khảo sát hạng mục & vật liệu nền",
      "Tư vấn đúng hệ sơn theo khu vực",
      "Báo giá theo m² — minh bạch",
    ],
    coverage: "Áp dụng cho contractor, dự án, đại lý",
  },
];

export function Combos() {
  return (
    <section id="bao-gia" className="bg-[var(--cement)]/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
            Combo & báo giá nhanh
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Chọn combo phù hợp với hạng mục của bạn.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Lotus gợi ý sẵn các combo theo nhu cầu thực tế. Số lượng cụ thể sẽ
            được xác nhận lại theo diện tích bạn cung cấp.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {COMBOS.map((c) => (
            <div
              key={c.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-25px_oklch(0.22_0.025_45/0.35)]"
            >
              <span className="inline-flex self-start rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
                {c.tag}
              </span>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">
                {c.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <ul className="mt-5 space-y-2 text-sm text-foreground/85">
                {c.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand)]"
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                {c.coverage}
              </p>
              <a
                href="#dat-hang"
                className="mt-5 inline-flex items-center justify-center rounded-full border border-[var(--brand)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--brand)] transition-colors hover:bg-[var(--brand)] hover:text-[var(--brand-foreground)]"
              >
                Yêu cầu báo giá
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
