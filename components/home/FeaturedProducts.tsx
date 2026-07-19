"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";

// Placeholder data for 8 premium products
const PRODUCTS = [
  {
    id: 1,
    name: "Royal Sheesham King Bed",
    price: "Rs. 145,000",
    image: "https://picsum.photos/seed/prod1/800/1000",
    category: "Bedroom",
  },
  {
    id: 2,
    name: "Classic Walnut Dining Table",
    price: "Rs. 120,000",
    image: "https://picsum.photos/seed/prod2/800/1000",
    category: "Dining",
  },
  {
    id: 3,
    name: "Minimalist Lounge Chair",
    price: "Rs. 45,000",
    image: "https://picsum.photos/seed/prod3/800/1000",
    category: "Living Room",
  },
  {
    id: 4,
    name: "Executive Writing Desk",
    price: "Rs. 85,000",
    image: "https://picsum.photos/seed/prod4/800/1000",
    category: "Office",
  },
  {
    id: 5,
    name: "Vintage Sideboard",
    price: "Rs. 95,000",
    image: "https://picsum.photos/seed/prod5/800/1000",
    category: "Storage",
  },
  {
    id: 6,
    name: "Luxury Leather Sofa",
    price: "Rs. 210,000",
    image: "https://picsum.photos/seed/prod6/800/1000",
    category: "Living Room",
  },
  {
    id: 7,
    name: "Handcrafted Coffee Table",
    price: "Rs. 35,000",
    image: "https://picsum.photos/seed/prod7/800/1000",
    category: "Living Room",
  },
  {
    id: 8,
    name: "Elegant Nightstand",
    price: "Rs. 25,000",
    image: "https://picsum.photos/seed/prod8/800/1000",
    category: "Bedroom",
  },
];

import { Product } from "@prisma/client";

interface FeaturedProductsProps {
  products: (Product & { category: { name: string, slug: string } | null })[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="section-padding bg-card">
      <div className="container-default">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4 block">Signature Pieces</span>
          <h2 className="text-3xl md:text-5xl font-heading mb-6">Featured Collection</h2>
          <p className="text-muted-foreground font-light text-lg">
            Discover our most coveted designs, handcrafted with precision and built to be passed down through generations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100 mb-5">
                {product.featuredImage ? (
                  <Image
                    src={product.featuredImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center">No Image</div>
                )}
                
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-accent hover:bg-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 shadow-sm">
                  <Heart className="w-4 h-4" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <button className="w-full bg-white/95 backdrop-blur-sm text-foreground py-3.5 rounded-lg font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-2">
                  {product.category?.name || "Uncategorized"}
                </div>
                <Link href={`/product/${product.slug}`} className="block group-hover:text-primary transition-colors">
                  <h3 className="font-heading text-xl mb-2">{product.name}</h3>
                </Link>
                <div className="font-medium text-foreground">
                  {product.salePrice ? (
                    <div className="flex gap-2 items-center">
                      <span>Rs. {product.salePrice.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground line-through">Rs. {product.price.toLocaleString()}</span>
                    </div>
                  ) : (
                    <span>Rs. {product.price.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/shop" className="btn-secondary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
