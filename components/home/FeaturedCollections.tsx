import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CollectionCard } from "@/components/common/CollectionCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";

const collections = [
  {
    name: "Royal Collection",
    slug: "royal",
    description: "Opulent Sheesham pieces inspired by Mughal artistry — for homes that command attention.",
    featured: true,
  },
  {
    name: "Modern Minimal",
    slug: "modern-minimal",
    description: "Clean lines and warm wood tones for contemporary living.",
    featured: false,
  },
  {
    name: "Executive Suite",
    slug: "executive",
    description: "Premium office furniture that speaks of authority and refinement.",
    featured: false,
  },
  {
    name: "Signature Series",
    slug: "signature",
    description: "Our most iconic, limited-edition handcrafted masterpieces.",
    featured: false,
  },
];

export function FeaturedCollections() {
  return (
    <section className="section-padding bg-secondary/30" aria-labelledby="collections-heading">
      <div className="container-default">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            label="Our Collections"
            title="Curated for Every Home"
            subtitle="Each collection is thoughtfully designed around a unique aesthetic and lifestyle."
            align="left"
          />
          <Button
            asChild
            variant="outline"
            className="shrink-0 border-border/60 hover:border-primary/40"
          >
            <Link href="/collections">
              All Collections
              <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured (large) */}
          <div className="lg:col-span-2">
            <CollectionCard
              name={collections[0].name}
              description={collections[0].description}
              href={`/collections/${collections[0].slug}`}
              variant="featured"
            />
          </div>
          {/* 3 smaller */}
          <div className="grid grid-cols-1 gap-5">
            {collections.slice(1).map((col) => (
              <CollectionCard
                key={col.slug}
                name={col.name}
                description={col.description}
                href={`/collections/${col.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
