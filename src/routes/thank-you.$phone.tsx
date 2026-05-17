import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ZALO_URL } from "../components/lotus/constants";

export const Route = createFileRoute("/thank-you/$phone")({
  component: ThankYouPage,
});

function ThankYouPage() {
  const params = Route.useParams();
  const phone = (params as any).phone as string;
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Get order data from localStorage
    const storedData = localStorage.getItem(`order_${phone}`);
    if (storedData) {
      setOrderData(JSON.parse(storedData));
    }
  }, [phone]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
          <a href="/" className="font-serif text-xl font-semibold text-[var(--brand)]">
            Sơn Giả Gỗ Lotus
          </a>
        </div>
      </header>

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand-soft)]/40 p-8 sm:p-12">
            <div className="text-center">
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[var(--brand)] text-[var(--brand-foreground)]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                Cảm ơn bạn đã đặt hàng!
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                Lotus đã nhận được yêu cầu của bạn. Chúng tôi sẽ liên hệ trong thời gian sớm nhất để xác nhận hạng mục, hệ sơn và màu trước khi lên đơn.
              </p>
            </div>

            {orderData && (
              <div className="mt-10 rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                  Tóm tắt đơn hàng
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-muted-foreground">Họ và tên:</span>
                    <span className="font-medium text-foreground">{orderData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-muted-foreground">Số điện thoại:</span>
                    <span className="font-medium text-foreground">{orderData.phone}</span>
                  </div>
                  {orderData.combo && (
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Combo sơn:</span>
                      <span className="font-medium text-foreground">{orderData.combo}</span>
                    </div>
                  )}
                  {orderData.quantity && (
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Số lượng:</span>
                      <span className="font-medium text-foreground">{orderData.quantity}</span>
                    </div>
                  )}
                  {orderData.colors && (
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Màu đã chọn:</span>
                      <span className="font-medium text-foreground">{orderData.colors}</span>
                    </div>
                  )}
                  {orderData.province && (
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Tỉnh / thành:</span>
                      <span className="font-medium text-foreground">{orderData.province}</span>
                    </div>
                  )}
                  {orderData.note && (
                    <div className="flex justify-between pb-3">
                      <span className="text-muted-foreground">Ghi chú:</span>
                      <span className="font-medium text-foreground">{orderData.note}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 text-base font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Nhắn Zalo để xử lý nhanh hơn
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-base font-semibold text-foreground hover:bg-muted"
              >
                Về trang chủ
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
