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
    <section id="mau-sac" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
            Bảng màu vân gỗ Lotus
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Chọn tông gỗ phù hợp với công trình
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Xem tông màu tổng thể — chọn mã màu cụ thể trong form đặt hàng. Khuyến nghị xác nhận màu trên mẫu thực tế trước khi lên đơn lớn.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Khách mua nhanh: chọn màu rồi đặt hàng ngay. Công trình lớn: nhắn Zalo để nhận mẫu thực tế trước khi chốt màu.
          </p>
        </div>

        <div className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <img
              src={colorOverview}
              alt="Bảng màu vân gỗ Lotus tổng thể"
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <a
            href="#bao-gia"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Đã chọn được màu - Chọn combo ngay
          </a>
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground hover:bg-muted"
          >
            Chưa chắc màu — Nhắn Zalo chốt mẫu thực tế
          </a>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Khách nhỏ chọn nhanh — Công trình lớn xem mẫu thực tế qua Zalo.
        </p>
      </div>
    </section>
  );
}
