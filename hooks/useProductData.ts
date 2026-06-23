"use client";

import { buildQuery } from "../lib/apiClient";
import {
  Product,
  Recommendation,
  Review,
  ReviewSort,
} from "../types";
import { useAsyncData } from "./useAsyncData";
import { useDebounce } from "./useDebounce";

/** Loads a single product. */
export function useProduct(productId: string) {
  const { data, loading, error } = useAsyncData<Product>(
    `/products/${productId}`,
  );
  return { product: data, loading, error };
}

/** Loads reviews, re-fetching when the sort changes. */
export function useReviews(productId: string, sort: ReviewSort) {
  const { data, loading, error } = useAsyncData<Review[]>(
    `/products/${productId}/reviews${buildQuery({ sort })}`,
  );
  return { reviews: data ?? [], loading, error };
}

/** Loads recommendations once the product's category is known. */
export function useRecommendations(productId: string, category?: string) {
  const path = category
    ? `/recommendations${buildQuery({ productId, category })}`
    : null;
  const { data, loading, error } = useAsyncData<Recommendation[]>(path);
  return { recommendations: data ?? [], loading, error };
}

type DeliveryEstimate = { days: number };

/**
 * Debounced delivery lookup keyed on the typed postcode. Returns a
 * ready-to-render status message so the component stays presentational.
 */
export function useDeliveryEstimate(productId: string, postcode: string) {
  const debounced = useDebounce(postcode.trim(), 400);
  const path = debounced
    ? `/delivery/estimate${buildQuery({ postcode: debounced, productId })}`
    : null;

  const { data, loading, error } = useAsyncData<DeliveryEstimate>(path);

  let message = "";
  if (!debounced) message = "";
  else if (loading) message = "Checking delivery…";
  else if (error) message = "Could not check delivery right now";
  else if (data) message = `Delivery available in ${data.days} days`;

  return { message, loading };
}
