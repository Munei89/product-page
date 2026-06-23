type TagListProps = {
  tags: string[];
};

/**
 * Shows the product's tags as a simple row of hashtag-style labels — the kind
 * of "#waterproof #lightweight" descriptors you'd skim to get a feel for an
 * item at a glance.
 */
export function TagList({ tags }: TagListProps) {
  return (
    <div style={{ marginTop: 24 }}>
      <p>Tags:</p>
      {tags.map((tag) => (
        <span key={tag} style={{ marginRight: 8 }}>
          #{tag}
        </span>
      ))}
    </div>
  );
}
