"use client";

import { useCallback, useMemo } from "react";
import { CartItem } from "../types";
import { useLocalStorage } from "./useLocalStorage";

/**
 * The shopping cart, kept in localStorage so it's still there when the shopper
 * comes back later. Adding a product they already have doesn't create a
 * duplicate line — it just bumps the quantity on the existing one.
 */
export function useCart() {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);

  const addItem = useCallback(
    (item: CartItem) => {
      setCart((prev) => {
        // First time we've seen this product? Append it as a new line.
        const existing = prev.find((i) => i.productId === item.productId);
        if (!existing) return [...prev, item];

        // Otherwise fold the new quantity into the line that's already there.
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      });
    },
    [setCart],
  );

  // The number shown on the cart badge — every line's quantity added together,
  // not just the count of distinct products.
  const itemCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart],
  );

  return { cart, addItem, itemCount };
}
