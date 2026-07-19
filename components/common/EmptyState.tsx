import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}

export function EmptyState({ icon = "📦", title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-20 px-6",
        className
      )}
      role="status"
    >
      <div className="text-6xl mb-6 select-none" aria-hidden="true">
        {icon}
      </div>
      <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-base max-w-sm leading-relaxed mb-6">
          {description}
        </p>
      )}
      {action && (
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
