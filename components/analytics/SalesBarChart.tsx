"use client";

interface BarDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface SalesBarChartProps {
  data: BarDataPoint[];
  height?: number;
  primaryLabel?: string;
  secondaryLabel?: string;
  valuePrefix?: string;
  className?: string;
}

export function SalesBarChart({
  data,
  height = 220,
  primaryLabel = "Orders",
  secondaryLabel,
  valuePrefix = "",
  className = "",
}: SalesBarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className={`flex items-center justify-center text-muted-foreground text-sm ${className}`}
        style={{ height }}
      >
        No data available
      </div>
    );
  }

  const max = Math.max(...data.map((d) => Math.max(d.value, d.secondaryValue ?? 0)));
  const barWidth = Math.floor((100 / data.length) * 0.7);
  const gap = Math.floor((100 / data.length) * 0.3);

  return (
    <div className={`w-full ${className}`}>
      {/* Legend */}
      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-primary inline-block" />
          {primaryLabel}
        </span>
        {secondaryLabel && (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-primary/30 inline-block" />
            {secondaryLabel}
          </span>
        )}
      </div>
      <div className="flex items-end gap-1" style={{ height: height - 40 }}>
        {data.map((d, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-end gap-0.5 group"
          >
            <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {valuePrefix}{d.value.toLocaleString()}
            </div>
            <div className="w-full flex items-end gap-0.5">
              <div
                className="flex-1 bg-primary rounded-t-sm transition-all duration-300 hover:opacity-80"
                style={{ height: `${(d.value / max) * 100}%`, minHeight: 2 }}
              />
              {d.secondaryValue !== undefined && (
                <div
                  className="flex-1 bg-primary/30 rounded-t-sm transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(d.secondaryValue / max) * 100}%`, minHeight: 2 }}
                />
              )}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1 text-center truncate w-full">
              {d.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
