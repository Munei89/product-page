"use client";

import { useEffect } from "react";
import { Product } from "../types";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Tracks the last `max` distinct products viewed. De-dupes by id and uses a
 * functional update so it never depends on its own state — no render loop.
 */
export function useRecentlyViewed(product: Product | null, max = 5) {
  const [items, setItems] = useLocalStorage<Product[]>("recentlyViewed", []);

  useEffect(() => {
    if (!product) return;
    setItems((prev) => {
      const withoutCurrent = prev.filter((p) => p.id !== product.id);
      return [product, ...withoutCurrent].slice(0, max);
    });
  }, [product, max, setItems]);

  return items;
}
