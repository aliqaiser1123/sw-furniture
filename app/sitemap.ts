import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic: Published products
  const products = await db.product.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic: Categories
  const categories = await db.category.findMany({
    select: { slug: true, createdAt: true },
  });
  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/shop?category=${c.slug}`,
    lastModified: c.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic: Collections
  const collections = await db.collection.findMany({
    select: { slug: true, createdAt: true },
  });
  const collectionPages: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: c.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic: Published blog posts
  const blogPosts = await db.blogPost.findMany({
    where: { published: true },
    select: { slug: true, publishedAt: true },
  });
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.publishedAt ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic: Published static pages
  const staticCustomPages = await db.staticPage.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const customPages: MetadataRoute.Sitemap = staticCustomPages.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...categoryPages,
    ...collectionPages,
    ...blogPages,
    ...customPages,
  ];
}
