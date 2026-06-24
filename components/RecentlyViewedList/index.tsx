import styles from "./styles.module.css";
import { RecentlyViewedListProps } from "./types";

/**
 * A small "Recently viewed" list to help shoppers find their way back to
 * something they looked at a moment ago. On a first-ever visit there's no
 * history to show, so the whole section bows out and renders nothing rather
 * than leaving an empty heading stranded on the page.
 */
export function RecentlyViewedList({ items }: RecentlyViewedListProps) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2>Recently viewed</h2>
      {items.map((item) => (
        <article key={item.id}>
          <h3>{item.name}</h3>
          <p>
            {item.currency} {item.price.toFixed(2)}
          </p>
        </article>
      ))}
    </section>
  );
}
