import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  id?: string;
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  id,
  label,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <div className={cn("flex flex-col gap-3", alignClass, className)}>
      {label && (
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-foreground bg-accent/20 px-3 py-1 rounded-full w-fit">
          {label}
        </span>
      )}
      <h2
        id={id}
        className={cn(
          "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      {/* Decorative underline */}
      <div
        className={cn(
          "flex mt-1",
          align === "center" && "justify-center",
          align === "right" && "justify-end"
        )}
      >
        <div className="h-0.5 w-12 bg-primary rounded-full" />
        <div className="h-0.5 w-4 bg-accent rounded-full ml-1" />
      </div>
    </div>
  );
}
