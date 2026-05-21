import { P as reactExports, H as jsxRuntimeExports } from "./server-DchLKkrC.mjs";
import { Z as ZALO_URL } from "./constants-BIxjIQhi.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function ThankYouPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const phone = searchParams.get("phone") || "";
  const [orderData, setOrderData] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (phone) {
      const storedData = localStorage.getItem(`order_${phone}`);
      if (storedData) {
        setOrderData(JSON.parse(storedData));
      }
    }
  }, [phone]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "font-serif text-xl font-semibold text-[var(--brand)]", children: "Sơn Giả Gỗ Lotus" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "py-16 sm:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand-soft)]/40 p-8 sm:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[var(--brand)] text-[var(--brand-foreground)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl font-semibold text-foreground sm:text-4xl", children: "Cảm ơn bạn đã đặt hàng!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base text-muted-foreground", children: "Lotus đã nhận được yêu cầu của bạn. Chúng tôi sẽ liên hệ trong thời gian sớm nhất để xác nhận hạng mục, hệ sơn và màu trước khi lên đơn." })
      ] }),
      orderData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-serif text-xl font-semibold text-foreground", children: "Tóm tắt đơn hàng" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Họ và tên:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: orderData.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Số điện thoại:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: orderData.phone })
          ] }),
          orderData.combo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Combo sơn:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: orderData.combo })
          ] }),
          orderData.quantity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Số lượng:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: orderData.quantity })
          ] }),
          orderData.totalPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tổng giá:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-[var(--brand)]", children: [
              parseInt(orderData.totalPrice).toLocaleString("vi-VN"),
              "đ"
            ] })
          ] }),
          orderData.colors && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Màu đã chọn:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: orderData.colors })
          ] }),
          orderData.province && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tỉnh / thành:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: orderData.province })
          ] }),
          orderData.note && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Ghi chú:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: orderData.note })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: ZALO_URL, target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 text-base font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5", children: "Nhắn Zalo để xử lý nhanh hơn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-base font-semibold text-foreground hover:bg-muted", children: "Về trang chủ" })
      ] })
    ] }) }) })
  ] });
}
export {
  ThankYouPage as component
};
