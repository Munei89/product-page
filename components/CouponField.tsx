type CouponFieldProps = {
  code: string;
  onCodeChange: (code: string) => void;
  onApply: () => void;
  message: string;
};

/**
 * Lets the shopper type a coupon code and apply it. The `message` line below the
 * input is where the parent reports back what happened — "Coupon applied",
 * "Invalid coupon", and so on — and it's wired up as an aria-live region so
 * screen readers announce that feedback as soon as it appears.
 */
export function CouponField({
  code,
  onCodeChange,
  onApply,
  message,
}: CouponFieldProps) {
  return (
    <div style={{ marginTop: 24 }}>
      <label htmlFor="coupon">Coupon</label>
      <input
        id="coupon"
        value={code}
        onChange={(event) => onCodeChange(event.target.value)}
        placeholder="Enter coupon"
      />
      <button type="button" onClick={onApply}>
        Apply
      </button>
      <p role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
