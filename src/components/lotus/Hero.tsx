import heroImg from "@/assets/hero-facade.jpg";
import { ZALO_URL } from "./constants";

export function Hero() {
  return (
    <section id="top" className="border-b border-walnut/10">
      <div className="mx-auto max-w-[1400px] px-5 pt-14 pb-0 md:px-12 md:pt-20">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          {/* Copy */}
          <div className="col-span-12 md:col-span-5 md:pb-20">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal/50">
              Hoàn thiện bề mặt xi măng
            </span>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.07] text-charcoal sm:text-5xl lg:text-[3.4rem]">
              Biến tấm xi măng —<br />
              smartwood, conwood,<br />
              cemboard —{" "}
              <em className="not-italic text-clay">gần với gỗ tự nhiên hơn.</em>
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-charcoal/65">
              Hệ sơn vân gỗ Lotus tư vấn đúng hệ cho từng hạng mục: vách, lam, ốp tường, mặt dựng, sàn ngoài trời. Gửi ảnh bề mặt qua Zalo để được gợi ý màu và hệ sơn phù hợp.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#0068FF] px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-white transition hover:bg-[#0056d6]"
              >
                Gửi ảnh qua Zalo
              </a>
              <a
                href="#bao-gia"
                className="inline-flex items-center gap-2 border border-walnut/30 px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-charcoal/80 transition hover:border-charcoal hover:text-charcoal"
              >
                Xem combo & đặt hàng
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-walnut/12 pt-6">
              {[
                { v: "21 mã màu", l: "vân gỗ tự nhiên" },
                { v: "Smartwood / Conwood / Cemboard", l: "tất cả loại tấm xi măng" },
                { v: "Tư vấn theo ảnh thực tế", l: "qua Zalo" },
              ].map((f) => (
                <div key={f.v}>
                  <div className="text-[13px] font-medium text-charcoal">{f.v}</div>
                  <div className="text-[11px] text-charcoal/50">{f.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="col-span-12 md:col-span-7">
            <div className="overflow-hidden">
              <img
                src={heroImg}
                alt="Mặt tiền tấm xi măng hoàn thiện vân gỗ Lotus"
                width={1536}
                height={1280}
                className="h-[480px] w-full object-cover sm:h-[600px] lg:h-[700px]"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-walnut/12 pt-3">
              <span className="text-[13px] text-charcoal">Lotus Wood Primer + Lotus Wood Plank Paint</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40">Hệ sơn áp dụng</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
