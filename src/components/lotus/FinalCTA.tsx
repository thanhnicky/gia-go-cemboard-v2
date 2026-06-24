import { ZALO_URL } from "./constants";

export function FinalCTA() {
  return (
    <section className="border-t border-walnut/10 bg-charcoal text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-32">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8">
            <span className="font-serif text-[12px] uppercase tracking-[0.3em] text-cream/60">Bắt đầu</span>
            <h2 className="mt-5 font-serif text-[36px] leading-tight sm:text-5xl md:text-[52px]">
              Gửi hạng mục — Lotus báo giá và tư vấn đúng hệ, miễn phí.
            </h2>
            <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-cream/80">
              Gửi ảnh hoặc bản vẽ hạng mục qua Zalo. Lotus xác nhận đúng hệ sơn cho từng loại tấm xi măng, tư vấn màu và báo giá theo diện tích — trước khi bạn lên đơn.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#0068FF] px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-white transition hover:bg-[#0056d6]"
              >
                Gửi hạng mục qua Zalo
              </a>
              <a
                href="#dat-le-online"
                className="inline-flex items-center gap-3 border border-cream/45 px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-cream/90 transition hover:border-cream hover:text-cream"
              >
                Đặt lẻ online
              </a>
            </div>
            <div className="mt-6 text-center text-[12px] text-cream/50 md:text-left">
              ✓ Tư vấn kỹ thuật miễn phí · Cung cấp TDS/MSDS · Giao hàng đúng tiến độ
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
