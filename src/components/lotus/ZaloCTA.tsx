import { HOTLINE, HOTLINE_TEL, ZALO_URL } from "./constants";

export function ZaloCTA() {
  return (
    <section className="border-b border-walnut/10 bg-sand/30">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-32">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6">
            <span className="font-serif text-[12px] uppercase tracking-[0.3em] text-charcoal/50">Tư vấn dự án</span>
            <h2 className="mt-5 font-serif text-[32px] leading-tight text-charcoal sm:text-4xl">
              Gửi ảnh bề mặt —<br />
              <em className="not-italic text-clay">Lotus tư vấn đúng hệ<br />và gợi ý màu phù hợp.</em>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-charcoal/65">
              Gửi ảnh hạng mục qua Zalo: tư vấn đúng hệ sơn theo loại tấm xi măng, xác nhận màu trên mẫu thực tế, báo giá theo dự án và tiến độ.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#0068FF] px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-white transition hover:bg-[#0056d6]"
              >
                Nhắn Zalo ngay
              </a>
              <a
                href={HOTLINE_TEL}
                className="inline-flex items-center gap-2 border border-walnut/30 px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-charcoal/80 transition hover:border-charcoal hover:text-charcoal"
              >
                Gọi {HOTLINE}
              </a>
            </div>
          </div>
          <div className="col-span-12 border-t border-walnut/12 pt-8 md:col-span-5 md:col-start-8 md:border-l md:border-t-0 md:pl-10 md:pt-0 md:self-center">
            <dl className="divide-y divide-walnut/10">
              {[
                { dt: "Tư vấn đúng hệ", dd: "Theo loại tấm: Smartwood, Conwood, Cemboard, fiber cement" },
                { dt: "Xác nhận màu", dd: "Mẫu thực tế trước khi lên đơn lớn" },
                { dt: "Báo giá theo dự án", dd: "Định mức và tiến độ giao hàng theo công trình" },
              ].map((r) => (
                <div key={r.dt} className="py-4">
                  <dt className="text-[15px] font-medium text-charcoal">{r.dt}</dt>
                  <dd className="mt-0.5 text-[14px] text-charcoal/55">{r.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
