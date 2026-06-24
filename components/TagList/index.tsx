import styles from "./styles.module.css";
import { TagListProps } from "./types";

/**
 * Shows the product's tags as a simple row of hashtag-style labels — the kind
 * of "#waterproof #lightweight" descriptors you'd skim to get a feel for an
 * item at a glance.
 */
export function TagList({ tags }: TagListProps) {
  return (
    <div className={styles.tags}>
      <p>Tags:</p>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          #{tag}
        </span>
      ))}
    </div>
  );
}
