"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  description?: string;
  href: string;
  image?: string;
  className?: string;
}

export function CategoryCard({
  name,
  description,
  href,
  image,
  className,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={cn("group relative overflow-hidden rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1", className)}
    >
      <Link href={href} className="block focus-brand" aria-label={`Explore ${name}`}>
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary/70 flex items-center justify-center">
              <span className="text-4xl opacity-30">🪑</span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 overlay-wood opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-2">
          <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
          <div className="flex items-center gap-1 text-primary text-sm font-medium mt-1 group-hover:gap-2 transition-all duration-200">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
