import { useState, useEffect, type FormEvent } from "react";
import { z } from "zod";
import { ZALO_URL } from "./constants";
import { useRouter } from "@tanstack/react-router";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzrFg2OCg1ZfIdRSVLc65rQQIdtagjXTpTqcWaDmytw-JG-GJldUXuw5CZ4iEu8RWn7/exec";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzrFg2OCg1ZfIdRSVLc65rQQIdtagjXTpTqcWaDmytw-JG-GJldUXuw5CZ4iEu8RWn7/exec";

const Schema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên").max(80),
  phone: z
    .string()
    .trim()
    .min(8, "Số điện thoại chưa đúng")
    .max(15)
    .regex(/^[0-9+\s.()-]+$/, "Số điện thoại chưa hợp lệ"),
  combo: z.string().trim().max(100).optional().or(z.literal("")),
  quantity: z.string().trim().max(20).optional().or(z.literal("")),
  totalPrice: z.string().trim().max(50).optional().or(z.literal("")),
  colors: z.string().trim().max(300).optional().or(z.literal("")),
  province: z.string().trim().max(60).optional().or(z.literal("")),
  note: z.string().trim().max(500).optional().or(z.literal("")),
});

export function OrderForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const router = useRouter();
  const [comboValue, setComboValue] = useState("");
  const [quantityValue, setQuantityValue] = useState("");
  const [totalPriceValue, setTotalPriceValue] = useState("");

  // Load combo and quantity from localStorage on mount and when hash changes
  useEffect(() => {
    const loadFromStorage = () => {
      const savedCombo = localStorage.getItem('selectedCombo');
      const savedQuantity = localStorage.getItem('selectedQuantity');
      const savedTotalPrice = localStorage.getItem('selectedTotalPrice');
      console.log('Loading from localStorage:', { savedCombo, savedQuantity, savedTotalPrice });
      if (savedCombo) setComboValue(savedCombo);
      if (savedQuantity) setQuantityValue(savedQuantity);
      if (savedTotalPrice) setTotalPriceValue(savedTotalPrice);
    };

    loadFromStorage();

    // Also load when hash changes to #dat-hang
    const handleHashChange = () => {
      console.log('Hash changed to:', window.location.hash);
      if (window.location.hash === '#dat-hang') {
        // Small delay to ensure localStorage is updated
        setTimeout(loadFromStorage, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Listen for custom comboUpdated event
    const handleComboUpdate = (e: CustomEvent) => {
      console.log('Combo updated event received:', e.detail);
      if (e.detail.combo) setComboValue(e.detail.combo);
      if (e.detail.quantity) setQuantityValue(e.detail.quantity);
      if (e.detail.totalPrice) setTotalPriceValue(e.detail.totalPrice);
    };

    window.addEventListener('comboUpdated', handleComboUpdate as EventListener);
    
    // Also check periodically for updates (every 500ms for 5 seconds after hash change)
    let checkInterval: NodeJS.Timeout;
    const startChecking = () => {
      let count = 0;
      checkInterval = setInterval(() => {
        loadFromStorage();
        count++;
        if (count >= 10) clearInterval(checkInterval);
      }, 500);
    };

    window.addEventListener('hashchange', startChecking);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('hashchange', startChecking);
      window.removeEventListener('comboUpdated', handleComboUpdate as EventListener);
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

=======

>>>>>>> 45469cf748fc7386c7443e7be51edfecde5ce646
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Load latest combo data from localStorage before submission
    const savedCombo = localStorage.getItem('selectedCombo');
    const savedQuantity = localStorage.getItem('selectedQuantity');
    const savedTotalPrice = localStorage.getItem('selectedTotalPrice');
    if (savedCombo) setComboValue(savedCombo);
    if (savedQuantity) setQuantityValue(savedQuantity);
    if (savedTotalPrice) setTotalPriceValue(savedTotalPrice);
    
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
    setLoading(true);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
<<<<<<< HEAD
      
      // Save order data to localStorage
      localStorage.setItem(`order_${data.phone}`, JSON.stringify(data));
      
      // Clear combo selection from localStorage
      localStorage.removeItem('selectedCombo');
      localStorage.removeItem('selectedQuantity');
      localStorage.removeItem('selectedTotalPrice');
      
      // Redirect to thank you page with phone as query parameter
      window.location.href = `/thank-you?phone=${encodeURIComponent(data.phone as string)}`;
=======
      setSubmitted(true);
>>>>>>> 45469cf748fc7386c7443e7be51edfecde5ce646
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại hoặc nhắn Zalo.");
    } finally {
      setLoading(false);
    }
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
              <Field label="Địa chỉ" name="province">
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

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Combo sơn" name="combo" hint="VD: Combo sàn, Combo vách, Combo lam">
                <input
                  name="combo"
                  maxLength={100}
                  className="form-input"
                  placeholder="Chọn combo (nếu có)"
                  value={comboValue}
                  onChange={(e) => setComboValue(e.target.value)}
                  autoComplete="off"
                />
              </Field>
              <Field label="Số lượng" name="quantity" hint="VD: 10 thùng, 5 set">
                <input
                  name="quantity"
                  maxLength={20}
                  className="form-input"
                  placeholder="Số lượng ước tính"
                  value={quantityValue}
                  onChange={(e) => setQuantityValue(e.target.value)}
                  autoComplete="off"
                />
              </Field>
              <input type="hidden" name="totalPrice" value={totalPriceValue} />
            </div>

            <Field
              label="Màu đã chọn"
              name="colors"
              error={errors.colors}
              hint="Có thể chọn nhiều màu — bấm thêm vào bảng màu phía trên hoặc gõ tay, cách nhau bằng dấu phẩy."
            >
              <textarea
                id="form-color"
                name="colors"
                maxLength={300}
                rows={2}
                className="form-input resize-y"
                placeholder="VD: Walnut (LPM8.LWF103), Cherry (LPM4.LWF101)"
              />
            </Field>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3.5 text-base font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? "Đang gửi..." : "Đặt hàng ngay"}
                {!loading && <span aria-hidden>→</span>}
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
            <p className="mt-2 text-xs text-[var(--brand)] font-medium">
              Miễn phí vận chuyển cho đơn hàng từ 1.999.000 đ
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
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="mb-1.5 flex items-center gap-1 text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-[var(--brand)]">*</span>}
      </span>
      {children}
      {hint && (
        <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span>
      )}
      {error && (
        <span className="mt-1.5 block text-xs text-destructive">{error}</span>
      )}
    </label>
  );
}
