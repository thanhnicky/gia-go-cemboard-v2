import { useState } from "react";
import { ZALO_URL } from "./constants";

type Swatch = { name: string; code: string; hex: string };

const GROUPS: { label: string; items: Swatch[] }[] = [
  {
    label: "Tone sáng",
    items: [
      { name: "Sồi sữa", code: "L-101", hex: "#e9d3b3" },
      { name: "Sồi vàng", code: "L-102", hex: "#d6b384" },
      { name: "Tre nhạt", code: "L-103", hex: "#cfb389" },
      { name: "Sồi xám", code: "L-104", hex: "#b9a787" },
    ],
  },
  {
    label: "Tone ấm tự nhiên",
    items: [
      { name: "Teak ấm", code: "L-201", hex: "#b07a4a" },
      { name: "Gỗ cherry", code: "L-202", hex: "#9c5a3a" },
      { name: "Walnut nhạt", code: "L-203", hex: "#8a5a3a" },
      { name: "Mahogany", code: "L-204", hex: "#7a4632" },
    ],
  },
  {
    label: "Tone nâu đậm",
    items: [
      { name: "Walnut đậm", code: "L-301", hex: "#5a3520" },
      { name: "Espresso", code: "L-302", hex: "#3f2517" },
      { name: "Gỗ mun", code: "L-303", hex: "#2c1d14" },
      { name: "Đen khói", code: "L-304", hex: "#1f1814" },
    ],
  },
];

export function ColorPicker() {
  const [selected, setSelected] = useState<Swatch>(GROUPS[1].items[0]);

  const setSelectedColor = (s: Swatch) => {
    setSelected(s);
    // sync to form if present
    const el = document.getElementById("form-color") as HTMLInputElement | null;
    if (el) el.value = `${s.name} (${s.code})`;
  };

  return (
    <section id="mau-sac" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
              Bảng màu vân gỗ
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              Chọn màu trực tiếp ngay tại đây.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Mã màu thực tế có thể thay đổi nhẹ theo điều kiện thi công và ánh
              sáng. Lotus khuyến nghị xác nhận màu qua mẫu trước khi lên đơn lớn.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3">
            <span
              aria-label={`Màu đã chọn ${selected.name}`}
              className="h-12 w-12 rounded-lg border border-border"
              style={{ backgroundColor: selected.hex }}
            />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Đang chọn
              </p>
              <p className="font-serif text-base font-semibold text-foreground">
                {selected.name}{" "}
                <span className="text-muted-foreground">· {selected.code}</span>
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
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
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
                      <div
                        className="aspect-[5/4] w-full"
                        style={{ backgroundColor: s.hex }}
                      />
                      <div className="bg-card px-3 py-3">
                        <p className="text-sm font-semibold text-foreground">
                          {s.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{s.code}</p>
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
