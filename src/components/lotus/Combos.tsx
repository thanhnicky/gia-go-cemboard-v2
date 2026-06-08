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
    <section id="bao-gia" className="bg-[var(--cement)]/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
            Combo & báo giá nhanh
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Chọn combo phù hợp — Đặt hàng ngay
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            3 combo cho 3 nhu cầu khác nhau. <strong>Combo lớn tiết kiệm hơn 15%</strong>. Mỗi combo có thể chọn một màu riêng.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {COMBOS.map((c) => {
            const isOpen = openId === c.id;
            const comboQty = c.variants.reduce((s, v) => s + (qty[v.id] ?? 0), 0);
            const priceMin = Math.min(...c.variants.map((v) => v.price));
            return (
            <article
              key={c.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-serif text-2xl font-semibold text-foreground">
                {c.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.tagline}</p>

              {/* Mobile-only collapsed summary + toggle */}
              <div className="mt-4 lg:hidden">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Từ</p>
                    <p className="font-serif text-lg font-semibold text-[var(--brand)]">
                      {fmt(priceMin)}đ
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : c.id)}
                    aria-expanded={isOpen}
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--brand)]/40 bg-background px-4 py-2 text-xs font-semibold text-[var(--brand)]"
                  >
                    {isOpen ? "Thu gọn" : comboQty > 0 ? `Đã chọn ${comboQty} · Sửa` : "Xem chi tiết"}
                    <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>
                </div>
              </div>

              <div
                className={`${isOpen ? "block" : "hidden"} lg:block mt-5 rounded-xl bg-[var(--brand-soft)]/40 px-4 py-4 text-sm`}
              >
                <p className="font-semibold text-foreground">Dùng cho:</p>
                <p className="mt-1 text-foreground/80">{c.useFor}</p>
                <p className="mt-3 font-semibold text-foreground">Gồm:</p>
                <ul className="mt-1 space-y-1 text-foreground/80">
                  {c.includes.map((it) => (
                    <li key={it}>• {it}</li>
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
                      className={`rounded-xl border p-4 transition-colors ${
                        big
                          ? "border-[var(--brand)]/35 bg-[var(--brand-soft)]/30"
                          : "border-border bg-background/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-foreground">{v.label}</p>
                            {big && (
                              <span className="rounded-md bg-[var(--brand)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-foreground)]">
                                Tiết kiệm hơn
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{v.spec}</p>
                          <p className="mt-2 font-serif text-lg font-semibold text-[var(--brand)]">
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
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
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
        <div className="mt-8 rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand-soft)]/40 px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
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
              <p className="font-serif text-3xl font-semibold text-[var(--brand)] sm:text-4xl">
                {fmt(total.price)}đ
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Chưa gồm phí vận chuyển
              </p>
            </div>
          </div>
          {total.price > 0 && (
            <div className="mt-5 flex flex-col gap-2 border-t border-[var(--brand)]/20 pt-5 sm:flex-row sm:justify-end">
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
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Đặt hàng với báo giá này →
              </button>
            </div>
          )}

          <div className="mt-6 rounded-xl border border-border bg-card px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Công trình lớn cần báo giá chi tiết?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Nhắn Zalo để Lotus tư vấn đúng hệ, chốt màu thực tế và báo giá theo hạng mục.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Báo giá theo m², hạng mục và tiến độ thi công.
                </p>
              </div>
            </div>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/40 bg-[var(--brand-soft)]/30 px-4 py-2 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand-soft)]/50"
            >
              Cần báo giá dự án lớn — Nhắn Zalo
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Định mức tham khảo: 1 combo nhỏ phủ ~8 m² · 1 combo lớn phủ ~28 m² (2
          lớp, bề mặt phẳng).
        </p>
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
    <div className="flex flex-shrink-0 items-center overflow-hidden rounded-full border border-border bg-background">
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
