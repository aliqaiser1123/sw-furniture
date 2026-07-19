"use client";

interface DataPoint {
  label: string;
  value: number;
}

interface RevenueChartProps {
  data: DataPoint[];
  height?: number;
  className?: string;
}

export function RevenueChart({ data, height = 200, className = "" }: RevenueChartProps) {
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

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const padding = 40;
  const width = 600;
  const chartHeight = height - padding;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = padding / 2 + ((max - d.value) / range) * (chartHeight - padding / 2);
    return { x, y, ...d };
  });

  const pathD =
    points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padding}
            y1={padding / 2 + t * (chartHeight - padding / 2)}
            x2={width - padding}
            y2={padding / 2 + t * (chartHeight - padding / 2)}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
        ))}
        {/* Area fill */}
        <path d={areaD} fill="url(#revenueGradient)" />
        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--background))"
            strokeWidth="2"
          />
        ))}
        {/* X labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - 4}
            textAnchor="middle"
            fontSize="10"
            fill="hsl(var(--muted-foreground))"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
