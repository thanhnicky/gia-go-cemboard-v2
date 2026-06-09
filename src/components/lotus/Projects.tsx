import ceiling from "@/assets/projects/lotus-ceiling-wood.jpg";
import villaComplex from "@/assets/projects/lotus-villa-complex.jpg";
import balcony from "@/assets/projects/lotus-balcony-paint.jpg";
import metrocity from "@/assets/projects/lotus-metrocity.jpg";
import villaStreet from "@/assets/projects/lotus-villa-street.jpg";
import longThanh from "@/assets/projects/lotus-long-thanh.jpg";
import hoanCau from "@/assets/projects/lotus-hoan-cau-golf.jpg";
import novaworld from "@/assets/projects/lotus-novaworld-ho-tram.jpg";
import townhouse from "@/assets/projects/lotus-townhouse.jpg";

const projects = [
  { src: metrocity, name: "GS Metrocity Nhà Bè", location: "TP. Hồ Chí Minh" },
  { src: novaworld, name: "Novaworld Hồ Tràm", location: "Bà Rịa - Vũng Tàu" },
  { src: longThanh, name: "Long Thành Riverside", location: "Đồng Nai" },
  { src: hoanCau, name: "Sân golf Hoàn Cầu", location: "Bình Thuận" },
  { src: villaStreet, name: "Khu biệt thự cao cấp", location: "Hạng mục trần & ban công" },
  { src: villaComplex, name: "Khu nhà phố compound", location: "Trần hiên giả gỗ Lotus" },
  { src: townhouse, name: "Nhà phố liên kế", location: "Hạng mục trần & lam gỗ" },
  { src: ceiling, name: "Thi công trần giả gỗ", location: "Hệ Lotus Wood Plank" },
  { src: balcony, name: "Thi công ban công", location: "Hệ Lotus trên tấm xi măng" },
];

export function Projects() {
  return (
    <section id="projects" className="border-b border-walnut/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-32">
        <div className="mb-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal/50">07 — Công trình tiêu biểu</span>
            <h2 className="mt-5 font-serif text-[34px] leading-tight text-charcoal sm:text-4xl md:text-5xl">
              Dự án đã hoàn thiện<br />
              <em className="not-italic text-clay">bằng hệ sơn Lotus.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 md:self-end">
            <p className="text-[15px] leading-relaxed text-charcoal/65">
              GS Metrocity, Novaworld Hồ Tràm, Long Thành Riverside — nhà thầu đều đặt sơn từ Lotus.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {projects.map((p) => (
            <figure key={p.name} className="group">
              <div className="overflow-hidden">
                <img
                  src={p.src}
                  alt={`Sơn giả gỗ Lotus - ${p.name}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between border-t border-walnut/12 pt-3">
                <span className="text-[13px] font-medium text-charcoal">{p.name}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-charcoal/40">{p.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}