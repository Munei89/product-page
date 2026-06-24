export type PriceProps = {
  currency: string;
  /** Original list price. */
  price: number;
  /** Price actually charged (sale and/or coupon applied). */
  finalPrice: number;
};
