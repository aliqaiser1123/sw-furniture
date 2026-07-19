import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { AboutBrand } from "@/components/home/AboutBrand";
import { Newsletter } from "@/components/home/Newsletter";
import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Shesham Wood Furniture | Premium Handcrafted Wood Furniture",
  description:
    "Discover Pakistan's finest Sheesham wood furniture. Handcrafted beds, dining sets, wardrobes, and more — delivered nationwide with a 5-year warranty.",
  openGraph: {
    title: "Shesham Wood Furniture | Premium Handcrafted Wood Furniture",
    description:
      "Discover Pakistan's finest Sheesham wood furniture. Handcrafted beds, dining sets, wardrobes, and more — delivered nationwide with a 5-year warranty.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shesham Wood Furniture",
    description: "Premium handcrafted Sheesham wood furniture for modern homes.",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

// JSON-LD WebSite schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/shop?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function HomePage() {
  const featuredProducts = await db.product.findMany({
    where: { featured: true, status: "PUBLISHED" },
    take: 8,
    include: { category: true }
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HeroSection products={featuredProducts.slice(0, 3)} />
      <FeaturedCategories />
      <FeaturedProducts products={featuredProducts} />
      <WhyChooseUs />
      <Testimonials />
      <AboutBrand />
      <Newsletter />
    </>
  );
}
