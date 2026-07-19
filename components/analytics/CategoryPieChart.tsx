"use client";

interface PieSegment {
  label: string;
  value: number;
  color?: string;
}

interface CategoryPieChartProps {
  data: PieSegment[];
  size?: number;
  className?: string;
}

const DEFAULT_COLORS = [
  "hsl(222 84% 60%)",
  "hsl(160 84% 39%)",
  "hsl(37 96% 55%)",
  "hsl(316 72% 61%)",
  "hsl(192 82% 49%)",
  "hsl(262 83% 58%)",
  "hsl(4 86% 58%)",
  "hsl(145 58% 55%)",
];

export function CategoryPieChart({ data, size = 180, className = "" }: CategoryPieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className={`flex items-center justify-center text-muted-foreground text-sm ${className}`}
        style={{ height: size }}
      >
        No data
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;

  // Build SVG arc paths
  let startAngle = -Math.PI / 2;
  const segments = data.map((d, i) => {
    const angle = (d.value / total) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    const color = d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
    const result = { path, color, label: d.label, value: d.value, pct: ((d.value / total) * 100).toFixed(1) };
    startAngle = endAngle;
    return result;
  });

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-6 ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
        {segments.map((s, i) => (
          <path
            key={i}
            d={s.path}
            fill={s.color}
            stroke="hsl(var(--background))"
            strokeWidth="2"
            className="hover:opacity-80 transition-opacity cursor-pointer"
          />
        ))}
        {/* Donut hole */}
        <circle cx={cx} cy={cy} r={r * 0.5} fill="hsl(var(--card))" />
      </svg>
      <div className="flex flex-col gap-2 min-w-0">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-foreground truncate">{s.label}</span>
            <span className="text-muted-foreground ml-auto pl-2 font-mono text-xs">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
