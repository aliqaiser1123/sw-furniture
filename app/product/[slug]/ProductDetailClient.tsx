"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Heart, Share2, Star, Box, Images as ImagesIcon,
  ChevronLeft, ChevronRight, Check, Truck, Shield, RotateCcw
} from "lucide-react";
import { Product3DViewer } from "@/components/product/Product3DViewer";

type ViewMode = "images" | "model3d";

interface ProductDetailClientProps {
  product: any;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("images");
  const [quantity, setQuantity] = useState(1);

  const images: string[] = [
    ...(product.featuredImage ? [product.featuredImage] : []),
    ...(product.images?.map((img: any) => img.imageUrl) || []),
  ].filter(Boolean);

  const model3dUrl: string | null = product.models?.[0]?.modelUrl || null;

  const avgRating = product.reviews?.length
    ? (product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F5EFE7] border-b border-[#D9CABA]/50 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-[#7C5C45]">
          <Link href="/" className="hover:text-[#3E2410] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#3E2410] transition-colors">Shop</Link>
          {product.category && <>
            <span>/</span>
            <Link href={`/shop?category=${product.category.slug}`} className="hover:text-[#3E2410] transition-colors">
              {product.category.name}
            </Link>
          </>}
          <span>/</span>
          <span className="text-[#2C1A0E] font-semibold truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ── LEFT: Media Column ── */}
          <div className="space-y-4">
            {/* View Mode Toggle — only show if 3D model exists */}
            {model3dUrl && (
              <div className="flex items-center gap-2 p-1 bg-[#F5EFE7] rounded-full w-fit border border-[#D9CABA]">
                <button
                  onClick={() => setViewMode("images")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${viewMode === "images" ? "bg-[#3E2410] text-white shadow-md" : "text-[#7C5C45] hover:text-[#3E2410]"}`}
                >
                  <ImagesIcon size={15} /> Photos
                </button>
                <button
                  onClick={() => setViewMode("model3d")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${viewMode === "model3d" ? "bg-[#3E2410] text-white shadow-md" : "text-[#7C5C45] hover:text-[#3E2410]"}`}
                >
                  <Box size={15} /> 3D View
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {viewMode === "images" ? (
                <motion.div
                  key="images"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Main Image */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5EFE7] border border-[#D9CABA]/50">
                    {images[selectedImage] ? (
                      <Image
                        src={images[selectedImage]}
                        alt={product.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#7C5C45]">
                        No Image Available
                      </div>
                    )}
                    {/* Nav arrows */}
                    {images.length > 1 && (
                      <>
                        <button onClick={() => setSelectedImage(i => Math.max(0, i - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#3E2410] shadow-md hover:bg-white transition-colors">
                          <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => setSelectedImage(i => Math.min(images.length - 1, i + 1))} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#3E2410] shadow-md hover:bg-white transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>
                  {/* Thumbnail strip */}
                  {images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${i === selectedImage ? "border-[#3E2410] scale-105" : "border-transparent hover:border-[#D9CABA]"}`}
                        >
                          <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="model3d"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Product3DViewer
                    modelUrl={model3dUrl!}
                    productName={product.name}
                    posterUrl={images[0]}
                  />
                  <p className="text-xs text-center text-[#7C5C45] mt-3">
                    Drag to rotate · Pinch to zoom · Double-tap to reset
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Product Info Column ── */}
          <div className="space-y-8">
            {/* Category */}
            {product.category && (
              <span className="text-xs font-bold tracking-widest text-[#C08040] uppercase">{product.category.name}</span>
            )}

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2C1A0E] leading-tight mb-4">{product.name}</h1>

              {/* Rating */}
              {avgRating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={i < Math.round(Number(avgRating)) ? "fill-[#C08040] text-[#C08040]" : "text-[#D9CABA]"} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#3E2410]">{avgRating}</span>
                  <span className="text-sm text-[#7C5C45]">({product.reviews.length} reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-[#2C1A0E]">
                  Rs. {(product.salePrice || product.price).toLocaleString()}
                </span>
                {product.salePrice && (
                  <span className="text-xl text-[#7C5C45] line-through">
                    Rs. {product.price.toLocaleString()}
                  </span>
                )}
                {product.salePrice && (
                  <span className="text-sm font-bold bg-[#3E2410] text-white px-3 py-1 rounded-full">
                    {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <p className="text-[#7C5C45] leading-relaxed">{product.shortDescription}</p>
            )}

            {/* Attributes */}
            <div className="grid grid-cols-2 gap-4">
              {product.material && (
                <div className="p-4 rounded-xl bg-[#F5EFE7] border border-[#D9CABA]/50">
                  <div className="text-[10px] font-bold tracking-widest text-[#7C5C45] uppercase mb-1">Material</div>
                  <div className="font-semibold text-[#2C1A0E] text-sm">{product.material}</div>
                </div>
              )}
              {product.finish && (
                <div className="p-4 rounded-xl bg-[#F5EFE7] border border-[#D9CABA]/50">
                  <div className="text-[10px] font-bold tracking-widest text-[#7C5C45] uppercase mb-1">Finish</div>
                  <div className="font-semibold text-[#2C1A0E] text-sm">{product.finish}</div>
                </div>
              )}
              {product.woodType && (
                <div className="p-4 rounded-xl bg-[#F5EFE7] border border-[#D9CABA]/50">
                  <div className="text-[10px] font-bold tracking-widest text-[#7C5C45] uppercase mb-1">Wood</div>
                  <div className="font-semibold text-[#2C1A0E] text-sm">{product.woodType}</div>
                </div>
              )}
              {product.stock != null && (
                <div className="p-4 rounded-xl bg-[#F5EFE7] border border-[#D9CABA]/50">
                  <div className="text-[10px] font-bold tracking-widest text-[#7C5C45] uppercase mb-1">In Stock</div>
                  <div className={`font-semibold text-sm ${product.stock > 0 ? "text-green-700" : "text-red-600"}`}>
                    {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}
                  </div>
                </div>
              )}
            </div>

            {/* 3D Model Badge */}
            {model3dUrl && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#3E2410]/5 border border-[#3E2410]/20">
                <Box className="w-6 h-6 text-[#3E2410]" />
                <div>
                  <p className="text-sm font-bold text-[#2C1A0E]">Interactive 3D Model Available</p>
                  <p className="text-xs text-[#7C5C45]">View this product in 3D or try it in your room with AR</p>
                </div>
                <button
                  onClick={() => setViewMode("model3d")}
                  className="ml-auto text-xs font-bold text-[#3E2410] underline underline-offset-2"
                >
                  View 3D
                </button>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-[#D9CABA] rounded-full overflow-hidden">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center text-[#3E2410] hover:bg-[#F5EFE7] transition-colors font-bold text-lg">−</button>
                  <span className="w-12 text-center font-bold text-[#2C1A0E]">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-11 h-11 flex items-center justify-center text-[#3E2410] hover:bg-[#F5EFE7] transition-colors font-bold text-lg">+</button>
                </div>
                <button className="flex-1 bg-[#3E2410] text-white font-bold tracking-wide py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#2D1B13] transition-colors shadow-lg hover:shadow-xl">
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-[#D9CABA] flex items-center justify-center text-[#7C5C45] hover:border-[#3E2410] hover:text-[#3E2410] transition-colors">
                  <Heart size={18} />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-[#D9CABA] flex items-center justify-center text-[#7C5C45] hover:border-[#3E2410] hover:text-[#3E2410] transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D9CABA]/50">
              {[
                { icon: Truck, label: "Free Delivery", sub: "Nationwide" },
                { icon: Shield, label: "5 Year Warranty", sub: "Guaranteed" },
                { icon: RotateCcw, label: "Easy Returns", sub: "Within 30 Days" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <Icon className="w-6 h-6 text-[#C08040]" />
                  <div>
                    <div className="text-xs font-bold text-[#2C1A0E]">{label}</div>
                    <div className="text-[10px] text-[#7C5C45]">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Reviews Section ── */}
        {product.reviews?.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#D9CABA]/50">
            <h2 className="text-2xl font-bold text-[#2C1A0E] mb-10">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.reviews.map((review: any) => (
                <div key={review.id} className="bg-[#F5EFE7] rounded-2xl p-6 border border-[#D9CABA]/50">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-[#C08040] text-[#C08040]" />
                    ))}
                  </div>
                  <p className="text-[#2C1A0E] text-sm leading-relaxed mb-4">"{review.comment}"</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-[#3E2410] flex items-center justify-center text-white text-xs font-bold">
                      {review.user?.name?.[0] || "A"}
                    </div>
                    <span className="text-sm font-semibold text-[#2C1A0E]">{review.user?.name || "Anonymous"}</span>
                    <Check size={14} className="text-green-600 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
