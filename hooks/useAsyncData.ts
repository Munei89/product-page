"use client";

import { useEffect, useState } from "react";
import { ApiError, api } from "../lib/apiClient";

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

/**
 * Generic GET-and-track-state hook shared by every data hook.
 *
 * - Pass `path = null` to skip the request (e.g. waiting on a dependency).
 * - Aborts the in-flight request when `path` changes or the component
 *   unmounts, preventing race conditions and "setState after unmount".
 */
export function useAsyncData<T>(path: string | null): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: Boolean(path),
    error: null,
  });

  useEffect(() => {
    if (!path) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const controller = new AbortController();
    setState((prev) => ({ ...prev, loading: true, error: null }));

    api
      .get<T>(path, controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const message =
          err instanceof ApiError ? err.message : "Something went wrong";
        setState({ data: null, loading: false, error: message });
      });

    return () => controller.abort();
  }, [path]);

  return state;
}
