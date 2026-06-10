import { ZALO_URL } from "./constants";

export function FinalCTA() {
  return (
    <section className="border-t border-walnut/10 bg-charcoal text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-32">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8">
            <span className="font-serif text-[12px] uppercase tracking-[0.3em] text-cream/60">Bắt đầu</span>
            <h2 className="mt-5 font-serif text-[36px] leading-tight sm:text-5xl md:text-[52px]">
              Gửi ảnh bề mặt xi măng —<br />
              <em className="not-italic text-clay">nhận tư vấn màu, hệ sơn</em><br />
              và cách hoàn thiện phù hợp.
            </h2>
            <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-cream/80">
              Đội Lotus tư vấn theo ảnh thực tế: gợi ý màu vân gỗ phù hợp, đúng hệ sơn cho từng loại tấm xi măng, hướng dẫn thi công từng bước.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#0068FF] px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-white transition hover:bg-[#0056d6]"
              >
                Nhắn Zalo ngay
              </a>
              <a
                href="#dat-hang"
                className="inline-flex items-center gap-3 border border-cream/45 px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-cream/90 transition hover:border-cream hover:text-cream"
              >
                Đặt hàng trực tuyến
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
