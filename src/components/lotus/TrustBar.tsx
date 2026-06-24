const TRUST = [
  { value: "500+", label: "công trình đã hoàn thiện" },
  { value: "10+ năm", label: "kinh nghiệm sản xuất" },
  { value: "GS Metrocity · Novaworld", label: "dự án tiêu biểu" },
];

export function TrustBar() {
  return (
    <section className="border-y border-walnut/10 bg-[#f5f0ea]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST.map((it) => (
            <div key={it.value} className="text-center">
              <p className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
                {it.value}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-charcoal/50">
                {it.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
