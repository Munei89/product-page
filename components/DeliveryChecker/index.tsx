import styles from "./styles.module.css";
import { DeliveryCheckerProps } from "./types";

/**
 * Lets the shopper check how soon the product can reach them by entering a
 * postcode. The estimate itself is worked out upstream (debounced as they type),
 * so all this component does is collect the postcode and show whatever message
 * comes back — "Checking delivery…", an ETA, or an error — in a live region.
 */
export function DeliveryChecker({
  postcode,
  onPostcodeChange,
  message,
}: DeliveryCheckerProps) {
  return (
    <div className={styles.field}>
      <label htmlFor="postcode">Check delivery</label>
      <input
        id="postcode"
        value={postcode}
        onChange={(event) => onPostcodeChange(event.target.value)}
        placeholder="Postcode"
        inputMode="text"
        autoComplete="postal-code"
      />
      <p role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
