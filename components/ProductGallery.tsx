type ProductGalleryProps = {
  images: string[];
  selectedImage: string;
  onSelect: (image: string) => void;
  /** Alt text for the main image (the product name). */
  alt: string;
};

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
    <section style={{ width: "50%" }}>
      <img src={selectedImage} alt={alt} width={600} height={600} />

      {images.length > 0 && (
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          {images.map((image) => {
            const active = image === selectedImage;
            return (
              <button
                key={image}
                type="button"
                aria-label="View image"
                aria-pressed={active}
                onClick={() => onSelect(image)}
                style={{
                  border: active ? "2px solid black" : "1px solid #ccc",
                  padding: 0,
                }}
              >
                <img src={image} alt="" width={80} height={80} />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
