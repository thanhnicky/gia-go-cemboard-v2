import { useRef, useState, type PointerEvent } from "react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, x)));
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const onUp = () => { dragging.current = false; };

  return (
    <section className="border-b border-walnut/10 bg-sand/30">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-32">
        <div className="mb-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal/50">04 — So sánh bề mặt</span>
            <h2 className="mt-5 font-serif text-[32px] leading-tight text-charcoal sm:text-4xl">
              Từ xi măng thô —<br />
              <em className="not-italic text-clay">đến bề mặt<br />ngôn ngữ gỗ.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-6 md:self-end">
            <p className="text-[15px] leading-relaxed text-charcoal/65">
              Kéo thanh trượt để thấy sự khác biệt trước và sau khi phủ hệ sơn giả gỗ Lotus trên tấm xi măng.
            </p>
          </div>
        </div>

        <div
          ref={ref}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="relative w-full select-none overflow-hidden aspect-[4/3] sm:aspect-[16/9]"
          style={{ touchAction: "none" }}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-label="So sánh trước và sau"
        >
          <img src={afterImg} alt="Sau khi phủ vân gỗ Lotus" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <img src={beforeImg} alt="Tấm xi măng thô chưa phủ" loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
          <span className="absolute left-4 top-4 bg-cream/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-charcoal backdrop-blur">Trước</span>
          <span className="absolute right-4 top-4 bg-walnut/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur">Sau</span>
          <div className="absolute inset-y-0 w-px bg-cream/70" style={{ left: `${pos}%` }}>
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-cream text-charcoal shadow">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M6 4L2 9L6 14M12 4L16 9L12 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
