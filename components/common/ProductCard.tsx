"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/common/StarRating";
import { formatPrice } from "@/lib/helpers";
import { cn } from "@/lib/utils";

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  featuredImage?: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

interface ProductCardProps {
  product: ProductCardData;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const discount =
    product.salePrice
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        "group relative bg-card rounded-xl overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300",
        className
      )}
      aria-label={product.name}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
            <div className="text-center text-muted-foreground/40 p-4">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-muted-foreground/10 flex items-center justify-center">
                <span className="text-2xl">🛋️</span>
              </div>
              <p className="text-xs">Product Image</p>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && (
            <Badge className="bg-destructive text-white text-xs font-semibold px-2 py-0.5 rounded-md">
              -{discount}%
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-md">
              New
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-md">
              Best Seller
            </Badge>
          )}
        </div>

        {/* Action buttons on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            aria-label="Add to wishlist"
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus-brand"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            aria-label="Quick view"
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus-brand"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200 leading-snug line-clamp-2 focus-brand"
          >
            {product.name}
          </Link>
        </div>

        {/* Rating */}
        {product.rating !== undefined && (
          <StarRating
            rating={product.rating}
            size="sm"
            showCount
            count={product.reviewCount}
          />
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2 pt-1">
          <Button asChild variant="outline" size="sm" className="flex-1 text-xs">
            <Link href={`/products/${product.slug}`}>View Details</Link>
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs bg-primary hover:bg-primary/90"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
