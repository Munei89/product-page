"use client";

import { useCallback, useState } from "react";

/** Discount rate (0–1) keyed by coupon code. */
const COUPONS: Record<string, number> = {
  WELCOME10: 0.1,
  SAVE20: 0.2,
};

export function useCoupon() {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");

  const apply = useCallback(() => {
    const normalized = code.trim().toUpperCase();

    if (!normalized) {
      setDiscount(0);
      setMessage("Enter a coupon code");
      return;
    }

    const rate = COUPONS[normalized];
    if (rate === undefined) {
      setDiscount(0);
      setMessage("Invalid coupon");
      return;
    }

    setDiscount(rate);
    setMessage(`Coupon applied — ${Math.round(rate * 100)}% off`);
  }, [code]);

  return { code, setCode, discount, message, apply };
}
