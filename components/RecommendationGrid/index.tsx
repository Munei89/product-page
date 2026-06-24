import styles from "./styles.module.css";
import { RecommendationGridProps } from "./types";

/**
 * The "You may also like" section — a four-across grid of related products to
 * keep people browsing. Each card links off to that product's own page. While
 * the recommendations are still loading we show a short notice above the grid
 * rather than blocking the rest of the page on them.
 */
export function RecommendationGrid({
  recommendations,
  loading,
  currency,
}: RecommendationGridProps) {
  return (
    <section className={styles.section}>
      <h2>You may also like</h2>

      {loading && <p>Loading recommendations…</p>}

      <div className={styles.grid}>
        {recommendations.map((item) => (
          <article key={item.id}>
            <img src={item.image} alt={item.name} width={200} height={200} />
            <h3>{item.name}</h3>
            <p>
              {currency} {item.price.toFixed(2)}
            </p>
            <a href={`/products/${item.id}`}>View product</a>
          </article>
        ))}
      </div>
    </section>
  );
}
