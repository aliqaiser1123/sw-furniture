import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
  className?: string;
}

export function StarRating({
  rating,
  max = 5,
  size = "md",
  showCount,
  count,
  className,
}: StarRatingProps) {
  const sizeMap = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of ${max} stars`}>
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizeMap[size],
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : i < rating
                ? "fill-amber-200 text-amber-400"
                : "fill-muted text-muted-foreground/30"
            )}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-muted-foreground ml-1">({count})</span>
      )}
    </div>
  );
}
