import { useState } from "react";
import { ZALO_URL } from "./constants";

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
  const [selected, setSelected] = useState<Swatch>(GROUPS[1].items[0]);

  const setSelectedColor = (s: Swatch) => {
    setSelected(s);
    const el = document.getElementById("form-color") as HTMLInputElement | null;
    if (el) el.value = `${s.name} (${s.code})`;
  };

  return (
    <section id="mau-sac" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
              Bảng màu vân gỗ Lotus
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              Chọn tông gỗ phù hợp với công trình
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Bấm vào một màu để chọn. Màu bạn chọn sẽ tự động được điền vào form
              đặt hàng phía dưới. Khuyến nghị xác nhận màu trên mẫu thực tế trước
              khi lên đơn lớn.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3">
            <img
              src={selected.img}
              alt={selected.name}
              className="h-14 w-20 rounded-lg border border-border object-cover"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Đang chọn
              </p>
              <p className="font-serif text-base font-semibold text-foreground">
                {selected.name}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {selected.code}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-10">
          {GROUPS.map((g) => (
            <div key={g.label}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {g.label}
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {g.items.map((s) => {
                  const active = selected.code === s.code;
                  return (
                    <button
                      key={s.code}
                      type="button"
                      onClick={() => setSelectedColor(s)}
                      className={`group relative overflow-hidden rounded-xl border text-left transition-all ${
                        active
                          ? "border-[var(--brand)] ring-2 ring-[var(--brand)]/30"
                          : "border-border hover:border-foreground/40"
                      }`}
                    >
                      <img
                        src={s.img}
                        alt={s.name}
                        loading="lazy"
                        className="aspect-[5/3] w-full object-cover"
                      />
                      <div className="bg-card px-3 py-3">
                        <p className="text-sm font-semibold text-foreground">
                          {s.name}
                        </p>
                        <p className="font-mono text-[11px] text-muted-foreground">
                          {s.code}
                        </p>
                      </div>
                      {active && (
                        <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-[var(--brand)] text-[var(--brand-foreground)]">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M2.5 6.2L5 8.7L9.7 3.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <a
            href="#dat-hang"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Tôi chọn màu này và muốn đặt hàng
          </a>
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground hover:bg-muted"
          >
            Tôi chưa chắc màu, cần tư vấn qua Zalo
          </a>
        </div>
      </div>
    </section>
  );
}
