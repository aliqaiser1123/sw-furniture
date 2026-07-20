"use client";

import { useState, useEffect } from "react";
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
  X,
} from "lucide-react";

interface HeroSectionProps {
  products?: any[];
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

const HERO_IMAGES = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
];

export function HeroSection({ products = [] }: HeroSectionProps) {

  const [heroIndex, setHeroIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const total = HERO_IMAGES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);



  const prevHero = () => {
    setHeroIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };
  const nextHero = () => {
    setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={heroIndex}
          initial={{
            opacity: 0,
            scale: 1.02,
          }}

          animate={{
            opacity: 1,
            scale: 1.05,
          }}

          exit={{
            opacity: 0,
            scale: 1.08,
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[heroIndex]}
            alt="Hero"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b  from-black/55 via-black/10 to-black/55 z-[1]" />
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
      <nav className="hidden lg:flex absolute left-0 top-0 bottom-0 w-20 flex-col items-center justify-center gap-8 z-20 border-r border-[#D9CABA]/50 bg-white/15 backdrop-blur-md">
        {LEFT_NAV.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-1 group"
          >
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-[#7C5C45] group-hover:bg-[#E7C66B] group-hover:text-[#2C1A0E] transition-all duration-200">
              <Icon size={20} />
            </span>
            <span className="text-[9px] font-bold tracking-widest text-[#7C5C45] group-hover:text-[#3E2410] transition-colors mt-1">
              {label}
            </span>
          </Link>
        ))}
      </nav>

      {/* ── RIGHT SIDEBAR ── */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-20 flex-col items-center justify-center gap-8 z-20 border-l border-[#D9CABA]/50 bg-white/15 backdrop-blur-md">
        {RIGHT_ACTIONS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-1 group"
          >
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-[#7C5C45] group-hover:bg-[#E7C66B] group-hover:text-[#2C1A0E] transition-all duration-200">
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
        <div className="w-full flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-xl bg-white/5 border-b border-[#E7C66B] shadow-[0_8px_40px_rgba(0,0,0,0.15)] transition-all duration-500">

          {/* Mobile Menu (visible on small screens) */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="text-[#3E2410]"><Menu size={24} /></button>
          </div>

          {/* Left Aligned Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-11 h-11 overflow-hidden rounded-full border-2 border-[#3E2410]"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-cover"
              />
            </motion.div>

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
            <span className="w-10 h-10 rounded-full bg-[#C08040] flex items-center justify-center ml-2 cursor-pointer hover:bg-[#3E2410] transition-colors shadow-[0_20px_60px_rgba(0,0,0,.35)]">
              <span className="w-3 h-3 rounded-full bg-white" />
            </span>
          </div>
        </div>

        {/* HERO CENTER */}

        <div className="flex-1 flex items-center justify-center relative z-10">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.2,
            }}
            className="text-center text-white max-w-5xl px-8"
          >

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-light tracking-[0.55em] uppercase"
            >
              SHEESHAM
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: .3,
                duration: 1
              }}
              className="mt-5 text-xl md:text-2xl tracking-[0.6em] uppercase text-[#F4DE9B]"
            >
              WOOD FURNITURE
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: .7,
                duration: 1
              }}
              className="mt-10"
              whileHover={{
                scale: 1.05
              }}

              whileTap={{
                scale: .98
              }}
            >

              <Link
                href="/shop"
                className="px-10 py-4 border border-[#E7C66B] uppercase tracking-[0.3em] text-sm hover:bg-[#E7C66B] hover:text-[#2C1A0E] transition-all duration-500"
              >
                Explore Collection
              </Link>

            </motion.div>
          </motion.div>
        </div>

      </div>


      {/* ── BOTTOM NAVIGATION: arrows + pagination dots ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-12 text-white">

        <button
          onClick={prevHero}
          className="hover:text-[#E7C66B] transition-all duration-300 transition-colors"
        >
          <ChevronLeft size={34} />
        </button>

        <div className="tracking-[0.55em] text-sm">

          {heroIndex + 1}

          <span className="mx-3 opacity-50">

            /

          </span>

          {HERO_IMAGES.length}

        </div>

        <button
          onClick={nextHero}
          className="hover:text-[#E7C66B] transition-all duration-300 transition-colors"
        >
          <ChevronRight size={34} />
        </button>

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
              whileHover={{
                scale: 1.05
              }}

              whileTap={{
                scale: .98
              }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 p-6 flex flex-col md:hidden overflow-y-auto"
              whileHover={{
                scale: 1.05
              }}

              whileTap={{
                scale: .98
              }}
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
    </section >
  );
}
