import styles from "./styles.module.css";
import { PriceProps } from "./types";

/** Shows the final price, striking through the original when discounted. */
export function Price({ currency, price, finalPrice }: PriceProps) {
  const discounted = finalPrice < price;

  return (
    <div className={styles.price}>
      {discounted && (
        <p className={styles.original}>
          {currency} {price.toFixed(2)}
        </p>
      )}
      <p className={styles.final}>
        {currency} {finalPrice.toFixed(2)}
      </p>
    </div>
  );
}
