import { Recommendation } from "../../types";

export type RecommendationGridProps = {
  recommendations: Recommendation[];
  loading: boolean;
  currency: string;
};
