import { Logo } from "./Logo";
import { HOTLINE, HOTLINE_TEL, ZALO_URL } from "./constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Lotus — hệ sơn vân gỗ chuyên dụng cho tấm xi măng, fiber cement,
              Smartwood, Conwood, Cemboard. Tư vấn đúng hệ cho từng hạng mục.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Liên hệ
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              <li>
                Hotline:{" "}
                <a href={HOTLINE_TEL} className="font-semibold hover:underline">
                  {HOTLINE}
                </a>
              </li>
              <li>
                Zalo:{" "}
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold hover:underline"
                >
                  Nhắn tin ngay
                </a>
              </li>
              <li>
                Website:{" "}
                <span className="text-muted-foreground">lotus-paint.vn</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Showroom
            </p>
            <p className="mt-4 text-sm text-foreground/85">
              Địa chỉ: 123 Đường Lotus, Quận 1, TP. Hồ Chí Minh
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Giờ làm việc: 8:00 – 18:00 (T2 – T7)
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Sơn giả gỗ Lotus. Thương hiệu Việt Nam.</p>
          <p>Bảng màu hiển thị chỉ mang tính tham khảo.</p>
        </div>
      </div>
    </footer>
  );
}
