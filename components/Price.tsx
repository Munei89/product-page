type PriceProps = {
  currency: string;
  /** Original list price. */
  price: number;
  /** Price actually charged (sale and/or coupon applied). */
  finalPrice: number;
};

/** Shows the final price, striking through the original when discounted. */
export function Price({ currency, price, finalPrice }: PriceProps) {
  const discounted = finalPrice < price;

  return (
    <div style={{ marginTop: 24 }}>
      {discounted && (
        <p style={{ textDecoration: "line-through", color: "#666" }}>
          {currency} {price.toFixed(2)}
        </p>
      )}
      <p style={{ fontSize: 28, margin: 0 }}>
        {currency} {finalPrice.toFixed(2)}
      </p>
    </div>
  );
}
