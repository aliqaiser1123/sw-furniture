/**
 * Shared Prisma type definitions — kept in sync with prisma/schema.prisma
 * Import these whenever you use Prisma query results to ensure type safety.
 */

import type { Prisma } from "@prisma/client";

// ─── Enums ─────────────────────────────────────────────────────────────────

export type Role = "CUSTOMER" | "ADMIN" | "STAFF";
export type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type CouponType = "PERCENTAGE" | "FIXED";

// ─── User ──────────────────────────────────────────────────────────────────

export type UserRow = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  phone: string | null;
  role: Role;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSummary = Pick<UserRow, "id" | "name" | "email" | "createdAt">;

// ─── Product ───────────────────────────────────────────────────────────────

export type ProductRow = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  price: number;
  salePrice: number | null;
  costPrice: number | null;
  stock: number;
  lowStockLimit: number;
  categoryId: string | null;
  collectionId: string | null;
  material: string | null;
  woodType: string | null;
  finish: string | null;
  color: string | null;
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
  deliveryDays: number | null;
  warranty: string | null;
  featured: boolean;
  published: boolean;
  status: ProductStatus;
  seoTitle: string | null;
  metaDescription: string | null;
  focusKeyword: string | null;
  featuredImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductSummary = Pick<ProductRow, "id" | "name" | "sku" | "stock" | "price" | "status" | "featuredImage">;

// ─── Order ─────────────────────────────────────────────────────────────────

export type OrderRow = {
  id: string;
  orderNumber: string;
  userId: string | null;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  addressId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderSummary = Pick<OrderRow, "id" | "orderNumber" | "total" | "orderStatus" | "paymentStatus" | "createdAt">;

export type OrderWithUser = OrderRow & {
  user: { name: string } | null;
};

// ─── GroupBy result type for Order ─────────────────────────────────────────
// Prisma's groupBy returns userId as string | null because it's nullable in schema

export type OrderGroupByResult = {
  userId: string | null;
  _count: { id: number };
  _sum: { total: number | null };
};

// ─── Category ──────────────────────────────────────────────────────────────

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  parentCategoryId: string | null;
  seoTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
};

// ─── Review ────────────────────────────────────────────────────────────────

export type ReviewRow = {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  review: string | null;
  approved: boolean;
  createdAt: Date;
};

// ─── Contact Message ───────────────────────────────────────────────────────

export type ContactMessageRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  replied: boolean;
  createdAt: Date;
};

// ─── Chart helpers ─────────────────────────────────────────────────────────

export type ChartDataPoint = {
  label: string;
  value: number;
  secondaryValue?: number;
};
