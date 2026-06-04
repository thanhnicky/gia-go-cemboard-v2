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

  // Bank information
  const BANK_INFO = {
    bank: "Eximbank",
    bankId: "EIB",
    account: "211014851223910",
    accountName: "CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI DỊCH VỤ BÍCH TRANG",
    branch: "CN TP.HCM"
  };

  useEffect(() => {
    // Get order data from localStorage
    const storedData = localStorage.getItem(`order_${phone}`);
    if (storedData) {
      setOrderData(JSON.parse(storedData));
    }
  }, [phone]);

  // Parse combo string to get detailed items
  const parseComboItems = (comboStr: string, colorsStr: string) => {
    if (!comboStr) return [];
    const items: any[] = [];
    const parts = comboStr.split(', ');
    const colors = colorsStr ? colorsStr.split('; ') : [];
    
    parts.forEach((part, index) => {
      const match = part.match(/(\d+)×\s*(.+?)\s*\((.+?)\)/);
      if (match) {
        const qty = parseInt(match[1]);
        const name = match[2].trim();
        const variant = match[3].trim();
        const color = colors[index] || "Chưa chọn màu";
        
        // Estimate price based on variant (simplified logic)
        let price = 0;
        if (variant.includes("nhỏ")) {
          price = name.includes("Tiết kiệm") ? 486000 : 
                   name.includes("Tường & Vách") ? 761400 :
                   name.includes("Sàn") ? 853200 : 375000;
        } else if (variant.includes("lớn")) {
          price = name.includes("Tiết kiệm") ? 1680000 :
                   name.includes("Tường & Vách") ? 2650000 :
                   name.includes("Sàn") ? 2970000 : 610000;
        }
        
        items.push({
          name: `${name} ${variant}`,
          color: color,
          quantity: qty,
          price: price * qty
        });
      }
    });
    return items;
  };

  // Generate VietQR URL
  const generateVietQRUrl = (amount: number, content: string) => {
    const encodedContent = encodeURIComponent(content);
    const encodedAccountName = encodeURIComponent(BANK_INFO.accountName);
    return `https://img.vietqr.io/image/${BANK_INFO.bankId}-${BANK_INFO.account}-compact2.png?amount=${amount}&addInfo=${encodedContent}&accountName=${encodedAccountName}`;
  };

  const comboItems = orderData ? parseComboItems(orderData.combo, orderData.colors) : [];
  const originalPrice = orderData?.originalPrice ? parseInt(orderData.originalPrice) : (orderData?.totalPrice ? parseInt(orderData.totalPrice) : 0);
  const finalPrice = orderData?.totalPrice ? parseInt(orderData.totalPrice) : originalPrice;
  const discountAmount = originalPrice - finalPrice;
  const transferContent = `LOTUS ${orderData?.phone || ''}`;

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
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-green-500 text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                Đặt hàng thành công!
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                Cám ơn khách hàng {orderData?.name || ''} đã sử dụng sản phẩm của Sơn Lotus
              </p>
            </div>

            {orderData && (
              <>
                <div className="mt-10 rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
                    TÓM TẮT ĐƠN HÀNG
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Người nhận:</span>
                      <span className="font-medium text-foreground">{orderData.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Số điện thoại:</span>
                      <span className="font-medium text-foreground">{orderData.phone}</span>
                    </div>
                    {orderData.province && (
                      <div className="flex justify-between border-b border-border pb-3">
                        <span className="text-muted-foreground">Địa chỉ giao hàng:</span>
                        <span className="font-medium text-foreground">{orderData.province}</span>
                      </div>
                    )}
                  </div>
                </div>

                {comboItems.length > 0 && (
                  <div className="mt-6 rounded-xl border border-border bg-card p-6">
                    <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
                      CHI TIẾT SẢN PHẨM
                    </h2>
                    <div className="space-y-3 text-sm">
                      {comboItems.map((item, index) => (
                        <div key={index} className="border-b border-border pb-3 last:border-0">
                          <div className="flex justify-between">
                            <span className="font-medium text-foreground">{item.name}</span>
                            <span className="font-medium text-foreground">{item.price.toLocaleString('vi-VN')}₫</span>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Màu sơn: {item.color} x{item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
                        TỔNG CỘNG
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tạm tính:</span>
                      <span className="font-medium text-foreground">{originalPrice.toLocaleString('vi-VN')}₫</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Giảm giá Online (10%):</span>
                        <span className="font-medium text-green-600">-{discountAmount.toLocaleString('vi-VN')}₫</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-border pt-2 mt-2">
                      <span className="font-semibold text-foreground">Tổng cộng:</span>
                      <span className="font-serif text-xl font-semibold text-[var(--brand)]">{finalPrice.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-muted-foreground">Hình thức thanh toán:</span>
                      <span className="font-medium text-foreground">
                        {orderData.paymentMethod === 'online' ? 'Chuyển khoản Online' : 'Thanh toán khi nhận hàng (COD)'}
                      </span>
                    </div>
                  </div>
                </div>

                {orderData.paymentMethod === 'online' && (
                  <div className="mt-6 rounded-xl border border-border bg-card p-6">
                    <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
                      THÔNG TIN CHUYỂN KHOẢN
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Ngân hàng:</span>
                          <span className="ml-2 font-medium text-foreground">{BANK_INFO.bank}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Số tài khoản:</span>
                          <span className="ml-2 font-medium text-foreground">{BANK_INFO.account}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Chủ tài khoản:</span>
                          <span className="ml-2 font-medium text-foreground">{BANK_INFO.accountName}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Nội dung chuyển khoản:</span>
                          <span className="ml-2 font-medium text-foreground">{transferContent}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <img 
                          src={generateVietQRUrl(finalPrice, transferContent)}
                          alt="VietQR Code"
                          className="w-48 h-48 rounded-lg border border-border"
                          onError={(e) => {
                            console.error('QR load error:', e);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <p className="mt-2 text-xs text-center text-muted-foreground">
                          Quét mã VietQR để tự động điền thông tin
                        </p>
                        <p className="mt-1 text-xs text-center text-muted-foreground">
                          LOTUS PAINT
                        </p>
                        <p className="text-xs text-center text-muted-foreground">
                          {BANK_INFO.account}
                        </p>
                        <p className="text-xs text-center text-muted-foreground">
                          Số tiền: {finalPrice.toLocaleString('vi-VN')} VND
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-3 font-serif text-lg font-semibold text-foreground">
                    GHI CHÚ
                  </h2>
                  <ul className="space-y-2 text-xs text-muted-foreground list-disc list-inside">
                    <li>Lotus có thể liên hệ lại với bạn khi cần thiết để xác nhận khi thông tin chưa rõ</li>
                    <li>Hàng được đóng gói và giao nhanh 24-48h tại TP.HCM và khu vực lân cận. Các tỉnh thành khác thời gian giao từ 3-5 ngày theo lịch của đơn vị Giao Hàng Nhanh.</li>
                    <li>Nếu cần hỗ trợ khẩn cấp, vui lòng liên hệ Hotline: 0943 966 662</li>
                  </ul>
                </div>
              </>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-base font-semibold text-foreground hover:bg-muted"
              >
                Về trang chủ
              </a>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 text-base font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Nhắn Zalo →
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
