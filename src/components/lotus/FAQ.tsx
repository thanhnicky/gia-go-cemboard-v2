import { useState } from "react";

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
    a: "Bạn có thể chọn nhanh theo nhóm Tone sáng / Tone ấm tự nhiên / Tone nâu đậm ở phần Bảng màu. Nếu vẫn phân vân, gửi ảnh hạng mục qua Zalo, Lotus sẽ gợi ý màu phù hợp với không gian và ánh sáng thực tế.",
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
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
            Câu hỏi thường gặp
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Mọi điều khách hàng thường hỏi.
          </h2>
        </div>
        <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base font-semibold text-foreground sm:text-lg">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className={`mt-1 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-border text-foreground/70 transition-transform ${isOpen ? "rotate-45 border-[var(--brand)] text-[var(--brand)]" : ""}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path
                        d="M6 1.5V10.5M1.5 6H10.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-7 sm:text-base">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
