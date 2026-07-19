import Image from "next/image";
import { MapPin } from "lucide-react";
import { StarRating } from "@/components/common/StarRating";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  name: string;
  location?: string;
  rating: number;
  review: string;
  avatar?: string;
  date?: string;
  className?: string;
}

export function ReviewCard({
  name,
  location,
  rating,
  review,
  avatar,
  date,
  className,
}: ReviewCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl border border-border/60 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4",
        className
      )}
    >
      {/* Quote mark */}
      <div className="text-4xl font-heading text-primary/20 leading-none select-none" aria-hidden="true">
        &ldquo;
      </div>

      <p className="text-sm md:text-base text-muted-foreground leading-relaxed -mt-4 line-clamp-4">
        {review}
      </p>

      <StarRating rating={rating} size="sm" />

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-border/40">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0">
          {avatar ? (
            <Image src={avatar} alt={name} fill className="object-cover" sizes="40px" />
          ) : (
            <span className="text-base font-semibold text-muted-foreground">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{name}</p>
          {location && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{location}</span>
            </div>
          )}
        </div>
        {date && (
          <time className="text-xs text-muted-foreground shrink-0">{date}</time>
        )}
      </div>
    </div>
  );
}
