import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number; // percentage change, positive or negative
  changeLabel?: string;
  icon?: ReactNode;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  prefix = "",
  suffix = "",
  className = "",
}: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === undefined || change === 0;

  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold font-heading text-foreground">
          {prefix}
          {typeof value === "number" ? value.toLocaleString() : value}
          {suffix}
        </p>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
              isPositive
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : isNegative
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {isPositive && <TrendingUp className="w-3.5 h-3.5" />}
            {isNegative && <TrendingDown className="w-3.5 h-3.5" />}
            {isNeutral && <Minus className="w-3.5 h-3.5" />}
            {Math.abs(change ?? 0).toFixed(1)}%
          </div>
        )}
      </div>
      {changeLabel && (
        <p className="text-xs text-muted-foreground">{changeLabel}</p>
      )}
    </div>
  );
}
