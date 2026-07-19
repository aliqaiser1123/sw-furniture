"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, PhoneCall } from "lucide-react";
import { Product } from "@prisma/client";

interface HeroSectionProps {
  products?: (Product & { category?: any })[];
}

export function HeroSection({ products = [] }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback data if no products are passed
  const displayProducts = products.length > 0 ? products : [
    {
      id: "fallback-1",
      name: "The Royal Heritage Bed",
      description: "We create designer furniture that doesn't just complement an interior - they become its accent. Each piece is a combination of architectural form, tactile pleasure, and visual harmony.",
      price: 1299,
      compareAtPrice: 1599,
      images: ["https://picsum.photos/seed/bed/800/800"],
    },
    {
      id: "fallback-2",
      name: "Classic Dining Chair",
      description: "Experience the ultimate comfort with our ergonomically designed Sheesham wood chairs. Perfect for long dinners and engaging conversations.",
      price: 199,
      compareAtPrice: 249,
      images: ["https://picsum.photos/seed/chair/800/800"],
    },
  ];

  const currentProduct = displayProducts[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayProducts.length) % displayProducts.length);
  };

  return (
    <section className="relative w-full p-4 md:p-6 bg-white min-h-screen flex flex-col">
      {/* The main rounded frame */}
      <div className="relative flex-1 w-full rounded-[3rem] bg-gradient-to-br from-[#3E2723] to-[#2D1B13] overflow-hidden flex flex-col items-center justify-center border-[8px] border-white shadow-2xl">
        
        {/* Massive Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex items-center gap-12 lg:gap-32"
          >
            <span className="text-[12vw] font-black text-white/[0.03] tracking-tighter lowercase font-heading">
              shee
            </span>
            <span className="text-[12vw] font-black text-white/[0.03] tracking-tighter lowercase font-heading">
              sham
            </span>
          </motion.div>
        </div>

        {/* Top Navigation Arrows (mimicking the reference top-left arrows) */}
        <div className="absolute top-12 left-12 flex gap-4 z-20">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Left Content Column */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 max-w-sm z-20 hidden md:block">
          <motion.h2 
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6 font-heading leading-tight"
          >
            {currentProduct.name}
          </motion.h2>
          
          <motion.p 
            key={`desc-${currentIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/70 text-sm leading-relaxed mb-8 line-clamp-4"
          >
            {currentProduct.description || "Premium Sheesham wood furniture crafted to perfection. Bring timeless elegance into your home."}
          </motion.p>
          
          <Link
            href="/shop"
            className="inline-flex px-8 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide transition-all hover:bg-white/90 hover:scale-105"
          >
            View All Collections
          </Link>
        </div>

        {/* Central Product Showcase */}
        <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-3/4 h-3/4 drop-shadow-2xl"
            >
              <Image
                src={(currentProduct.images as string[])?.[0] || "https://picsum.photos/seed/fallback/800/800"}
                alt={currentProduct.name}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Interactive Hotspots */}
              <div className="absolute top-[30%] left-[20%] group">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/40 transition-colors border border-white/30">
                  <Plus className="w-4 h-4" />
                </div>
                <div className="absolute left-10 top-0 w-48 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Premium solid wood construction with natural grain patterns.
                </div>
              </div>

              <div className="absolute bottom-[40%] right-[10%] group">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/40 transition-colors border border-white/30">
                  <Plus className="w-4 h-4" />
                </div>
                <div className="absolute right-10 top-0 w-48 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-right">
                  Hand-polished finish for tactile pleasure and visual harmony.
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Content Column */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-end z-20 hidden lg:flex">
          <div className="text-white text-right mb-12">
            <motion.div 
              key={`price-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold font-mono"
            >
              ${currentProduct.price}
            </motion.div>
            {currentProduct.compareAtPrice && (
              <div className="text-white/50 line-through text-xl font-mono mt-1">
                ${currentProduct.compareAtPrice}
              </div>
            )}
          </div>

          <p className="text-white/70 text-sm mb-4">Choose your finish</p>
          <div className="flex gap-3">
            {/* Swatches */}
            {[0, 1, 2].map((idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx % displayProducts.length)}
                className={`w-12 h-12 rounded-full border-2 overflow-hidden transition-all ${
                  currentIndex === idx % displayProducts.length ? 'border-white scale-110' : 'border-white/20 hover:border-white/50'
                }`}
              >
                <div className="w-full h-full relative">
                  <Image 
                    src={(displayProducts[idx % displayProducts.length]?.images as string[])?.[0] || "https://picsum.photos/seed/fallback/100/100"}
                    alt="Finish option"
                    fill
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Floating Consultation Card */}
        <div className="absolute bottom-12 right-12 z-30 hidden md:block">
          <div className="bg-white rounded-2xl p-4 pr-16 shadow-2xl max-w-xs relative overflow-hidden">
            <h4 className="text-gray-900 font-bold text-sm mb-1">Get a Free Consultation</h4>
            <p className="text-gray-500 text-xs mb-3 leading-relaxed">
              Fill out the form and our specialist will contact you shortly to help with your request.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-[#3E2723] text-white rounded-full text-xs font-medium hover:bg-[#2D1B13] transition-colors"
            >
              Request a Call
              <span className="w-5 h-5 ml-2 bg-white rounded-full flex items-center justify-center text-[#3E2723]">
                <PhoneCall className="w-3 h-3" />
              </span>
            </Link>

            {/* Decorative person image placeholder */}
            <div className="absolute right-[-10px] bottom-0 w-24 h-24 bg-gray-100 rounded-tl-full overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/consultant/200/200"
                alt="Consultant"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Social / Footer Links Inside Frame */}
        <div className="absolute bottom-12 left-12 flex gap-4 text-white/50 z-20">
          <Link href="#" className="hover:text-white transition-colors"><span className="text-sm">IN</span></Link>
          <Link href="#" className="hover:text-white transition-colors"><span className="text-sm">FB</span></Link>
          <Link href="#" className="hover:text-white transition-colors"><span className="text-sm">TW</span></Link>
        </div>
        
        {/* Bottom center scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 text-white/50">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-white/20">
            <motion.div
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-1/2 bg-white"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
