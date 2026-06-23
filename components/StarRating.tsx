type StarRatingProps = {
  rating: number;
  max?: number;
};

/** Accessible star rating. Clamps to [0, max] so it never throws on bad data. */
export function StarRating({ rating, max = 5 }: StarRatingProps) {
  const filled = Math.max(0, Math.min(max, Math.round(rating)));

  return (
    <span role="img" aria-label={`${rating} out of ${max} stars`}>
      <span aria-hidden="true">
        {"★".repeat(filled)}
        {"☆".repeat(max - filled)}
      </span>
    </span>
  );
}
