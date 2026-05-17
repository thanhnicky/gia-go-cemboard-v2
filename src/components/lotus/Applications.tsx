import facade from "@/assets/app-facade.jpg";
import gate from "@/assets/app-gate.jpg";
import louver from "@/assets/app-louver.jpg";
import fence from "@/assets/app-fence.jpg";
import deck from "@/assets/app-deck.jpg";
import pool from "@/assets/app-pool.jpg";

const APPS = [
  { img: facade, title: "Mặt tiền", desc: "Vách ngoài, ốp mặt dựng" },
  { img: gate, title: "Cửa cổng", desc: "Cổng gỗ giả, cánh cổng biệt thự" },
  { img: louver, title: "Lam che nắng", desc: "Lam đứng, lam ngang" },
  { img: fence, title: "Hàng rào", desc: "Rào gỗ giả, vách ngăn sân" },
  { img: deck, title: "Sàn ngoài trời", desc: "Ban công, lối đi, terrace" },
  { img: pool, title: "Sân vườn / hồ bơi", desc: "Cảnh quan, deck hồ bơi" },
];

export function Applications() {
  return (
    <section id="ung-dung" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
            Ứng dụng
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Hạng mục nào dùng được?
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Lotus phủ vân gỗ cho hầu hết hạng mục tấm xi măng — từ mặt tiền, lam
            che nắng đến sàn ngoài trời.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {APPS.map((a, i) => (
            <article
              key={a.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-25px_oklch(0.22_0.025_45/0.4)]"
            >
              <div className="aspect-[5/4] overflow-hidden">
                <img
                  src={a.img}
                  alt={a.title}
                  loading={i < 2 ? "eager" : "lazy"}
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-5 py-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
