export type CouponFieldProps = {
  code: string;
  onCodeChange: (code: string) => void;
  onApply: () => void;
  message: string;
};
