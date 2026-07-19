/**
 * Data Caching Layer
 * Wraps Prisma queries with Next.js unstable_cache for ISR-compatible caching.
 * Cache invalidation is handled via cache tags matching the data entity.
 */

import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";

// ─────────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────────

export const getFeaturedProducts = unstable_cache(
  async () => {
    return db.product.findMany({
      where: { featured: true, status: "PUBLISHED" },
      take: 8,
      include: { category: { select: { name: true, slug: true } } },
      orderBy: { updatedAt: "desc" },
    });
  },
  ["featured-products"],
  { revalidate: 300, tags: ["products"] } // 5 minutes
);

export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    return db.product.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: {
        category: true,
        collection: true,
        images: { orderBy: { displayOrder: "asc" } },
        tags: { include: { tag: true } },
        reviews: {
          where: { approved: true },
          include: { user: { select: { name: true, image: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  },
  ["product-by-slug"],
  { revalidate: 300, tags: ["products"] }
);

export const getAllPublishedProducts = unstable_cache(
  async (categorySlug?: string) => {
    return db.product.findMany({
      where: {
        status: "PUBLISHED",
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      },
      include: { category: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
    });
  },
  ["all-products"],
  { revalidate: 180, tags: ["products"] } // 3 minutes
);

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────

export const getAllCategories = unstable_cache(
  async () => {
    return db.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, imageUrl: true },
    });
  },
  ["categories"],
  { revalidate: 600, tags: ["categories"] } // 10 minutes
);

// ─────────────────────────────────────────────────────────────
// COLLECTIONS
// ─────────────────────────────────────────────────────────────

export const getAllCollections = unstable_cache(
  async () => {
    return db.collection.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, bannerImage: true, description: true },
    });
  },
  ["collections"],
  { revalidate: 600, tags: ["collections"] } // 10 minutes
);

// ─────────────────────────────────────────────────────────────
// HOMEPAGE
// ─────────────────────────────────────────────────────────────

export const getHomepageSettings = unstable_cache(
  async () => {
    return db.homepageSettings.findUnique({ where: { id: "singleton" } });
  },
  ["homepage-settings"],
  { revalidate: 60, tags: ["homepage"] } // 1 minute
);

export const getActiveBanners = unstable_cache(
  async (position: string) => {
    return db.banner.findMany({
      where: { active: true, position },
      orderBy: { createdAt: "desc" },
    });
  },
  ["banners"],
  { revalidate: 120, tags: ["banners"] } // 2 minutes
);

// ─────────────────────────────────────────────────────────────
// BLOG
// ─────────────────────────────────────────────────────────────

export const getPublishedBlogPosts = unstable_cache(
  async (take = 10) => {
    return db.blogPost.findMany({
      where: { published: true },
      take,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        author: true,
        publishedAt: true,
      },
    });
  },
  ["blog-posts"],
  { revalidate: 300, tags: ["blog"] }
);

// ─────────────────────────────────────────────────────────────
// FAQS
// ─────────────────────────────────────────────────────────────

export const getActiveFAQs = unstable_cache(
  async () => {
    return db.fAQ.findMany({
      where: { active: true },
      include: { category: { select: { name: true } } },
      orderBy: { displayOrder: "asc" },
    });
  },
  ["faqs"],
  { revalidate: 600, tags: ["faqs"] }
);
