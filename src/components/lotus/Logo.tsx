export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-full bg-[var(--brand)] text-[var(--brand-foreground)] font-serif text-lg font-semibold"
      >
        L
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
          Lotus
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Sơn giả gỗ
        </span>
      </span>
    </a>
  );
}
