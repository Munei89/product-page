import { Review, ReviewSort } from "../../types";

export type ReviewListProps = {
  reviews: Review[];
  loading: boolean;
  sortBy: ReviewSort;
  onSortChange: (sort: ReviewSort) => void;
};
