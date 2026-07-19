"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";

interface AIRecommendationsProps {
  contextIds?: string[]; // IDs of products to base recommendations on (e.g. cart items)
  title?: string;
  limit?: number;
}

export function AIRecommendations({ contextIds = [], title = "Recommended for You", limit = 4 }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const res = await fetch("/api/ai/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contextIds, limit }),
        });
        const data = await res.json();
        if (data.success) {
          setRecommendations(data.recommendations);
        }
      } catch (error) {
        console.error("Failed to load AI recommendations", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  }, [contextIds, limit]);

  if (isLoading) {
    return (
      <div className="w-full py-12 space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-muted-foreground animate-pulse" />
          <h2 className="text-2xl font-heading">Curating {title}...</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <div className="w-full aspect-square bg-muted animate-pulse rounded-xl" />
              <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <div className="w-full py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-heading tracking-tight">{title}</h2>
        </div>
        <Link href="/shop" className="text-sm font-medium hover:underline text-muted-foreground">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
