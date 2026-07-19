import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: string;
  cta?: { label: string; href: string };
  className?: string;
}

export function PageBanner({
  title,
  subtitle,
  breadcrumbs,
  image,
  cta,
  className,
}: PageBannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-secondary min-h-[280px] md:min-h-[340px] flex items-center",
        className
      )}
      aria-label={`${title} page header`}
    >
      {image && (
        <Image
          src={image}
          alt={`${title} banner`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}
      {/* Overlay */}
      <div className={cn("absolute inset-0", image ? "overlay-wood" : "bg-gradient-to-br from-secondary via-background to-muted/60")} />

      <div className="container-default relative z-10 py-16">
        {breadcrumbs && (
          <div className="mb-6">
            <Breadcrumb
              items={breadcrumbs}
              className={cn(image && "text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_svg]:text-white/50")}
            />
          </div>
        )}
        <h1
          className={cn(
            "font-heading text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4",
            image ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "text-base md:text-lg max-w-2xl leading-relaxed mb-6",
              image ? "text-white/80" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </p>
        )}
        {cta && (
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
