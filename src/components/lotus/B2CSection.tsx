import { useState } from "react";
import { Combos } from "./Combos";
import { OrderForm } from "./OrderForm";

export function B2CSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="dat-le-online" className="border-b border-walnut/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-32">
        {/* Header Section */}
        <div className="mb-8 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <span className="font-serif text-[12px] uppercase tracking-[0.3em] text-charcoal/50">
              Dành cho khách lẻ
            </span>
            <h2 className="mt-5 font-serif text-[34px] leading-tight text-charcoal sm:text-4xl">
              Đặt lẻ online
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-charcoal/65">
              Dành cho đơn nhỏ đã chốt hệ và màu. Công trình hoặc đơn lớn nên nhắn Zalo để được tư vấn đúng hệ và báo giá theo hạng mục.
            </p>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group inline-flex items-center gap-3 border-b border-clay pb-0.5 text-[13px] text-clay transition-colors hover:text-walnut"
        >
          <span>{isExpanded ? "Thu gọn" : "Mở bảng giá & form đặt hàng"}</span>
          <span 
            className="transition-transform duration-300"
            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ↓
          </span>
        </button>

        {/* Expandable Content */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: isExpanded ? "5000px" : "0px",
            opacity: isExpanded ? "1" : "0",
          }}
        >
          <div className="pt-10">
            <Combos />
            <OrderForm />
          </div>
        </div>
      </div>
    </section>
  );
}
