const POINTS = [
  {
    n: "01",
    t: "Giữ ưu điểm của vật liệu xi măng",
    d: "Tấm xi măng bền, chịu thời tiết, không cong vênh — hệ sơn Lotus không thay vật liệu, chỉ thay đổi bề mặt.",
  },
  {
    n: "02",
    t: "Giữ nền tấm xi măng ổn định, nhưng bề mặt nhìn gần gỗ thật hơn.",
    d: "Lớp hoàn thiện tạo chiều sâu và vân gỗ tự nhiên trên nền xi măng. Người xem khó nhận ra đây không phải gỗ thật.",
  },
  {
    n: "03",
    t: "Phù hợp cho mọi hạng mục ngoài trời",
    d: "Chịu UV, chịu ẩm, bền nhiều năm trên mặt tiền, lam, vách, sàn ngoài trời — với đúng hệ sơn cho từng loại nền.",
  },
  {
    n: "04",
    t: "Ấm hơn, gần tự nhiên hơn, có chiều sâu hơn",
    d: "Thay đổi tone công trình từ cứng, lạnh, vật liệu xây dựng sang ấm, gần với kiến trúc gỗ tự nhiên.",
  },
];

export function Systems() {
  return (
    <section className="border-b border-walnut/10 bg-charcoal text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-32">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <span className="font-serif text-[12px] uppercase tracking-[0.3em] text-cream/60">03 — Vì sao giả gỗ trên xi măng</span>
            <h2 className="mt-5 font-serif text-[34px] leading-tight sm:text-4xl md:text-5xl">
              Giữ độ bền<br />của xi măng.<br />
              <em className="not-italic text-clay">Đưa bề mặt<br />gần hơn với gỗ.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 md:pt-2">
            <p className="font-serif text-[20px] leading-[1.65] text-cream/90 md:text-[22px]">
              Smartwood, Conwood, Cemboard — vật liệu nhân tạo bền nhưng lạnh. Hệ sơn giả gỗ Lotus không phá kết cấu, không thay tấm xi măng. Nó chỉ thay đổi bề mặt — theo hướng ấm hơn, đẹp hơn, gần ngôn ngữ gỗ và kiến trúc hơn.
            </p>
            <ul className="mt-14 divide-y divide-cream/15 border-t border-cream/15">
              {POINTS.map((b) => (
                <li key={b.n} className="flex gap-8 py-7">
                  <span className="mt-0.5 shrink-0 font-serif text-[14px] uppercase tracking-[0.25em] text-clay">{b.n}</span>
                  <div>
                    <div className="font-serif text-[19px] text-cream">{b.t}</div>
                    <p className="mt-2 text-[13px] leading-relaxed text-cream/75">{b.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
