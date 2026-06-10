const FAQS = [
  {
    q: "Sơn này dùng cho Smartwood, Conwood, Cemboard được không?",
    a: "Có. Hệ sơn vân gỗ Lotus được phát triển chuyên cho tấm xi măng, fiber cement và các sản phẩm tương đương như Smartwood, Conwood, Cemboard, Calcium Silicate. Lotus khuyến nghị thi công đúng quy trình lót và phủ để đạt hiệu quả tốt nhất.",
  },
  {
    q: "Vách và sàn có dùng chung một loại không?",
    a: "Không nên. Vách, lam, hàng rào dùng hệ Lotus Wood Plank Paint. Sàn ngoài trời và khu vực chịu mài mòn cần dùng hệ Lotus Decking Paint. Mỗi hệ được tối ưu cho điều kiện sử dụng khác nhau.",
  },
  {
    q: "Dùng ngoài trời có bền màu không?",
    a: "Hệ sơn Lotus có độ bền màu cao ngoài trời khi thi công đúng quy trình và đúng hệ. Tuổi thọ thực tế phụ thuộc vào điều kiện khí hậu, mức độ tiếp xúc nắng mưa và chất lượng bề mặt nền.",
  },
  {
    q: "Tôi chưa biết chọn màu nào thì sao?",
    a: "Bạn có thể chọn nhanh theo nhóm Tone sáng / Tone cam ấm / Tone nâu tự nhiên ở phần Bảng màu. Nếu vẫn phân vân, gửi ảnh hạng mục qua Zalo, Lotus sẽ gợi ý màu phù hợp với không gian và ánh sáng thực tế.",
  },
  {
    q: "Tôi điền form rồi thì bước tiếp theo là gì?",
    a: "Sau khi nhận thông tin, Lotus sẽ gọi hoặc nhắn để xác nhận đúng hạng mục, đúng hệ sơn, chốt màu và báo giá cụ thể trước khi lên đơn. Bạn không bị tính phí khi mới gửi yêu cầu.",
  },
  {
    q: "Tôi muốn tư vấn kỹ trước khi đặt thì liên hệ đâu?",
    a: "Nhấn nút Nhắn Zalo trên trang để chat trực tiếp với bộ phận kỹ thuật của Lotus. Gửi kèm ảnh hạng mục, vật liệu nền và diện tích để được tư vấn chính xác nhất.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-b border-walnut/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-32">
        <div className="mb-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <span className="font-serif text-[12px] uppercase tracking-[0.3em] text-charcoal/50">08 — Câu hỏi thường gặp</span>
            <h2 className="mt-5 font-serif text-[32px] leading-tight text-charcoal sm:text-4xl">
              Những điều<br />khách thường hỏi.
            </h2>
          </div>
        </div>
        <div className="divide-y divide-walnut/12 border-t border-walnut/12">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-0">
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-left marker:content-none">
                <span className="font-serif text-[18px] text-charcoal">{f.q}</span>
                <span className="mt-1 shrink-0 text-[18px] font-light text-clay transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-7 text-[14px] leading-relaxed text-charcoal/65">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
