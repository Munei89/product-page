const BASE_URL = "/api";

/** Thrown for any non-2xx response so callers can branch on status/message. */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

/**
 * Single place that talks to the backend.
 *
 * Auth: we rely on the session cookie the server sets at login
 * (`credentials: "include"`). Secrets/tokens are NEVER embedded here —
 * shipping an admin token to the browser exposes it to every visitor.
 */
async function request<T>(
  path: string,
  { body, headers, ...init }: RequestOptions = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers
    .get("content-type")
    ?.includes("application/json");
  const payload = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const message =
      (payload && typeof payload.message === "string" && payload.message) ||
      `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }

  return payload as T;
}

export const api = {
  get: <T>(path: string, signal?: AbortSignal) =>
    request<T>(path, { method: "GET", signal }),
  post: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
    request<T>(path, { method: "POST", body, signal }),
  delete: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
    request<T>(path, { method: "DELETE", body, signal }),
};

/** Encode a query object into a `?a=b&c=d` string, dropping empty values. */
export function buildQuery(params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}
