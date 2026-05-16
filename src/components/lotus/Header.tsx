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
          ? "border-border/70 bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Nhắn Zalo
          </a>
          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 bg-foreground transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-2.5 h-0.5 w-4 bg-foreground transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/85 hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-[var(--brand-foreground)]"
            >
              Nhắn Zalo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
