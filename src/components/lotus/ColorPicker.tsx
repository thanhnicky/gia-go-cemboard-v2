import { ZALO_URL } from "./constants";
import colorOverview from "@/assets/color-overview.jpg";

import c_LPM0_LWF1017 from "@/assets/colors/LPM0_LWF1017.jpg";
import c_LPM14_LWF1018 from "@/assets/colors/LPM14_LWF1018.jpg";
import c_LPM0_LWF1015 from "@/assets/colors/LPM0_LWF1015.jpg";
import c_LPM0_LWF101 from "@/assets/colors/LPM0_LWF101.jpg";
import c_LPM8_LWF101 from "@/assets/colors/LPM8_LWF101.jpg";
import c_LPM4_LWF101 from "@/assets/colors/LPM4_LWF101.jpg";
import c_LPM0_LWF1013 from "@/assets/colors/LPM0_LWF1013.jpg";
import c_LPM8_LWF104 from "@/assets/colors/LPM8_LWF104.jpg";
import c_LPM4_LWF104 from "@/assets/colors/LPM4_LWF104.jpg";
import c_LPM0_LWF103 from "@/assets/colors/LPM0_LWF103.jpg";
import c_LPM8_LFF2 from "@/assets/colors/LPM8_LFF2.jpg";
import c_LPM1_LFF2 from "@/assets/colors/LPM1_LFF2.jpg";
import c_LPM0_LWF1012 from "@/assets/colors/LPM0_LWF1012.jpg";
import c_LPM2_LFF2 from "@/assets/colors/LPM2_LFF2.jpg";
import c_LPM0_LWF1016 from "@/assets/colors/LPM0_LWF1016.jpg";
import c_LPM0_LWF104 from "@/assets/colors/LPM0_LWF104.jpg";
import c_LPM15_LWF1019 from "@/assets/colors/LPM15_LWF1019.jpg";
import c_LPM3_LFF2 from "@/assets/colors/LPM3_LFF2.jpg";
import c_LPM0_LFF2 from "@/assets/colors/LPM0_LFF2.jpg";
import c_LPM8_LWF103 from "@/assets/colors/LPM8_LWF103.jpg";
import c_LPM5_LFF2 from "@/assets/colors/LPM5_LFF2.jpg";

type Swatch = { name: string; code: string; img: string };

const GROUPS: { label: string; items: Swatch[] }[] = [
  {
    label: "Tone sáng",
    items: [
      { name: "Vàng nghệ", code: "LPM0.LWF1017", img: c_LPM0_LWF1017 },
      { name: "Nâu sáng", code: "LPM14.LWF1018", img: c_LPM14_LWF1018 },
      { name: "Xám gỗ trôi", code: "LPM0.LWF1015", img: c_LPM0_LWF1015 },
    ],
  },
  {
    label: "Tone cam ấm",
    items: [
      { name: "Cam gỗ", code: "LPM0.LWF101", img: c_LPM0_LWF101 },
      { name: "Cam đồng", code: "LPM8.LWF101", img: c_LPM8_LWF101 },
      { name: "Cam óng", code: "LPM0.LWF1013", img: c_LPM0_LWF1013 },
      { name: "Cam đất", code: "LPM0.LWF1012", img: c_LPM0_LWF1012 },
      { name: "Cam gạch", code: "LPM8.LWF103", img: c_LPM8_LWF103 },
      { name: "Nâu vàng", code: "LPM15.LWF1019", img: c_LPM15_LWF1019 },
      { name: "Đỏ gụ", code: "LPM4.LWF101", img: c_LPM4_LWF101 },
    ],
  },
  {
    label: "Tone nâu tự nhiên",
    items: [
      { name: "Nâu đỏ", code: "LPM8.LWF104", img: c_LPM8_LWF104 },
      { name: "Nâu đỏ đậm", code: "LPM4.LWF104", img: c_LPM4_LWF104 },
      { name: "Nâu cherry", code: "LPM0.LWF103", img: c_LPM0_LWF103 },
      { name: "Nâu walnut", code: "LPM0.LWF104", img: c_LPM0_LWF104 },
      { name: "Teak tự nhiên", code: "LPM8.LFF2", img: c_LPM8_LFF2 },
      { name: "Nâu sô-cô-la", code: "LPM1.LFF2", img: c_LPM1_LFF2 },
    ],
  },
  {
    label: "Tone đậm & đặc biệt",
    items: [
      { name: "Nâu rượu vang", code: "LPM2.LFF2", img: c_LPM2_LFF2 },
      { name: "Nâu đen", code: "LPM3.LFF2", img: c_LPM3_LFF2 },
      { name: "Đen tuyền", code: "LPM5.LFF2", img: c_LPM5_LFF2 },
      { name: "Xanh rêu", code: "LPM0.LWF1016", img: c_LPM0_LWF1016 },
      { name: "Olive", code: "LPM0.LFF2", img: c_LPM0_LFF2 },
    ],
  },
];

export function ColorPicker() {
  return (
    <section id="mau-sac" className="border-b border-walnut/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-32">
        <div className="mb-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <span className="font-serif text-[12px] uppercase tracking-[0.3em] text-charcoal/50">05 — Bảng màu</span>
            <h2 className="mt-5 font-serif text-[34px] leading-tight text-charcoal sm:text-4xl md:text-5xl">
              Chọn tông gỗ<br />
              <em className="not-italic text-clay">phù hợp công trình.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:self-end">
            <p className="text-[15px] leading-relaxed text-charcoal/65">
              21 mã màu vân gỗ — từ tone sáng, cam ấm, nâu tự nhiên đến tone đậm đặc biệt. Xác nhận màu trên mẫu thực tế trước khi lên đơn lớn.
            </p>
          </div>
        </div>

        <div className="overflow-hidden">
          <img
            src={colorOverview}
            alt="Bảng màu vân gỗ Lotus tổng thể"
            className="w-full object-cover"
          />
        </div>

        <div className="mt-6 grid grid-cols-12 gap-x-8 gap-y-4">
          <div className="col-span-12 md:col-span-8">
            <p className="text-[13px] leading-relaxed text-charcoal/55">
              Tone sáng · Tone cam ấm · Tone nâu tự nhiên · Tone đậm &amp; đặc biệt — 21 mã màu, chọn mã cụ thể trong form đặt hàng. Công trình lớn: gửi ảnh qua Zalo để nhận mẫu thực tế trước khi chốt màu.
            </p>
          </div>
          <div className="col-span-12 flex flex-wrap gap-3 md:col-span-12">
            <a
              href="#dat-le-online"
              className="inline-flex items-center gap-2 bg-clay px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-cream transition hover:bg-walnut"
            >
              Đã chọn màu — Xem combo
            </a>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-walnut/30 px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-charcoal/80 transition hover:border-charcoal hover:text-charcoal"
            >
              Nhắn Zalo chốt mẫu thực tế
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
