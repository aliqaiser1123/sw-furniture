import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  variant?: "default" | "bordered";
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  variant = "default",
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col items-center text-center p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1",
        variant === "bordered"
          ? "border border-border/60 bg-card shadow-sm hover:shadow-md hover:border-primary/30"
          : "hover:bg-secondary/50",
        className
      )}
    >
      {/* Icon container */}
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
      </div>

      <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
