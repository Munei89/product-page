import styles from "./styles.module.css";
import { ProductActionsProps } from "./types";

/**
 * The two primary calls to action sitting side by side: add the product to the
 * cart, and save it to the wishlist. Add-to-cart is disabled when the item is
 * out of stock, and the wishlist button is disabled mid-request so an eager
 * double-tap can't fire two conflicting calls. The `message` underneath is the
 * "Added 2 × … to your cart" style confirmation, announced via a live region.
 */
export function ProductActions({
  outOfStock,
  onAddToCart,
  isWishlisted,
  wishlistPending,
  onToggleWishlist,
  message,
}: ProductActionsProps) {
  return (
    <>
      <div className={styles.actions}>
        <button type="button" disabled={outOfStock} onClick={onAddToCart}>
          {outOfStock ? "Out of stock" : "Add to cart"}
        </button>

        <button
          type="button"
          onClick={onToggleWishlist}
          disabled={wishlistPending}
          aria-pressed={isWishlisted}
        >
          {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        </button>
      </div>
      <p role="status" aria-live="polite">
        {message}
      </p>
    </>
  );
}
