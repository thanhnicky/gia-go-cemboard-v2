const TRUST = [
  { t: "Chuyên cho Fiber Cement / Cemboard", s: "Đúng hệ cho từng nền vật liệu" },
  { t: "Gốc nước", s: "An toàn thi công, ít mùi" },
  { t: "Độ bền màu cao ngoài trời", s: "Chịu nắng mưa khí hậu Việt Nam" },
  { t: "Hỗ trợ chọn đúng hệ", s: "Tư vấn 1-1 theo hạng mục" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-[var(--cement)]/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-border/60 sm:grid-cols-4">
        {TRUST.map((it) => (
          <div key={it.t} className="bg-[var(--cement)]/40 px-5 py-5 sm:px-6 sm:py-6">
            <p className="font-serif text-sm font-semibold text-foreground sm:text-base">
              {it.t}
            </p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{it.s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
