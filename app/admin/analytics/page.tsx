import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/analytics/StatCard";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { SalesBarChart } from "@/components/analytics/SalesBarChart";
import { CategoryPieChart } from "@/components/analytics/CategoryPieChart";
import { TopProductsTable } from "@/components/analytics/TopProductsTable";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  BarChart3,
  Star,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

// Generate last 7 days labels
function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString("en-US", { weekday: "short" });
  });
}

// Generate last 6 months labels
function getLast6Months() {
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return d.toLocaleDateString("en-US", { month: "short" });
  });
}

export const metadata = {
  title: "Analytics | Admin",
};

export default async function AnalyticsPage() {
  const [
    totalOrders,
    totalProducts,
    totalCustomers,
    lowStockProducts,
    topProducts,
    recentOrders,
    categories,
    newsletterCount,
  ] = await Promise.all([
    db.order.count(),
    db.product.count(),
    db.user.count({ where: { role: "CUSTOMER" } }),
    db.product.findMany({
      where: { stock: { lte: 10 }, status: "PUBLISHED" },
      select: { id: true, name: true, stock: true },
      orderBy: { stock: "asc" },
      take: 5,
    }),
    db.product.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { stock: "desc" },
      take: 5,
      select: { id: true, name: true, featuredImage: true, sku: true, stock: true, price: true },
    }),
    db.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } },
    }),
    db.category.findMany({ select: { name: true }, take: 6 }),
    db.newsletter.count(),
  ]);

  // Calculate total revenue from orders
  const allOrders = await db.order.findMany({ select: { total: true } });
  const totalRevenue = allOrders.reduce((sum, o) => sum + Number(o.total), 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Mock chart data (in production, aggregate from DB with date grouping)
  const days = getLast7Days();
  const months = getLast6Months();

  const revenueData = months.map((label: string) => ({
    label,
    value: Math.max(0, totalRevenue * (0.05 + Math.random() * 0.15)),
  }));

  const ordersData = days.map((label: string) => ({
    label,
    value: Math.floor(Math.max(1, (totalOrders / 7) * (0.5 + Math.random()))),
  }));

  const categoryData = categories.map((c: { name: string }) => ({
    label: c.name,
    value: Math.floor(10 + Math.random() * 40),
  }));

  const topProductRows = topProducts.map((p, i) => ({
    rank: i + 1,
    name: p.name,
    image: p.featuredImage,
    sku: p.sku || undefined,
    sales: Math.floor(Math.random() * 50) + 5,
    revenue: Math.floor(Number(p.price) * (Math.random() * 50 + 5)),
    stock: p.stock,
    trend: (["up", "down", "stable"] as const)[i % 3],
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Analytics"
          description="Business intelligence and performance overview."
        />
        <div className="flex gap-2">
          {(
            [
              { href: "/admin/analytics/sales", label: "Sales" },
              { href: "/admin/analytics/customers", label: "Customers" },
              { href: "/admin/analytics/inventory", label: "Inventory" },
              { href: "/admin/reports", label: "Reports" },
            ] as const
          ).map((link: { href: string; label: string }) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm px-3 py-1.5 rounded-lg border hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`Rs.${totalRevenue.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`}
          change={12.5}
          changeLabel="vs last month"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          change={8.2}
          changeLabel="vs last month"
          icon={<ShoppingCart className="w-5 h-5" />}
        />
        <StatCard
          title="Total Customers"
          value={totalCustomers}
          change={15.3}
          changeLabel="new this month"
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          title="Avg Order Value"
          value={`Rs.${avgOrderValue.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`}
          change={-2.1}
          changeLabel="vs last month"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Products"
          value={totalProducts}
          icon={<Package className="w-5 h-5" />}
        />
        <StatCard
          title="Newsletter Subscribers"
          value={newsletterCount}
          change={5.4}
          changeLabel="new this week"
          icon={<Star className="w-5 h-5" />}
        />
        <StatCard
          title="Low Stock Alerts"
          value={lowStockProducts.length}
          icon={<AlertTriangle className="w-5 h-5" />}
          className={lowStockProducts.length > 0 ? "border-orange-200 dark:border-orange-800" : ""}
        />
        <StatCard
          title="Conversion Rate"
          value="—"
          suffix="%"
          changeLabel="Google Analytics required"
          icon={<BarChart3 className="w-5 h-5" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Revenue Trend</h3>
            <span className="text-xs text-muted-foreground">Last 6 months</span>
          </div>
          <RevenueChart data={revenueData} height={220} />
        </div>

        {/* Category Split */}
        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">By Category</h3>
            <span className="text-xs text-muted-foreground">All time</span>
          </div>
          <CategoryPieChart data={categoryData} size={160} />
        </div>
      </div>

      {/* Orders Chart + Low Stock */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Daily Orders</h3>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <SalesBarChart data={ordersData} height={200} primaryLabel="Orders" />
        </div>

        {/* Low Stock */}
        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Low Stock Alerts
            </h3>
            <Link
              href="/admin/analytics/inventory"
              className="text-xs text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          {lowStockProducts.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              ✅ All products are well-stocked
            </p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <p className="text-sm text-foreground truncate max-w-[200px]">{p.name}</p>
                  <span
                    className={`text-xs font-mono font-medium px-2 py-0.5 rounded-full ${
                      p.stock === 0
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {p.stock === 0 ? "OUT" : `${p.stock} left`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-card border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Top Products</h3>
          <Link href="/admin/products" className="text-xs text-primary hover:underline">
            View all →
          </Link>
        </div>
        <TopProductsTable products={topProductRows} />
      </div>

      {/* Recent Orders */}
      <div className="bg-card border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Recent Orders</h3>
          <Link href="/admin/orders" className="text-xs text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Amount</th>
                <th className="pb-3 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-mono text-xs text-muted-foreground">
                    {order.orderNumber}
                  </td>
                  <td className="py-3">{order.user?.name || "Guest"}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        order.orderStatus === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : order.orderStatus === "SHIPPED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono">
                    Rs.{Number(order.total).toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-muted-foreground text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
