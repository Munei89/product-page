import { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  busy?: boolean;
};

/**
 * Shared frame for the page's "nothing to show yet" screens. Each status below
 * renders inside the same padded <main> the real page uses, so when the product
 * finishes loading the content doesn't visibly jump or reflow. `busy` sets
 * aria-busy for the loading case so assistive tech knows to wait.
 */
function PageShell({ children, busy }: PageShellProps) {
  return (
    <main style={{ padding: 32 }} aria-busy={busy || undefined}>
      {children}
    </main>
  );
}

/** The holding screen shown while we're still fetching the product. */
export function ProductLoading() {
  return (
    <PageShell busy>
      <p>Loading product…</p>
    </PageShell>
  );
}

type ProductErrorProps = {
  message: string;
  onReload?: () => void;
};

/**
 * Shown when the product request fails outright. We surface the error message we
 * got and offer a one-tap retry. `onReload` defaults to a full page reload — the
 * bluntest reliable reset — but callers can pass something gentler (like
 * re-running the query) and tests can pass a spy instead of reloading for real.
 */
export function ProductError({
  message,
  onReload = () => window.location.reload(),
}: ProductErrorProps) {
  return (
    <PageShell>
      <h1>Something went wrong</h1>
      <p role="alert">{message}</p>
      <button type="button" onClick={onReload}>
        Reload page
      </button>
    </PageShell>
  );
}

/**
 * Shown when the request succeeded but there's simply no product behind that id
 * — a dead link or a since-removed item, rather than an actual failure.
 */
export function ProductNotFound() {
  return (
    <PageShell>
      <p>No product found.</p>
    </PageShell>
  );
}
