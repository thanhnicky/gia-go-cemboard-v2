import { useMemo, useState } from "react";
import { ZALO_URL } from "./constants";

// Danh sách màu giả gỗ Lotus (đồng bộ với ColorPicker và OrderForm)
const WOOD_COLORS = [
  // Tone sáng
  { name: "Vàng nghệ", code: "LPM0.LWF1017" },
  { name: "Nâu sáng", code: "LPM14.LWF1018" },
  { name: "Xám gỗ trôi", code: "LPM0.LWF1015" },
  // Tone cam ấm
  { name: "Cam gỗ", code: "LPM0.LWF101" },
  { name: "Cam đồng", code: "LPM8.LWF101" },
  { name: "Cam óng", code: "LPM0.LWF1013" },
  { name: "Cam đất", code: "LPM0.LWF1012" },
  { name: "Cam gạch", code: "LPM8.LWF103" },
  { name: "Nâu vàng", code: "LPM15.LWF1019" },
  { name: "Đỏ gụ", code: "LPM4.LWF101" },
  // Tone nâu tự nhiên
  { name: "Nâu đỏ", code: "LPM8.LWF104" },
  { name: "Nâu đỏ đậm", code: "LPM4.LWF104" },
  { name: "Nâu cherry", code: "LPM0.LWF103" },
  { name: "Nâu walnut", code: "LPM0.LWF104" },
  { name: "Teak tự nhiên", code: "LPM8.LFF2" },
  { name: "Nâu sô-cô-la", code: "LPM1.LFF2" },
  // Tone đậm & đặc biệt
  { name: "Nâu rượu vang", code: "LPM2.LFF2" },
  { name: "Nâu đen", code: "LPM3.LFF2" },
  { name: "Đen tuyền", code: "LPM5.LFF2" },
  { name: "Xanh rêu", code: "LPM0.LWF1016" },
  { name: "Olive", code: "LPM0.LFF2" },
];

type Variant = { id: string; label: string; spec: string; price: number; area: number };
type Combo = {
  id: string;
  name: string;
  tagline: string;
  useFor: string;
  includes: string[];
  variants: [Variant, Variant];
};

const COMBOS: Combo[] = [
  {
    id: "tiet-kiem",
    name: "Combo Tiết kiệm",
    tagline: "Gói cơ bản — sơn lót + sơn vân, dùng trong nhà",
    useFor: "Vách / cột xi măng trong nhà, công trình tiết kiệm chi phí",
    includes: ["Lotus Wood Primer (lót)", "Lotus Wood Plank (tạo vân)"],
    variants: [
      { id: "tk-s", label: "Combo nhỏ", spec: "2 loại × 1kg (tổng 2kg) · ~8 m²", price: 486000, area: 8 },
      { id: "tk-l", label: "Combo lớn", spec: "2 loại × 3.5kg (tổng 7kg) · ~28 m²", price: 1680000, area: 28 },
    ],
  },
  {
    id: "tuong-vach",
    name: "Combo cho Tường & Vách",
    tagline: "Đủ 3 lớp — lót, vân, phủ bảo vệ trong/ngoài trời",
    useFor: "Vách, lam, hàng rào, tường ốp Cemboard / Fiber Cement",
    includes: [
      "Lotus Wood Primer (lót)",
      "Lotus Wood Plank (tạo vân)",
      "Lotus Shield (phủ bảo vệ)",
    ],
    variants: [
      { id: "tv-s", label: "Combo nhỏ", spec: "3 loại × 1kg (tổng 3kg) · ~8 m²", price: 761400, area: 8 },
      { id: "tv-l", label: "Combo lớn", spec: "3 loại × 3.5kg (tổng 10.5kg) · ~28 m²", price: 2650000, area: 28 },
    ],
  },
  {
    id: "san",
    name: "Combo cho Sàn",
    tagline: "Chuyên cho sàn — chịu mài mòn, đi lại, ngoài trời",
    useFor: "Sàn, ban công, sân vườn, khu vực chịu mài mòn cao",
    includes: [
      "Lotus Wood Primer (lót)",
      "Lotus Wood Decking Paint (vân gỗ cho sàn)",
      "Lotus Hard Shield (phủ bóng cứng)",
    ],
    variants: [
      { id: "sn-s", label: "Combo nhỏ", spec: "3 loại × 1kg (tổng 3kg) · ~8 m²", price: 853200, area: 8 },
      { id: "sn-l", label: "Combo lớn", spec: "3 loại × 3.5kg (tổng 10.5kg) · ~28 m²", price: 2970000, area: 28 },
    ],
  },
];

const fmt = (n: number) => n.toLocaleString("vi-VN");

export function Combos() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const [comboColors, setComboColors] = useState<Record<string, string>>({});

  const total = useMemo(() => {
    let price = 0;
    let area = 0;
    const selected: { name: string; variant: string; qty: number }[] = [];
    for (const c of COMBOS) {
      for (const v of c.variants) {
        const q = qty[v.id] ?? 0;
        if (q > 0) {
          price += v.price * q;
          area += v.area * q;
          selected.push({ name: c.name, variant: v.label, qty: q });
        }
      }
    }
    return { price, area, selected };
  }, [qty]);

  const set = (id: string, next: number) =>
    setQty((s) => ({ ...s, [id]: Math.max(0, Math.min(99, next)) }));

  return (
    <section id="bao-gia" className="border-b border-walnut/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-32">
        <div className="mb-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal/50">06 — Combo & báo giá</span>
            <h2 className="mt-5 font-serif text-[34px] leading-tight text-charcoal sm:text-4xl">
              Chọn combo —<br />
              <em className="not-italic text-clay">đặt hàng ngay.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 md:self-end">
            <p className="text-[15px] leading-relaxed text-charcoal/65">
              3 combo cho 3 nhu cầu. Combo lớn tiết kiệm hơn 15%. Định mức: nhỏ ~8 m² · lớn ~28 m² (2 lớp).
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {COMBOS.map((c) => {
            const isOpen = openId === c.id;
            const comboQty = c.variants.reduce((s, v) => s + (qty[v.id] ?? 0), 0);
            const priceMin = Math.min(...c.variants.map((v) => v.price));
            return (
            <article
              key={c.id}
              className="flex flex-col border border-walnut/15 bg-cream p-6"
            >
              <h3 className="font-serif text-[22px] text-charcoal">{c.name}</h3>
              <p className="mt-2 text-[13px] text-charcoal/60">{c.tagline}</p>

              {/* Mobile-only collapsed summary + toggle */}
              <div className="mt-4 lg:hidden">
                <div className="flex items-center justify-between gap-3 border border-walnut/15 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Từ</p>
                    <p className="text-[17px] font-semibold text-clay">
                      {fmt(priceMin)}đ
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : c.id)}
                    aria-expanded={isOpen}
                    className="inline-flex items-center gap-1 border border-clay/40 px-4 py-2 text-[11px] font-medium text-clay"
                  >
                    {isOpen ? "Thu gọn" : comboQty > 0 ? `Đã chọn ${comboQty} · Sửa` : "Xem chi tiết"}
                    <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>
                </div>
              </div>

              <div
                className={`${isOpen ? "block" : "hidden"} lg:block mt-5 bg-sand/40 px-4 py-4 text-sm`}
              >
                <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-charcoal/50">Dùng cho</p>
                <p className="mt-1 text-[13px] text-charcoal/80">{c.useFor}</p>
                <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.15em] text-charcoal/50">Gồm</p>
                <ul className="mt-1 space-y-0.5 text-[13px] text-charcoal/80">
                  {c.includes.map((it) => (
                    <li key={it}>— {it}</li>
                  ))}
                </ul>
              </div>

              <div className={`${isOpen ? "block" : "hidden"} lg:block mt-5 space-y-3`}>
                {c.variants.map((v, idx) => {
                  const big = idx === 1;
                  const q = qty[v.id] ?? 0;
                  const colorKey = `${c.id}-${v.id}`;
                  return (
                    <div
                      key={v.id}
                      className={`border p-4 transition-colors ${
                        big
                          ? "border-clay/25 bg-sand/25"
                          : "border-walnut/12 bg-background/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-foreground">{v.label}</p>
                            {big && (
                              <span className="bg-clay px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-cream">
                                Tiết kiệm hơn
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{v.spec}</p>
                          <p className="mt-2 text-[17px] font-semibold text-clay">
                            {fmt(v.price)}đ
                          </p>
                          {q > 0 && (
                            <div className="mt-3">
                              <label className="mb-1.5 block text-xs font-medium text-foreground">
                                Mã màu sơn
                              </label>
                              <select
                                value={comboColors[colorKey] || ""}
                                onChange={(e) => setComboColors({ ...comboColors, [colorKey]: e.target.value })}
                                className="w-full border border-walnut/20 bg-background px-3 py-2 text-[13px] text-charcoal transition-colors focus:border-clay focus:outline-none"
                              >
                                <option value="">Chưa chọn màu</option>
                                {WOOD_COLORS.map((color) => (
                                  <option key={color.code} value={`${color.name} (${color.code})`}>
                                    {color.name} — {color.code}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                        <Stepper
                          value={q}
                          onChange={(n) => set(v.id, n)}
                          label={`${v.label} ${c.name}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
            );
          })}
        </div>

        {/* Tạm tính */}
        <div className="mt-8 border border-walnut/15 bg-sand/30 px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/50">
                Tạm tính
              </p>
              {total.selected.length === 0 ? (
                <p className="mt-2 text-sm text-foreground/80 sm:text-base">
                  Chọn số lượng combo phía trên — giá sẽ tự cộng.
                </p>
              ) : (
                <ul className="mt-2 space-y-0.5 text-sm text-foreground/85">
                  {total.selected.map((s, i) => (
                    <li key={i}>
                      {s.qty} × {s.name} — {s.variant}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                Giá trên trang là giá niêm yết — áp dụng cho đơn mua nhanh.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-muted-foreground">
                Phủ được ~{" "}
                <span className="font-semibold text-foreground">
                  {total.area} m²
                </span>
              </p>
              <p className="text-3xl font-semibold text-charcoal sm:text-4xl">
                {fmt(total.price)}đ
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Chưa gồm phí vận chuyển
              </p>
            </div>
          </div>
          {total.price > 0 && (
            <div className="mt-5 flex flex-col gap-2 border-t border-walnut/15 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  // Save combo selection to localStorage
                  const comboSummary = total.selected.map(s => `${s.qty}× ${s.name} (${s.variant})`).join(', ');
                  const totalQty = total.selected.reduce((sum, s) => sum + s.qty, 0);
                  const totalPrice = total.price;
                  
                  // Build color mapping for each selected combo
                  const colorMapping: Record<string, string> = {};
                  total.selected.forEach((s, index) => {
                    const combo = COMBOS.find(c => c.name === s.name);
                    if (combo) {
                      const variant = combo.variants.find(v => v.label === s.variant);
                      if (variant) {
                        const colorKey = `${combo.id}-${variant.id}`;
                        if (comboColors[colorKey]) {
                          colorMapping[`${s.name}-${s.variant}-${index}`] = comboColors[colorKey];
                        }
                      }
                    }
                  });
                  
                  console.log('Saving to localStorage:', { comboSummary, totalQty, totalPrice, colorMapping });
                  localStorage.setItem('selectedCombo', comboSummary);
                  localStorage.setItem('selectedQuantity', totalQty.toString());
                  localStorage.setItem('selectedTotalPrice', totalPrice.toString());
                  localStorage.setItem('selectedColors', JSON.stringify(colorMapping));
                  console.log('Saved successfully');

                  // Dispatch custom event to notify OrderForm
                  window.dispatchEvent(new CustomEvent('comboUpdated', { 
                    detail: { 
                      combo: comboSummary, 
                      quantity: totalQty.toString(), 
                      totalPrice: totalPrice.toString(),
                      colors: colorMapping
                    } 
                  }));

                  // Navigate to order form
                  window.location.href = '#dat-hang';
                }}
                className="inline-flex items-center justify-center bg-clay px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-cream transition hover:bg-walnut"
              >
                Đặt hàng với báo giá này →
              </button>
            </div>
          )}

          <div className="mt-6 border-t border-walnut/12 pt-5">
            <p className="text-[13px] text-charcoal/65">
              Công trình lớn cần báo giá chi tiết?{" "}
              <a href={ZALO_URL} target="_blank" rel="noreferrer" className="border-b border-clay pb-0.5 text-clay hover:text-walnut">
                Nhắn Zalo để tư vấn đúng hệ và báo giá theo hạng mục
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stepper({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <div className="flex flex-shrink-0 items-center border border-walnut/20 bg-background">
      <button
        type="button"
        aria-label={`Giảm ${label}`}
        onClick={() => onChange(value - 1)}
        className="grid h-9 w-9 place-items-center text-foreground/70 transition-colors hover:bg-muted disabled:opacity-40"
        disabled={value <= 0}
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums text-foreground">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Tăng ${label}`}
        onClick={() => onChange(value + 1)}
        className="grid h-9 w-9 place-items-center text-foreground/70 transition-colors hover:bg-muted"
      >
        +
      </button>
    </div>
  );
}
