import styles from "./styles.module.css";
import { QuantitySelectorProps } from "./types";

/**
 * A number input for choosing how many of the product to buy.
 *
 * Browsers happily let people clear the field or type something nonsensical, so
 * we guard against that here: anything that isn't a valid number — or that dips
 * below `min` — snaps back up to `min` rather than letting the cart end up with
 * a quantity of zero or NaN.
 */
export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
}: QuantitySelectorProps) {
  return (
    <div className={styles.field}>
      <label htmlFor="quantity">Quantity</label>
      <input
        id="quantity"
        type="number"
        min={min}
        value={quantity}
        onChange={(event) => {
          const value = parseInt(event.target.value, 10);
          onChange(Number.isNaN(value) || value < min ? min : value);
        }}
      />
    </div>
  );
}
