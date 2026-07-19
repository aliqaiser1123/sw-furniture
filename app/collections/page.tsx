import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CollectionCard } from "@/components/common/CollectionCard";
import { PageBanner } from "@/components/common/PageBanner";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Collections — Premium Furniture Collections",
  description:
    "Explore our curated Sheesham wood furniture collections. From the Royal Collection to Modern Minimal — find your perfect style.",
  openGraph: {
    title: "Furniture Collections | Shesham Wood",
    description: "Curated Sheesham wood furniture collections for every home style.",
    url: `${siteConfig.url}/collections`,
  },
  alternates: { canonical: `${siteConfig.url}/collections` },
};

const collections = [
  {
    slug: "royal",
    name: "Royal Collection",
    description: "Opulent Sheesham pieces inspired by Mughal artistry. Bold carved detailing and rich dark finishes create furniture that commands attention.",
    productCount: 42,
  },
  {
    slug: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean lines, warm tones, and understated elegance. Perfect for contemporary homes that appreciate simplicity and natural beauty.",
    productCount: 31,
  },
  {
    slug: "executive",
    name: "Executive Suite",
    description: "Premium office furniture designed for authority. Heavy desks, solid shelving, and refined chairs that inspire productivity.",
    productCount: 18,
  },
  {
    slug: "signature",
    name: "Signature Series",
    description: "Our limited-edition masterpieces. Each piece in the Signature Series is handcrafted by master artisans and produced in limited quantities.",
    productCount: 12,
  },
  {
    slug: "heritage",
    name: "Heritage Classics",
    description: "Timeless designs passed down through generations of Pakistani craftsmanship. Traditional motifs, enduring quality.",
    productCount: 27,
  },
  {
    slug: "outdoor-living",
    name: "Outdoor Living",
    description: "Weather-treated Sheesham furniture for patios, gardens, and outdoor dining. Elegance that withstands the elements.",
    productCount: 15,
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Furniture Collections | Shesham Wood",
  description: "Curated Sheesham wood furniture collections for every home style.",
  url: `${siteConfig.url}/collections`,
};

export default function CollectionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <PageBanner
        title="Our Collections"
        subtitle="Each collection is a carefully curated world of its own — designed around a specific aesthetic, lifestyle, and story."
        breadcrumbs={[{ label: "Collections" }]}
      />

      <section className="section-padding" aria-labelledby="all-collections-heading">
        <div className="container-default">
          <SectionHeader
            label="Explore All"
            title="Find Your Collection"
            subtitle="From bold royal statements to understated modern minimalism — we have a collection for every vision."
            className="mb-12"
          />

          {/* Featured collection (large) */}
          <div className="mb-6">
            <CollectionCard
              name={collections[0].name}
              description={collections[0].description}
              href={`/collections/${collections[0].slug}`}
              variant="featured"
            />
          </div>

          {/* Collection grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {collections.slice(1).map((col) => (
              <div key={col.slug} className="flex flex-col gap-3">
                <CollectionCard
                  name={col.name}
                  description={col.description}
                  href={`/collections/${col.slug}`}
                />
                <div className="flex items-center justify-between px-1">
                  <span className="text-sm text-muted-foreground">{col.productCount} products</span>
                  <Link
                    href={`/collections/${col.slug}`}
                    className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors focus-brand rounded"
                  >
                    Explore
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center py-6 border-t border-border/40">
            <p className="text-muted-foreground mb-4">Can&apos;t find what you&apos;re looking for?</p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/shop">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
