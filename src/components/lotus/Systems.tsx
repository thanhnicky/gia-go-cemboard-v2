const BLOCKS = [
  {
    tag: "Cho vách, lam, hàng rào, bề mặt trang trí",
    title: "Hệ phủ vân gỗ cho vách & ốp",
    products: [
      {
        name: "Lotus Wood Primer Paint",
        role: "Lớp lót chuyên dụng cho fiber cement, tăng độ bám và độ phủ.",
      },
      {
        name: "Lotus Wood Plank Paint",
        role: "Lớp phủ tạo hiệu ứng vân gỗ chân thực, bền màu ngoài trời.",
      },
    ],
  },
  {
    tag: "Cho sàn, ban công, lối đi, khu vực chịu mài mòn",
    title: "Hệ phủ cho sàn & khu vực chịu lực",
    products: [
      {
        name: "Lotus Decking Paint",
        role: "Hệ sơn sàn dành cho tấm xi măng ngoài trời, chịu đi lại, chịu thời tiết.",
      },
    ],
  },
];

export function Systems() {
  return (
    <section className="bg-[var(--cement)]/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
            Chọn đúng hệ sơn
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Sai hệ sơn là lỗi kỹ thuật — không phải lỗi thẩm mỹ.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Vách và sàn chịu lực khác nhau hoàn toàn. Dùng chung một hệ — bong tróc sớm, mất uy tín với CĐT. Lotus giúp bạn chọn đúng từ đầu.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {BLOCKS.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {b.tag}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground">
                {b.title}
              </h3>
              <div className="mt-6 space-y-4">
                {b.products.map((p) => (
                  <div
                    key={p.name}
                    className="flex gap-4 rounded-xl border border-border/70 bg-background/60 p-4"
                  >
                    <div
                      aria-hidden
                      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[var(--brand-soft)] font-serif text-base font-semibold text-[var(--brand)]"
                    >
                      L
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{p.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-[var(--brand)]/30 bg-[var(--brand-soft)]/40 px-5 py-4 text-sm text-foreground/85 sm:text-base">
          <span className="font-semibold text-[var(--brand)]">Lưu ý: </span>
          Lotus cam kết xác nhận đúng hệ kỹ thuật cho từng hạng mục, nhận mẫu trước khi lên đơn — hoàn toàn miễn phí.
        </div>
      </div>
    </section>
  );
}
