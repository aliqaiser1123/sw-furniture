"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  name: string;
  description?: string;
  href: string;
  image?: string;
  variant?: "default" | "featured";
  className?: string;
}

export function CollectionCard({
  name,
  description,
  href,
  image,
  variant = "default",
  className,
}: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-400",
        variant === "featured" ? "aspect-[16/10]" : "aspect-[4/3]",
        className
      )}
    >
      {/* Background Image */}
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary to-accent/20" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <p className="text-white/60 text-xs uppercase tracking-widest mb-1 font-medium">
            Collection
          </p>
          <h3 className="font-heading text-white text-2xl md:text-3xl font-semibold mb-2 leading-tight">
            {name}
          </h3>
          {description && (
            <p className="text-white/70 text-sm mb-4 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-white/60 text-white bg-white/10 hover:bg-white hover:text-foreground backdrop-blur-sm transition-all duration-200 w-fit group-hover:border-white"
          >
            <Link href={href} aria-label={`Explore ${name} collection`}>
              Explore Collection
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
