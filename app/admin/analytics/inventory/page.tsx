import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/analytics/StatCard";
import { SalesBarChart } from "@/components/analytics/SalesBarChart";
import { Package, AlertTriangle, TrendingDown, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Inventory Analytics | Admin" };

export default async function InventoryAnalyticsPage() {
  const [
    totalProducts,
    publishedProducts,
    lowStockProducts,
    outOfStockProducts,
    allProducts,
  ] = await Promise.all([
    db.product.count(),
    db.product.count({ where: { status: "PUBLISHED" } }),
    db.product.count({ where: { stock: { gt: 0, lte: 10 }, status: "PUBLISHED" } }),
    db.product.count({ where: { stock: 0, status: "PUBLISHED" } }),
    db.product.findMany({
      select: { id: true, name: true, sku: true, stock: true, price: true, status: true, featuredImage: true },
      orderBy: { stock: "asc" },
      take: 20,
    }),
  ]);

  const totalInventoryValue = allProducts.reduce(
    (sum, p) => sum + p.stock * Number(p.price),
    0
  );

  // Stock distribution chart
  const stockBuckets = [
    { label: "0", value: outOfStockProducts },
    { label: "1-5", value: allProducts.filter((p) => p.stock >= 1 && p.stock <= 5).length },
    { label: "6-20", value: allProducts.filter((p) => p.stock >= 6 && p.stock <= 20).length },
    { label: "21-50", value: allProducts.filter((p) => p.stock >= 21 && p.stock <= 50).length },
    { label: "50+", value: allProducts.filter((p) => p.stock > 50).length },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Inventory Analytics"
        description="Stock levels, inventory value, and product health."
        breadcrumbs={[{ label: "Analytics", href: "/admin/analytics" }, { label: "Inventory", href: "/admin/analytics/inventory" }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Products" value={totalProducts} icon={<Package className="w-5 h-5" />} />
        <StatCard title="Published" value={publishedProducts} icon={<Archive className="w-5 h-5" />} />
        <StatCard
          title="Low Stock"
          value={lowStockProducts}
          icon={<AlertTriangle className="w-5 h-5" />}
          className={lowStockProducts > 0 ? "border-orange-200 dark:border-orange-800" : ""}
        />
        <StatCard
          title="Out of Stock"
          value={outOfStockProducts}
          icon={<TrendingDown className="w-5 h-5" />}
          className={outOfStockProducts > 0 ? "border-red-200 dark:border-red-800" : ""}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Stock Distribution</h3>
            <span className="text-xs text-muted-foreground">By stock quantity bucket</span>
          </div>
          <SalesBarChart data={stockBuckets} height={220} primaryLabel="Products" />
        </div>

        <div className="bg-card border rounded-xl p-6 flex flex-col justify-between">
          <h3 className="font-semibold mb-4">Inventory Value</h3>
          <div className="text-center py-6">
            <p className="text-5xl font-bold font-heading text-primary">
              Rs.{totalInventoryValue.toLocaleString("en-PK", { maximumFractionDigits: 0 })}
            </p>
            <p className="text-muted-foreground mt-2 text-sm">Total inventory value (stock × price)</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center bg-secondary/30 rounded-lg p-3">
              <p className="text-xl font-bold">{totalProducts}</p>
              <p className="text-xs text-muted-foreground">Total SKUs</p>
            </div>
            <div className="text-center bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
              <p className="text-xl font-bold text-orange-600">{lowStockProducts}</p>
              <p className="text-xs text-muted-foreground">Low Stock</p>
            </div>
            <div className="text-center bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
              <p className="text-xl font-bold text-red-600">{outOfStockProducts}</p>
              <p className="text-xs text-muted-foreground">Out of Stock</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <h3 className="font-semibold mb-4">All Products — Stock Levels</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">SKU</th>
                <th className="pb-3 font-medium text-right">Price</th>
                <th className="pb-3 font-medium text-right">Stock</th>
                <th className="pb-3 font-medium text-right">Value</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allProducts.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-medium truncate max-w-[200px]">{p.name}</td>
                  <td className="py-3 text-muted-foreground font-mono text-xs">{p.sku || "—"}</td>
                  <td className="py-3 text-right font-mono">Rs.{Number(p.price).toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <Badge
                      variant={p.stock === 0 ? "destructive" : p.stock <= 10 ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {p.stock === 0 ? "Out" : p.stock}
                    </Badge>
                  </td>
                  <td className="py-3 text-right font-mono text-xs">
                    Rs.{(p.stock * Number(p.price)).toLocaleString()}
                  </td>
                  <td className="py-3 text-right">
                    <Badge variant={p.status === "PUBLISHED" ? "default" : "secondary"} className="text-xs">
                      {p.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
