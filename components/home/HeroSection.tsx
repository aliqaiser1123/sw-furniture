"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  GitCompareArrows,
  Images,
  Home,
  Search,
  LayoutGrid,
  Library,
  ShoppingCart,
  Menu,
  X
} from "lucide-react";

interface HeroSectionProps {
  products?: any[];
}

const FALLBACK_PRODUCTS = [
  {
    id: "f1",
    name: "Royal Heritage Bed",
    description: "Masterfully crafted from solid Sheesham wood. Timeless elegance for the modern bedroom.",
    price: 129000,
    salePrice: null,
    material: "Solid Sheesham Wood",
    finish: "Walnut",
    woodType: "Sheesham",
    stock: 12,
    featuredImage: "https://picsum.photos/seed/royal-bed/1200/700",
    images: [],
    slug: "royal-heritage-bed",
  },
  {
    id: "f2",
    name: "Classic Dining Table",
    description: "A dining experience elevated by pure Sheesham craftsmanship. 6-seater premium build.",
    price: 89000,
    salePrice: 79000,
    material: "Solid Sheesham Wood",
    finish: "Natural",
    woodType: "Sheesham",
    stock: 8,
    featuredImage: "https://picsum.photos/seed/dining-table/1200/700",
    images: [],
    slug: "classic-dining-table",
  },
];

function getProductImage(product: any): string {
  if (product.featuredImage) return product.featuredImage;
  if (product.images?.length > 0) {
    return typeof product.images[0] === "string"
      ? product.images[0]
      : product.images[0]?.imageUrl || "";
  }
  return "https://picsum.photos/seed/furniture/1200/700";
}

function formatPrice(price: number): string {
  return `RS ${price.toLocaleString("en-PK")}`;
}

const LEFT_NAV = [
  { icon: Home, label: "HOME", href: "/" },
  { icon: Search, label: "SEARCH", href: "/search" },
  { icon: LayoutGrid, label: "TYPES", href: "/collections" },
  { icon: Library, label: "COLLECTION", href: "/shop" },
];

const RIGHT_ACTIONS = [
  { icon: Images, label: "PICTURES" },
  { icon: Heart, label: "WISHLIST" },
  { icon: GitCompareArrows, label: "COMPARE" },
  { icon: Share2, label: "SHARE" },
];

export function HeroSection({ products = [] }: HeroSectionProps) {
  const items = products.length > 0 ? products : FALLBACK_PRODUCTS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const current = items[currentIndex] as any;
  const total = items.length;

  const prev = () => setCurrentIndex((i) => (i - 1 + total) % total);
  const next = () => setCurrentIndex((i) => (i + 1) % total);

  const tags = [
    current.material && `MATERIAL: ${current.material}`,
    current.finish && `FINISH: ${current.finish}`,
    current.woodType && `WOOD: ${current.woodType}`,
    current.stock != null && `STOCK: ${current.stock} PCS`,
  ].filter(Boolean);

  return (
    <section className="relative w-full bg-white" style={{ height: "calc(100vh - 0px)", minHeight: 600 }}>
      {/* ── GIANT WATERMARK TEXT ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        aria-hidden
      >
        <span
          className="font-black tracking-tighter text-[20vw] leading-none"
          style={{ color: "rgba(62,36,16,0.035)", fontFamily: "var(--font-geist-sans)" }}
        >
          SHEESHAM
        </span>
      </div>

      {/* ── LEFT SIDEBAR ── */}
      <nav className="hidden lg:flex absolute left-0 top-0 bottom-0 w-20 flex-col items-center justify-center gap-8 z-20 border-r border-[#D9CABA]/50 bg-white/80 backdrop-blur-sm">
        {LEFT_NAV.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-1 group"
          >
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-[#7C5C45] group-hover:bg-[#3E2410] group-hover:text-white transition-all duration-200">
              <Icon size={20} />
            </span>
            <span className="text-[9px] font-bold tracking-widest text-[#7C5C45] group-hover:text-[#3E2410] transition-colors mt-1">
              {label}
            </span>
          </Link>
        ))}
      </nav>

      {/* ── RIGHT SIDEBAR ── */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-20 flex-col items-center justify-center gap-8 z-20 border-l border-[#D9CABA]/50 bg-white/80 backdrop-blur-sm">
        {RIGHT_ACTIONS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-1 group"
          >
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-[#7C5C45] group-hover:bg-[#3E2410] group-hover:text-white transition-all duration-200">
              <Icon size={20} />
            </span>
            <span className="text-[9px] font-bold tracking-widest text-[#7C5C45] group-hover:text-[#3E2410] transition-colors mt-1">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* ── MAIN CONTENT AREA (between sidebars) ── */}
      <div className="absolute inset-x-0 lg:inset-x-20 top-0 bottom-0 flex flex-col z-10">

        {/* ── TOP NAV BAR (Fixed to top of hero) ── */}
        <div className="w-full flex items-center justify-between px-4 md:px-10 py-4 md:py-6 border-b border-[#D9CABA]/30">

          {/* Mobile Menu (visible on small screens) */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="text-[#3E2410]"><Menu size={24} /></button>
          </div>

          {/* Left Aligned Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3">
             <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-[#3E2410]">
               <Image src="/logo.png" alt="Shesham Wood Logo" fill className="object-cover" />
             </div>
             <span className="font-heading font-bold text-xl tracking-wide text-[#3E2410] uppercase hidden sm:block">
               Shesham Wood Furniture
             </span>
          </Link>

          {/* Top Right Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest text-[#7C5C45] ml-auto">
            <Link href="/account/wishlist" className="hover:text-[#3E2410] transition-colors">WISHLIST</Link>
            <span className="text-[#D9CABA]">|</span>
            <Link href="/cart" className="hover:text-[#3E2410] transition-colors flex items-center gap-2">
              <ShoppingCart size={16} />
              CART
            </Link>
            <span className="text-[#D9CABA]">|</span>
            <Link href="/login" className="hover:text-[#3E2410] transition-colors">LOGIN</Link>
            <span className="text-[#D9CABA]">|</span>
            <Link href="/register" className="hover:text-[#3E2410] transition-colors">REGISTER</Link>
            {/* Accent circle button */}
            <span className="w-10 h-10 rounded-full bg-[#C08040] flex items-center justify-center ml-2 cursor-pointer hover:bg-[#3E2410] transition-colors shadow-md">
              <span className="w-3 h-3 rounded-full bg-white" />
            </span>
          </div>
        </div>

        {/* ── PRODUCT TITLE & EXPLORE SECTION ── */}
        <div className="flex flex-col items-start px-6 md:px-10 mt-6 md:mt-10">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`name-${currentIndex}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight leading-none mb-4"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {current.name}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`tags-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              {tags.map((tag) => (
                <span
                  key={tag as string}
                  className="text-[11px] font-bold tracking-widest text-[#7C5C45] border-2 border-[#D9CABA] bg-white rounded-sm px-3 py-1.5 uppercase"
                >
                  {tag as string}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href={`/product/${current.slug || ""}`}
              className="inline-flex items-center gap-2 border-2 border-[#3E2410] text-[#3E2410] rounded-full px-8 py-3 text-sm font-bold tracking-widest hover:bg-[#3E2410] hover:text-white transition-all duration-300"
            >
              EXPLORE PRODUCT
            </Link>

            <AnimatePresence mode="wait">
              <motion.div
                key={`price-${currentIndex}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="flex items-baseline gap-4"
              >
                <span className="text-2xl font-bold text-[#2C1A0E] tracking-tight">
                  {formatPrice(current.salePrice || current.price)}
                </span>
                {current.salePrice && (
                  <span className="text-lg text-[#7C5C45] line-through">
                    {formatPrice(current.price)}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── CENTRAL PRODUCT IMAGE ── */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -80, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-5xl"
              style={{ height: "clamp(300px, 50vh, 600px)" }}
            >
              <Image
                src={getProductImage(current)}
                alt={current.name}
                fill
                priority
                className="object-contain drop-shadow-[0_25px_50px_rgba(62,36,16,0.25)]"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── BOTTOM NAVIGATION: arrows + pagination dots ── */}
        <div className="flex items-center justify-center gap-4 md:gap-8 pb-6 md:pb-10 mt-auto px-4">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border-2 border-[#D9CABA] flex items-center justify-center text-[#7C5C45] hover:border-[#3E2410] hover:text-[#3E2410] hover:bg-[#F5EFE7] transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Previous product"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center gap-3">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to product ${i + 1}`}
                className="transition-all duration-300 p-2"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${i === currentIndex
                    ? "w-8 h-3 bg-[#3E2410]"
                    : "w-3 h-3 bg-[#D9CABA] hover:bg-[#7C5C45]"
                    }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full border-2 border-[#D9CABA] flex items-center justify-center text-[#7C5C45] hover:border-[#3E2410] hover:text-[#3E2410] hover:bg-[#F5EFE7] transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Next product"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>

      {/* ── MOBILE MENU DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#2C1A0E]/50 backdrop-blur-sm z-50 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 p-6 flex flex-col md:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10 border-b border-[#D9CABA]/30 pb-4">
                <span className="font-heading font-bold text-lg text-[#3E2410] uppercase">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-[#F5EFE7] text-[#3E2410] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-[10px] font-bold tracking-widest text-[#7C5C45] mb-2">NAVIGATION</h3>
                  {LEFT_NAV.map((nav) => (
                    <Link
                      key={nav.label}
                      href={nav.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-4 text-[#3E2410] font-semibold hover:text-[#C08040] transition-colors"
                    >
                      <nav.icon size={20} />
                      {nav.label}
                    </Link>
                  ))}
                </div>

                <div className="h-px bg-[#D9CABA]/30 w-full my-2" />

                <div className="flex flex-col gap-4">
                  <h3 className="text-[10px] font-bold tracking-widest text-[#7C5C45] mb-2">ACTIONS</h3>
                  <Link href="/account/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-[#3E2410] font-semibold hover:text-[#C08040]">
                    <Heart size={20} /> WISHLIST
                  </Link>
                  <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-[#3E2410] font-semibold hover:text-[#C08040]">
                    <ShoppingCart size={20} /> CART
                  </Link>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-[#3E2410] font-semibold hover:text-[#C08040]">
                    LOGIN
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-[#3E2410] font-semibold hover:text-[#C08040]">
                    REGISTER
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
