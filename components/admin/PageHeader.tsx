import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
}

export function PageHeader({ title, description, breadcrumbs, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Link href="/admin" className="hover:text-foreground transition-colors">
              Admin
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4" />
                <Link
                  href={crumb.href}
                  className={index === breadcrumbs.length - 1 ? "text-foreground font-medium" : "hover:text-foreground transition-colors"}
                >
                  {crumb.label}
                </Link>
              </div>
            ))}
          </nav>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      
      {action && (
        <div className="shrink-0">
          {action.href ? (
            <Button asChild>
              <Link href={action.href}>
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </Link>
            </Button>
          ) : (
            <Button onClick={action.onClick}>
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
