"use client";

import { useCallback, useState } from "react";
import { api } from "../lib/apiClient";

/**
 * Adds or removes the product from the wishlist, updating the UI optimistically.
 *
 * The button flips the moment the user taps it, so the interaction feels
 * instant rather than waiting on the network round-trip. If the request ends up
 * failing, we quietly undo that flip so the UI never claims something the server
 * didn't actually save. While a request is in flight, `pending` lets the caller
 * disable the button so a second tap can't race the first.
 */
export function useWishlist(productId: string | undefined) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pending, setPending] = useState(false);

  const toggle = useCallback(async () => {
    // Nothing to do if we don't have a product yet, or if the previous
    // request is still resolving.
    if (!productId || pending) return;

    const next = !isWishlisted;

    // Show the new state right away, before we've heard back from the server.
    setIsWishlisted(next);
    setPending(true);

    try {
      if (next) await api.post("/wishlist", { productId });
      else await api.delete("/wishlist", { productId });
    } catch {
      // The save didn't stick — roll the button back to where it was.
      setIsWishlisted(!next);
    } finally {
      setPending(false);
    }
  }, [productId, isWishlisted, pending]);

  return { isWishlisted, toggle, pending };
}
