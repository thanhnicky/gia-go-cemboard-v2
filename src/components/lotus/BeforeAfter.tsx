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
  const onUp = () => {
    dragging.current = false;
  };

  return (
    <section className="bg-[var(--cement)]/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
            Before / After
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Từ tấm xi măng thô đến bề mặt vân gỗ.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Kéo thanh trượt để so sánh bề mặt trước và sau khi phủ hệ sơn Lotus.
          </p>
        </div>

        <div
          ref={ref}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="relative mt-10 aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_60px_-30px_oklch(0.22_0.025_45/0.35)] sm:aspect-[16/9]"
          style={{ touchAction: "none" }}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-label="So sánh trước và sau"
        >
          <img
            src={afterImg}
            alt="Sau khi phủ vân gỗ Lotus"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src={beforeImg}
              alt="Tấm xi măng thô chưa phủ"
              loading="lazy"
              className="absolute inset-y-0 left-0 h-full w-[100vw] max-w-none object-cover"
              style={{ width: ref.current?.getBoundingClientRect().width || "100%" }}
            />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground backdrop-blur">
            Trước
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-[var(--brand)]/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-foreground)] backdrop-blur">
            Sau
          </span>
          <div
            className="absolute inset-y-0 w-0.5 bg-background shadow-[0_0_0_1px_oklch(0.22_0.025_45/0.2)]"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background text-[var(--brand)] shadow-[0_4px_14px_oklch(0.22_0.025_45/0.25)]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M6 4L2 9L6 14M12 4L16 9L12 14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
