"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-default">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-6 block">
            Stay Informed
          </span>
          <h2 className="text-3xl md:text-5xl font-heading mb-6">
            Exclusive Access & New Arrivals
          </h2>
          <p className="text-muted-foreground font-light text-lg mb-12 max-w-md mx-auto">
            Join our community for early access to new collections, design insights, and exclusive member offers.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 px-10 bg-primary/5 border border-primary/20 rounded-2xl"
            >
              <p className="font-heading text-xl text-foreground">Thank you for subscribing.</p>
              <p className="text-muted-foreground text-sm mt-2">You&apos;ll hear from us soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                aria-label="Email address for newsletter"
                className="flex-1 px-6 py-4 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-6 font-light">
            No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
