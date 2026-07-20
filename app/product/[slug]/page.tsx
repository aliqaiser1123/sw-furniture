import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await db.product.findUnique({ where: { slug: params.slug } });
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Shesham Wood Furniture`,
    description: product.shortDescription || product.description || `Buy ${product.name} handcrafted from premium Sheesham wood.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { slug: params.slug, status: "PUBLISHED" },
    include: {
      category: true,
      images: { orderBy: { displayOrder: "asc" } },
      models: true,
      reviews: { include: { user: { select: { name: true } } }, take: 10 },
      tags: { include: { tag: true } },
    },
  });

  if (!product) notFound();

  return <ProductDetailClient product={product as any} />;
}
