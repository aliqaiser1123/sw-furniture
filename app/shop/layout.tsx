import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Shop Premium Furniture",
  description:
    "Browse our complete collection of handcrafted Sheesham wood furniture. Filter by category, price, material, and rating to find your perfect piece.",
  openGraph: {
    title: "Shop Premium Furniture | Shesham Wood",
    description: "Handcrafted Sheesham wood furniture for every room.",
    url: `${siteConfig.url}/shop`,
  },
  alternates: { canonical: `${siteConfig.url}/shop` },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
