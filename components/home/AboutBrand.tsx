"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutBrand() {
  return (
    <section className="section-padding bg-card">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://picsum.photos/seed/artisan/800/1200"
              alt="Artisan handcrafting premium Sheesham furniture"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Floating accent card */}
            <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border max-w-[180px]">
              <div className="text-4xl font-heading font-bold text-primary mb-1">15+</div>
              <div className="text-sm text-muted-foreground font-light">Years of Craftsmanship</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-6 block">
              Our Story
            </span>
            <h2 className="text-3xl md:text-5xl font-heading mb-8 leading-tight">
              Rooted in Craft. Built to Last.
            </h2>
            <p className="text-muted-foreground font-light text-lg leading-relaxed mb-6">
              Shesham Wood was founded on a single belief: that great furniture is an act of love. Rooted in the artisan traditions of Punjab, we bring together master craftsmen whose families have worked with wood for generations.
            </p>
            <p className="text-muted-foreground font-light text-lg leading-relaxed mb-12">
              Every piece we create is an investment — built to age gracefully, to carry memories, and to define the spaces you call home. No shortcuts. No compromises. Just honest, enduring craft.
            </p>
            <Link href="/about" className="btn-primary self-start">
              Discover Our Story
              <ArrowRight className="w-4 h-4 ml-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
