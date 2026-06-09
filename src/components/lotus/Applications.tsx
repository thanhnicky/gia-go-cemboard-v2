import facade from "@/assets/app-facade.jpg";
import gate from "@/assets/app-gate.jpg";
import louver from "@/assets/app-louver.jpg";
import fence from "@/assets/app-fence.jpg";
import deck from "@/assets/app-deck.jpg";
import pool from "@/assets/app-pool.jpg";
import wall from "@/assets/app-wall.jpg";

export function Applications() {
  return (
    <section id="ung-dung" className="border-b border-walnut/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-32">
        <div className="mb-12 grid grid-cols-12">
          <div className="col-span-12 md:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal/50">02 — Ứng dụng</span>
            <h2 className="mt-5 font-serif text-[34px] leading-tight text-charcoal sm:text-4xl md:text-5xl">
              Những bề mặt xi măng<br />
              <em className="not-italic text-clay">hoàn thiện theo ngôn ngữ gỗ.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[15px] leading-relaxed text-charcoal/65">
              Smartwood, Conwood, Cemboard, fiber cement, tường bê tông, sàn ngoài trời — Lotus phủ vân gỗ đúng hệ cho từng loại nền và từng hạng mục kiến trúc.
            </p>
          </div>
        </div>

        {/* 1 large + 4 small */}
        <div className="grid grid-cols-12 gap-3 md:gap-5">
          <figure className="col-span-12 group md:col-span-7">
            <div className="overflow-hidden">
              <img src={facade} alt="Mặt tiền tấm xi măng vân gỗ" loading="eager" width={1280} height={960} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between border-t border-walnut/12 pt-3">
              <span className="text-[14px] font-medium text-charcoal">Mặt tiền / Mặt dựng</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40">Ngoại thất</span>
            </figcaption>
          </figure>
          <div className="col-span-12 grid grid-cols-2 gap-3 md:col-span-5 md:gap-5">
            {[
              { img: louver, label: "Lam che nắng", ctx: "Mặt dựng" },
              { img: fence, label: "Hàng rào / Vách ngăn", ctx: "Sân vườn" },
              { img: gate, label: "Cổng / Cửa sắt", ctx: "Ngoại thất" },
              { img: wall, label: "Ốp tường / Vách", ctx: "Nội ngoại thất" },
            ].map((a) => (
              <figure key={a.label} className="group">
                <div className="overflow-hidden">
                  <img src={a.img} alt={a.label} loading="lazy" width={800} height={800} className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
                </div>
                <figcaption className="mt-2 flex items-baseline justify-between border-t border-walnut/10 pt-2">
                  <span className="text-[13px] font-medium text-charcoal">{a.label}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal/35">{a.ctx}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* 2 equal — sàn / hồ bơi */}
        <div className="mt-3 grid grid-cols-2 gap-3 md:mt-5 md:gap-5">
          {[
            { img: deck, label: "Sàn / Ban công / Terrace", ctx: "Khu vực chịu lực ngoài trời" },
            { img: pool, label: "Sân vườn / Khu hồ bơi", ctx: "Cảnh quan ngoại thất" },
          ].map((a) => (
            <figure key={a.label} className="group col-span-2 md:col-span-1">
              <div className="overflow-hidden">
                <img src={a.img} alt={a.label} loading="lazy" width={1024} height={768} className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between border-t border-walnut/12 pt-3">
                <span className="text-[14px] font-medium text-charcoal">{a.label}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40">{a.ctx}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
