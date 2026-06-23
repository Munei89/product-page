import { Review, ReviewSort } from "../types";
import { StarRating } from "./StarRating";

type ReviewListProps = {
  reviews: Review[];
  loading: boolean;
  sortBy: ReviewSort;
  onSortChange: (sort: ReviewSort) => void;
};

/**
 * The body of the reviews tab: a sort dropdown followed by the reviews
 * themselves. Re-sorting is handled upstream (it triggers a fresh fetch), so
 * this component just reflects whatever it's handed and covers the two states
 * that aren't a populated list — "Loading reviews…" while a fetch is in flight,
 * and "No reviews yet." once we know there genuinely aren't any.
 */
export function ReviewList({
  reviews,
  loading,
  sortBy,
  onSortChange,
}: ReviewListProps) {
  return (
    <>
      <label htmlFor="sort-reviews">Sort by</label>
      <select
        id="sort-reviews"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value as ReviewSort)}
      >
        <option value="newest">Newest</option>
        <option value="highest">Highest rated</option>
        <option value="lowest">Lowest rated</option>
      </select>

      {loading && <p>Loading reviews…</p>}

      {!loading && reviews.length === 0 && <p>No reviews yet.</p>}

      {!loading &&
        reviews.map((review) => (
          <article key={review.id} style={{ borderTop: "1px solid #ddd" }}>
            <h3>{review.author}</h3>
            <StarRating rating={review.rating} />
            <p>{review.body}</p>
            <small>{review.createdAt}</small>
          </article>
        ))}
    </>
  );
}
