import { ProductTab, Review, ReviewSort } from "../../types";

export type ProductTabsProps = {
  activeTab: ProductTab;
  onTabChange: (tab: ProductTab) => void;
  description: string;
  reviews: Review[];
  loadingReviews: boolean;
  sortReviewsBy: ReviewSort;
  onSortChange: (sort: ReviewSort) => void;
};
