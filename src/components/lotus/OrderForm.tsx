import { useState, type FormEvent } from "react";
import { z } from "zod";
import { ZALO_URL } from "./constants";

const Schema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên").max(80),
  phone: z
    .string()
    .trim()
    .min(8, "Số điện thoại chưa đúng")
    .max(15)
    .regex(/^[0-9+\s.()-]+$/, "Số điện thoại chưa hợp lệ"),
  category: z.string().trim().min(1, "Chọn hạng mục").max(80),
  material: z.string().trim().min(1, "Chọn loại vật liệu").max(80),
  color: z.string().trim().max(80).optional().or(z.literal("")),
  area: z.string().trim().max(60).optional().or(z.literal("")),
  province: z.string().trim().max(60).optional().or(z.literal("")),
  note: z.string().trim().max(500).optional().or(z.literal("")),
});

const CATEGORIES = [
  "Mặt tiền",
  "Vách trang trí",
  "Lam che nắng",
  "Hàng rào",
  "Sàn ngoài trời",
  "Cảnh quan / hồ bơi",
  "Khác",
];
const MATERIALS = [
  "Smartwood",
  "Conwood",
  "Cemboard",
  "Fiber Cement",
  "Calcium Silicate",
  "Chưa rõ — cần tư vấn",
];

export function OrderForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const result = Schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as string;
        if (k && !errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="dat-hang" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
            Đặt hàng nhanh
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Đặt hàng nhanh hoặc giữ đơn tư vấn
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Phù hợp cho khách đã chọn gần xong hạng mục, màu và nhu cầu. Lotus
            sẽ liên hệ xác nhận đúng hệ sơn trước khi chốt đơn.
          </p>
        </div>

        {submitted ? (
          <div className="mt-10 rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand-soft)]/40 p-8 text-center">
            <h3 className="font-serif text-2xl font-semibold text-foreground">
              Đã nhận yêu cầu của bạn.
            </h3>
            <p className="mt-2 text-muted-foreground">
              Lotus sẽ liên hệ trong thời gian sớm nhất để xác nhận hạng mục,
              hệ sơn và màu trước khi lên đơn.
            </p>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-[var(--brand-foreground)]"
            >
              Nhắn Zalo để xử lý nhanh hơn
            </a>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="mt-10 grid gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Họ và tên" name="name" error={errors.name} required>
                <input
                  name="name"
                  maxLength={80}
                  className="form-input"
                  placeholder="Nguyễn Văn A"
                />
              </Field>
              <Field
                label="Số điện thoại"
                name="phone"
                error={errors.phone}
                required
              >
                <input
                  name="phone"
                  inputMode="tel"
                  maxLength={15}
                  className="form-input"
                  placeholder="09xx xxx xxx"
                />
              </Field>
              <Field
                label="Hạng mục cần sơn"
                name="category"
                error={errors.category}
                required
              >
                <select name="category" className="form-input" defaultValue="">
                  <option value="" disabled>
                    Chọn hạng mục
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Loại vật liệu nền"
                name="material"
                error={errors.material}
                required
              >
                <select name="material" className="form-input" defaultValue="">
                  <option value="" disabled>
                    Chọn vật liệu
                  </option>
                  {MATERIALS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Màu đã chọn" name="color">
                <input
                  id="form-color"
                  name="color"
                  maxLength={80}
                  className="form-input"
                  placeholder="VD: Walnut đậm (L-301)"
                />
              </Field>
              <Field label="Diện tích hoặc số lượng" name="area">
                <input
                  name="area"
                  maxLength={60}
                  className="form-input"
                  placeholder="VD: 60 m² hoặc 12 lít"
                />
              </Field>
              <Field label="Tỉnh / thành" name="province">
                <input
                  name="province"
                  maxLength={60}
                  className="form-input"
                  placeholder="VD: TP. Hồ Chí Minh"
                />
              </Field>
              <Field label="Ghi chú thêm" name="note">
                <input
                  name="note"
                  maxLength={500}
                  className="form-input"
                  placeholder="Yêu cầu khác (nếu có)"
                />
              </Field>
            </div>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3.5 text-base font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Đặt hàng ngay
                <span aria-hidden>→</span>
              </button>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline sm:ml-2"
              >
                Cần tư vấn sâu hơn? Nhắn Zalo
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              Lotus sẽ liên hệ xác nhận đúng hạng mục, đúng hệ sơn và hỗ trợ
              chốt màu trước khi lên đơn.
            </p>
          </form>
        )}
      </div>
      <style>{`
        .form-input {
          width: 100%;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          padding: 0.85rem 1rem;
          font-size: 1rem;
          color: var(--foreground);
          transition: border-color .15s, box-shadow .15s;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--brand);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--brand) 18%, transparent);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="mb-1.5 flex items-center gap-1 text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-[var(--brand)]">*</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs text-destructive">{error}</span>
      )}
    </label>
  );
}
