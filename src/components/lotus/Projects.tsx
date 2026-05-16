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
    <section id="projects" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)] mb-3">
            Công trình tiêu biểu
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
            Dự án đã thi công bằng Sơn giả gỗ Lotus
          </h2>
          <p className="text-muted-foreground">
            Hàng trăm công trình từ biệt thự, nhà phố đến khu nghỉ dưỡng đã tin
            dùng hệ sơn giả gỗ Lotus cho hạng mục trần, lam, ban công bằng tấm
            xi măng.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {projects.map((p) => (
            <figure
              key={p.name}
              className="group relative overflow-hidden rounded-2xl shadow-elegant bg-muted"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.src}
                  alt={`Sơn giả gỗ Lotus - ${p.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs opacity-90">{p.location}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}