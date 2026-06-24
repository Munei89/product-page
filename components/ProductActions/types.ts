export type ProductActionsProps = {
  outOfStock: boolean;
  onAddToCart: () => void;
  isWishlisted: boolean;
  wishlistPending: boolean;
  onToggleWishlist: () => void;
  /** Live confirmation message (e.g. "Added 2 × … to your cart"). */
  message: string;
};
