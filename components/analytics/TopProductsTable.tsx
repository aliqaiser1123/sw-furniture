import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ProductRow {
  rank: number;
  name: string;
  image?: string | null;
  sku?: string;
  sales: number;
  revenue: number;
  stock: number;
  trend?: "up" | "down" | "stable";
}

interface TopProductsTableProps {
  products: ProductRow[];
  className?: string;
}

export function TopProductsTable({ products, className = "" }: TopProductsTableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="pb-3 font-medium w-8">#</th>
            <th className="pb-3 font-medium">Product</th>
            <th className="pb-3 font-medium text-right">Sales</th>
            <th className="pb-3 font-medium text-right">Revenue</th>
            <th className="pb-3 font-medium text-right">Stock</th>
            <th className="pb-3 font-medium text-right">Trend</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((p) => (
            <tr key={p.rank} className="hover:bg-muted/30 transition-colors">
              <td className="py-3 text-muted-foreground font-mono text-xs">{p.rank}</td>
              <td className="py-3">
                <div className="flex items-center gap-3">
                  {p.image ? (
                    <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="36px" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-muted flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium text-foreground truncate max-w-[140px]">{p.name}</p>
                    {p.sku && <p className="text-xs text-muted-foreground">{p.sku}</p>}
                  </div>
                </div>
              </td>
              <td className="py-3 text-right font-mono">{p.sales.toLocaleString()}</td>
              <td className="py-3 text-right font-mono">Rs.{p.revenue.toLocaleString()}</td>
              <td className="py-3 text-right">
                <Badge
                  variant={p.stock <= 5 ? "destructive" : p.stock <= 20 ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {p.stock}
                </Badge>
              </td>
              <td className="py-3 text-right">
                {p.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500 ml-auto" />}
                {p.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500 ml-auto" />}
                {(!p.trend || p.trend === "stable") && (
                  <span className="text-muted-foreground text-xs">—</span>
                )}
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="py-8 text-center text-muted-foreground">
                No products data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
