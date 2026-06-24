import { ProductTab } from "../../types";
import { ReviewList } from "../ReviewList";
import styles from "./styles.module.css";
import { ProductTabsProps } from "./types";

const TABS: ProductTab[] = ["description", "reviews", "delivery"];

/**
 * The lower half of the page, where the supporting detail lives behind three
 * tabs: the product description, customer reviews, and delivery/returns info.
 * Only the active tab's panel is rendered at a time. The parent owns which tab
 * is open so the choice survives re-renders, and the reviews panel hands its
 * data straight through to ReviewList.
 */
export function ProductTabs({
  activeTab,
  onTabChange,
  description,
  reviews,
  loadingReviews,
  sortReviewsBy,
  onSortChange,
}: ProductTabsProps) {
  return (
    <section className={styles.tabs}>
      <div role="tablist" aria-label="Product information">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => onTabChange(tab)}
            className={styles.tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "description" && (
        <div role="tabpanel">
          <h2>Description</h2>
          <p>{description}</p>
        </div>
      )}

      {activeTab === "reviews" && (
        <div role="tabpanel">
          <h2>Reviews</h2>
          <ReviewList
            reviews={reviews}
            loading={loadingReviews}
            sortBy={sortReviewsBy}
            onSortChange={onSortChange}
          />
        </div>
      )}

      {activeTab === "delivery" && (
        <div role="tabpanel">
          <h2>Delivery and returns</h2>
          <p>
            Delivery estimates are calculated based on stock availability and
            your postcode.
          </p>
        </div>
      )}
    </section>
  );
}
