import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NAV_ITEMS, ZALO_URL } from "./constants";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors ${
        scrolled
          ? "border-walnut/12 bg-cream/90 backdrop-blur-md"
          : "border-transparent bg-cream"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-12">
        <Logo />
        <nav className="hidden items-center gap-10 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.22em] text-charcoal/60 transition-colors hover:text-charcoal"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden border-b border-clay pb-0.5 text-[11px] uppercase tracking-[0.22em] text-clay transition-colors hover:text-walnut sm:inline-block"
          >
            Nhắn Zalo
          </a>
          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-charcoal transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-3 h-px w-5 bg-charcoal transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-walnut/10 bg-cream lg:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-5 py-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-walnut/8 py-4 text-[11px] uppercase tracking-[0.22em] text-charcoal/70 hover:text-charcoal"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-5 inline-block border-b border-clay pb-0.5 text-[11px] uppercase tracking-[0.22em] text-clay"
            >
              Nhắn Zalo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
