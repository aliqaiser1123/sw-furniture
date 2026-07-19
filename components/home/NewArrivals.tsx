import { ProductGridSection } from "@/components/home/BestSellers";
import { type ProductCardData } from "@/components/common/ProductCard";

const NEW_ARRIVALS: ProductCardData[] = [
  { id: "n1", slug: "minimal-bedside-table", name: "Minimal Bedside Table — Oak Finish", price: 280, isNew: true, rating: 4.9, reviewCount: 12 },
  { id: "n2", slug: "L-shape-office-desk", name: "L-Shape Corner Office Desk", price: 1150, isNew: true, rating: 4.8, reviewCount: 8 },
  { id: "n3", slug: "outdoor-dining-set", name: "Outdoor Teak Dining Set", price: 2200, salePrice: 1799, isNew: true, rating: 4.7, reviewCount: 19 },
  { id: "n4", slug: "floating-wall-shelf", name: "Floating Wall Shelf — Rustic", price: 160, isNew: true, rating: 4.6, reviewCount: 34 },
];

export function NewArrivals() {
  return (
    <ProductGridSection
      label="New Arrivals"
      title="Fresh From Our Workshop"
      subtitle="The latest additions to our collection — crafted with the same timeless excellence."
      products={NEW_ARRIVALS}
      viewAllHref="/shop?sort=new-arrivals"
      bgClass="bg-secondary/20"
    />
  );
}
