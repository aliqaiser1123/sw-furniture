import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, type ProductCardData } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";

const BEST_SELLERS: ProductCardData[] = [
  { id: "1", slug: "sheesham-king-bed", name: "Sheesham King Bed with Storage", price: 1200, salePrice: 950, rating: 4.8, reviewCount: 124, isBestSeller: true },
  { id: "2", slug: "royal-dining-set", name: "Royal 6-Seater Dining Set", price: 1800, salePrice: 1450, rating: 4.9, reviewCount: 87, isBestSeller: true },
  { id: "3", slug: "executive-office-desk", name: "Executive Office Desk with Drawers", price: 850, rating: 4.7, reviewCount: 56, isBestSeller: true },
  { id: "4", slug: "coffee-table-oval", name: "Oval Coffee Table — Natural Finish", price: 420, salePrice: 349, rating: 4.6, reviewCount: 203 },
  { id: "5", slug: "wardrobe-4-door", name: "4-Door Sheesham Wardrobe", price: 1100, rating: 4.8, reviewCount: 91, isBestSeller: true },
  { id: "6", slug: "tv-unit-modern", name: "Modern TV Unit with Shelves", price: 560, salePrice: 449, rating: 4.5, reviewCount: 178 },
  { id: "7", slug: "sofa-3-seater", name: "3-Seater Wooden Frame Sofa", price: 980, salePrice: 799, rating: 4.7, reviewCount: 64 },
  { id: "8", slug: "bookshelf-5-tier", name: "5-Tier Open Bookshelf", price: 320, rating: 4.4, reviewCount: 145 },
];

interface ProductGridSectionProps {
  title: string;
  label: string;
  subtitle: string;
  products: ProductCardData[];
  viewAllHref: string;
  bgClass?: string;
}

export function ProductGridSection({
  title,
  label,
  subtitle,
  products,
  viewAllHref,
  bgClass = "",
}: ProductGridSectionProps) {
  return (
    <section className={`section-padding ${bgClass}`} aria-labelledby={`section-${label}`}>
      <div className="container-default">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            label={label}
            title={title}
            subtitle={subtitle}
            align="left"
          />
          <Button
            asChild
            variant="outline"
            className="shrink-0 border-border/60 hover:border-primary/40 hover:bg-primary/5"
          >
            <Link href={viewAllHref}>
              View All
              <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function BestSellers() {
  return (
    <ProductGridSection
      label="Best Sellers"
      title="Our Most Loved Pieces"
      subtitle="Trusted by thousands of happy customers — these are the pieces that speak for themselves."
      products={BEST_SELLERS}
      viewAllHref="/shop?sort=best-sellers"
    />
  );
}
