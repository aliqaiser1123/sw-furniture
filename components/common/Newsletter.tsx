"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  className?: string;
  variant?: "default" | "dark" | "minimal";
}

export function Newsletter({ className, variant = "default" }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const bgClass = {
    default: "bg-secondary/60",
    dark: "bg-primary text-primary-foreground",
    minimal: "",
  }[variant];

  return (
    <section
      className={cn("section-padding", bgClass, className)}
      aria-labelledby="newsletter-heading"
    >
      <div className="container-default">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-primary" aria-hidden="true" />
          </div>
          <h2
            id="newsletter-heading"
            className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-3"
          >
            Stay Inspired
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
            Subscribe to receive exclusive offers, new collection alerts, and interior design inspiration directly to your inbox.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-primary font-medium text-lg">
              <CheckCircle className="w-6 h-6" aria-hidden="true" />
              <span>Thank you! You&apos;re subscribed.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              aria-label="Newsletter subscription form"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Your email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-background border-border/60 h-11 text-sm"
                aria-required="true"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-6 shrink-0"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
