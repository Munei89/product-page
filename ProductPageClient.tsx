"use client";

import { useEffect, useMemo, useState } from "react";

import {
  CouponField,
  DeliveryChecker,
  Price,
  ProductActions,
  ProductError,
  ProductGallery,
  ProductLoading,
  ProductNotFound,
  ProductTabs,
  QuantitySelector,
  RecentlyViewedList,
  RecommendationGrid,
  StarRating,
  TagList,
} from "./components";
import { api } from "./lib/apiClient";
import { ProductTab, ReviewSort } from "./types";
import {
  useCart,
  useCoupon,
  useDeliveryEstimate,
  useProduct,
  useRecentlyViewed,
  useRecommendations,
  useReviews,
  useWishlist,
} from "./hooks";

export default function ProductPageClient({
  productId,
}: {
  productId: string;
}) {
  // ---- UI-only state -------------------------------------------------------
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [postcode, setPostcode] = useState("");
  const [sortReviewsBy, setSortReviewsBy] = useState<ReviewSort>("newest");
  const [activeTab, setActiveTab] = useState<ProductTab>("description");
  const [cartMessage, setCartMessage] = useState("");

  // ---- Data (all I/O lives in hooks) --------------------------------------
  const { product, loading, error } = useProduct(productId);
  const { reviews, loading: loadingReviews } = useReviews(
    productId,
    sortReviewsBy,
  );
  const { recommendations, loading: loadingRecommendations } =
    useRecommendations(productId, product?.category);
  const { message: deliveryMessage } = useDeliveryEstimate(productId, postcode);
  const recentlyViewed = useRecentlyViewed(product ?? null);
  const { addItem } = useCart();
  const { isWishlisted, toggle, pending: wishlistPending } = useWishlist(
    product?.id,
  );
  const { code, setCode, discount, message: couponMessage, apply } =
    useCoupon();

  // ---- Derived -------------------------------------------------------------
  const finalPrice = useMemo(() => {
    if (!product) return 0;
    const base = product.salePrice ?? product.price;
    return base * (1 - discount);
  }, [product, discount]);

  // Default the gallery to the first image whenever the product changes.
  useEffect(() => {
    if (product?.images?.length) setSelectedImage(product.images[0]);
  }, [product]);

  // Fire a view event once per distinct product (no manual "sent" flag).
  useEffect(() => {
    if (!product) return;
    api
      .post("/analytics/product-view", {
        productId: product.id,
        name: product.name,
        category: product.category,
        viewedAt: new Date().toISOString(),
      })
      .catch(() => {
        /* analytics is best-effort */
      });
  }, [product?.id]);

  function handleAddToCart() {
    if (!product) return;
    addItem({ productId: product.id, quantity, selectedImage });
    setCartMessage(`Added ${quantity} × ${product.name} to your cart`);
  }

  // ---- Page-level states ---------------------------------------------------
  if (loading) return <ProductLoading />;
  if (error) return <ProductError message={error} />;
  if (!product) return <ProductNotFound />;

  const outOfStock = product.stock <= 0;

  return (
    <main style={{ padding: 32 }}>
      <div style={{ display: "flex", gap: 32 }}>
        <ProductGallery
          images={product.images}
          selectedImage={selectedImage}
          onSelect={setSelectedImage}
          alt={product.name}
        />

        {/* Details */}
        <section style={{ width: "50%" }}>
          <p>{product.category}</p>
          <h1>{product.name}</h1>
          <p>SKU: {product.sku}</p>

          <div>
            <StarRating rating={product.rating} />
            <span> ({product.reviewCount} reviews)</span>
          </div>

          <Price
            currency={product.currency}
            price={product.price}
            finalPrice={finalPrice}
          />

          <p>{outOfStock ? "Out of stock" : `${product.stock} in stock`}</p>

          <QuantitySelector quantity={quantity} onChange={setQuantity} />

          <CouponField
            code={code}
            onCodeChange={setCode}
            onApply={apply}
            message={couponMessage}
          />

          <DeliveryChecker
            postcode={postcode}
            onPostcodeChange={setPostcode}
            message={deliveryMessage}
          />

          <ProductActions
            outOfStock={outOfStock}
            onAddToCart={handleAddToCart}
            isWishlisted={isWishlisted}
            wishlistPending={wishlistPending}
            onToggleWishlist={toggle}
            message={cartMessage}
          />

          <TagList tags={product.tags} />
        </section>
      </div>

      <ProductTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        description={product.description}
        reviews={reviews}
        loadingReviews={loadingReviews}
        sortReviewsBy={sortReviewsBy}
        onSortChange={setSortReviewsBy}
      />

      <RecommendationGrid
        recommendations={recommendations}
        loading={loadingRecommendations}
        currency={product.currency}
      />

      <RecentlyViewedList items={recentlyViewed} />
    </main>
  );
}
