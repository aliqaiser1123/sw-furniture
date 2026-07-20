"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  {
    id: 1,
    category: "TABLE",
    name: "OAK DINING TABLE",
    price: "$240",
    tags: ["Best deal", "Approved quality"],
    // Using picsum as placeholder. When real transparent PNGs are added, remove the bg-neutral-800 class from the image container.
    image: "https://picsum.photos/seed/table1/800/800",
  },
  {
    id: 2,
    category: "NAKAS",
    name: "VINTAGE NAKAS",
    price: "$120",
    tags: ["Discount", "Premium"],
    image: "https://picsum.photos/seed/nakas1/800/800",
  },
  {
    id: 3,
    category: "CHAIR DESIGN",
    name: "SOFA MODERN",
    price: "$145",
    tags: ["Best deal", "Approved quality"],
    image: "https://picsum.photos/seed/chair1/800/800",
  },
  {
    id: 4,
    category: "BED",
    name: "KING SIZE BED",
    price: "$599",
    tags: ["New arrival", "Top rated"],
    image: "https://picsum.photos/seed/bed1/800/800",
  },
  {
    id: 5,
    category: "CUPBOARD",
    name: "WOODEN CUPBOARD",
    price: "$350",
    tags: ["Best seller", "Durable"],
    image: "https://picsum.photos/seed/cupboard1/800/800",
  },
];

export function FeaturedCategories() {
  // Start with CHAIR DESIGN active (index 2)
  const [activeIndex, setActiveIndex] = useState(2);

  const prevSlide = () => setActiveIndex((i) => Math.max(0, i - 1));
  const nextSlide = () => setActiveIndex((i) => Math.min(CATEGORIES.length - 1, i + 1));

  return (
    <section className="section-padding overflow-hidden relative">
      <div className="container-default max-w-6xl">
        
        {/* Top Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar md:flex-wrap justify-start md:justify-center items-center gap-4 md:gap-12 mb-12 md:mb-20 px-4 md:px-0">
          <div className="flex items-center gap-6 md:gap-12 w-max mx-auto px-4 md:px-0 py-2">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "uppercase tracking-widest text-xs md:text-base font-bold transition-all duration-300 whitespace-nowrap",
                  activeIndex === idx 
                    ? "text-[#3E2410] md:text-white scale-110 bg-[#D9CABA] md:bg-transparent px-4 py-2 rounded-full md:p-0 md:rounded-none" 
                    : "text-[#7C5C45] md:text-white/40 hover:text-[#3E2410] md:hover:text-white/70 px-4 py-2 md:p-0"
                )}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[450px] md:h-[600px] flex justify-center items-center perspective-1000">
          <AnimatePresence initial={false}>
            {CATEGORIES.map((cat, idx) => {
              // Calculate relative position
              const diff = idx - activeIndex;
              // Wrap around logic (optional, keeping it simple bounded for now)
              
              if (Math.abs(diff) > 2) return null; // Only render immediate neighbors to save DOM

              // Determine properties based on position
              let zIndex = 10;
              let scale = 1;
              let x = "0%";
              let opacity = 1;
              let blur = "blur(0px)";

              if (diff === 0) {
                zIndex = 20;
                scale = 1;
                x = "0%";
                opacity = 1;
              } else if (diff === -1) {
                zIndex = 10;
                scale = 0.8;
                x = "-60%";
                opacity = 0.5;
              } else if (diff === 1) {
                zIndex = 10;
                scale = 0.8;
                x = "60%";
                opacity = 0.5;
              } else if (diff === -2) {
                zIndex = 5;
                scale = 0.6;
                x = "-100%";
                opacity = 0;
              } else if (diff === 2) {
                zIndex = 5;
                scale = 0.6;
                x = "100%";
                opacity = 0;
              }

              return (
                <motion.div
                  key={cat.id}
                  initial={false}
                  animate={{
                    scale,
                    x,
                    zIndex,
                    opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 1,
                  }}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "absolute w-[280px] h-[380px] md:w-[450px] md:h-[550px] rounded-[2rem] flex flex-col items-center pt-8 md:pt-12 cursor-pointer",
                    "shadow-neumorphic bg-card border border-white/5"
                  )}
                >
                  {/* Card Content (Visible fully only when active) */}
                  <motion.div 
                    animate={{ opacity: diff === 0 ? 1 : 0.4 }}
                    className="text-center space-y-2 mb-8 z-10 relative"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">{cat.name}</h3>
                    <div className="flex items-center justify-center gap-4 text-xs md:text-sm text-white/80">
                      <span className="text-white font-semibold">{cat.price}</span>
                      {cat.tags.map(tag => (
                        <span key={tag} className="hidden md:inline-block text-white/70">{tag}</span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Product Image */}
                  <div className="relative flex-1 w-full flex items-center justify-center mt-auto pb-10">
                    <div className="relative w-[80%] h-[80%] drop-shadow-2xl">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Arrows — stopPropagation prevents double-step from card onClick */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            disabled={activeIndex === 0}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#3E2410] border-2 border-[#3E2410] flex items-center justify-center text-white hover:bg-[#2D1B13] hover:border-[#2D1B13] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            disabled={activeIndex === CATEGORIES.length - 1}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#3E2410] border-2 border-[#3E2410] flex items-center justify-center text-white hover:bg-[#2D1B13] hover:border-[#2D1B13] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-4 mt-16">
          {CATEGORIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                activeIndex === idx 
                  ? "bg-[#F6A22E] scale-125 w-4" 
                  : "bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
