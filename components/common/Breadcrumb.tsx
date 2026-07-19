"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  // JSON-LD BreadcrumbList schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      ...items
        .filter((item) => item.href)
        .map((item, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: item.label,
          item: item.href,
        })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
        <ol className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap" role="list">
          <li>
            <Link
              href="/"
              className="flex items-center hover:text-foreground transition-colors duration-200 focus-brand rounded"
              aria-label="Home"
            >
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" aria-hidden="true" />
              {item.href && index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors duration-200 focus-brand rounded"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
