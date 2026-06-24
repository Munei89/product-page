export type ProductGalleryProps = {
  images: string[];
  selectedImage: string;
  onSelect: (image: string) => void;
  /** Alt text for the main image (the product name). */
  alt: string;
};
