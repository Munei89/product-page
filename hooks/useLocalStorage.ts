"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * Drop-in replacement for `useState` that also persists the value to
 * localStorage, so things like the cart or recently-viewed list survive a page
 * refresh.
 *
 * It's written to be safe in two awkward situations. During server-side
 * rendering there's no `window`, so we fall back to the initial value instead of
 * crashing. And because localStorage can throw — private-browsing mode, a full
 * quota, or data that someone else corrupted — every read and write is wrapped
 * so a storage hiccup degrades to "just don't persist" rather than taking the
 * component down with it.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  // Read from storage lazily, on first render only. On the server, or if the
  // stored value is missing or unparseable, start from the caller's default.
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Mirror every change back into storage. If the browser refuses to save (out
  // of quota, blocked, etc.) we let it slide — the in-memory state is still
  // correct, it just won't outlive this session.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Nothing we can usefully do here; persistence is best-effort.
    }
  }, [key, value]);

  return [value, setValue];
}
