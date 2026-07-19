"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Zara Ahmed",
    location: "Lahore, Pakistan",
    rating: 5,
    text:
      "The quality exceeded every expectation. Our dining table arrived perfectly finished, and the wood grain is simply stunning. This is furniture you buy once and keep forever.",
    initials: "ZA",
  },
  {
    id: 2,
    name: "Bilal Mahmood",
    location: "Karachi, Pakistan",
    rating: 5,
    text:
      "I was looking for something truly premium — not the typical factory-made pieces. Shesham Wood delivered a king bed that looks like it belongs in a five-star hotel. Truly a work of art.",
    initials: "BM",
  },
  {
    id: 3,
    name: "Hira Malik",
    location: "Islamabad, Pakistan",
    rating: 5,
    text:
      "From ordering to delivery, the experience was seamless and professional. The writing desk I got is solid, beautiful, and the craftsmanship speaks for itself every single day.",
    initials: "HM",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-6">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="section-padding bg-background">
      <div className="container-default">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4 block">
            Customer Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-heading mb-6">
            Loved by Homeowners Across Pakistan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              className="flex flex-col p-10 bg-card rounded-2xl border border-border hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500"
            >
              <StarRating rating={review.rating} />

              <blockquote className="text-foreground/80 font-light text-base leading-relaxed mb-8 flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <footer className="flex items-center gap-4 mt-auto pt-8 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground text-sm font-bold">{review.initials}</span>
                </div>
                <div>
                  <div className="font-heading text-lg text-foreground">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.location}</div>
                </div>
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
