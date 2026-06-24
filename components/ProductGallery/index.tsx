import styles from "./styles.module.css";
import { ProductGalleryProps } from "./types";

/**
 * The product's image gallery: one large hero image with a strip of thumbnails
 * beneath it. Clicking a thumbnail swaps the hero image — the parent owns which
 * one is selected, so this component stays purely presentational. The thumbnail
 * row hides itself entirely when there's only the hero image (or none) to show.
 */
export function ProductGallery({
  images,
  selectedImage,
  onSelect,
  alt,
}: ProductGalleryProps) {
  return (
    <section className={styles.gallery}>
      <img src={selectedImage} alt={alt} width={600} height={600} />

      {images.length > 0 && (
        <div className={styles.thumbs}>
          {images.map((image) => (
            <button
              key={image}
              type="button"
              aria-label="View image"
              aria-pressed={image === selectedImage}
              onClick={() => onSelect(image)}
              className={styles.thumb}
            >
              <img src={image} alt="" width={80} height={80} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
