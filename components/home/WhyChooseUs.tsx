"use client";

import { motion } from "framer-motion";
import { TreePine, Hammer, Sparkles, MapPin } from "lucide-react";

const FEATURES = [
  {
    icon: TreePine,
    title: "100% Solid Sheesham Wood",
    description:
      "Every piece is crafted from premium grade Indian Rosewood — the strongest, most durable hardwood in South Asia.",
  },
  {
    icon: Hammer,
    title: "Handcrafted Excellence",
    description:
      "Our master artisans pour decades of skill into each joint, carve, and finish — no shortcuts, ever.",
  },
  {
    icon: Sparkles,
    title: "Premium Finish",
    description:
      "Multi-stage sanding, sealing, and hand-polished lacquer create a timeless surface that deepens beautifully with age.",
  },
  {
    icon: MapPin,
    title: "Nationwide Delivery",
    description:
      "White-glove delivery and professional installation across Pakistan. Delivered to your door, assembled in your home.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-primary">
      <div className="container-default">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/50 mb-4 block">
            The Shesham Difference
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-white mb-6">
            Why Discerning Homeowners Choose Us
          </h2>
          <p className="text-white/60 font-light text-lg">
            We don&apos;t cut corners. Every detail matters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="flex flex-col items-start text-left p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-xl text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 font-light text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
