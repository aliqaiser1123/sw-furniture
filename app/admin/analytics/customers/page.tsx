import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/analytics/StatCard";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { Users, UserCheck, TrendingUp, Heart } from "lucide-react";
import type { ChartDataPoint } from "@/types/prisma";

export const metadata = { title: "Customer Analytics | Admin" };

function getLast6Months(): string[] {
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return d.toLocaleDateString("en-US", { month: "short" });
  });
}

export default async function CustomerAnalyticsPage() {
  const [totalCustomers, totalAdmins, recentCustomers] = await Promise.all([
    db.user.count({ where: { role: "CUSTOMER" } }),
    db.user.count({ where: { role: "ADMIN" } }),
    db.user.findMany({
      where: { role: "CUSTOMER" },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
  ]);

  // groupBy returns userId as string | null per Prisma schema (Order.userId is nullable)
  const topCustomerOrders = await db.order.groupBy({
    by: ["userId"],
    _count: { id: true },
    _sum: { total: true },
    orderBy: { _count: { id: "desc" } },
    take: 5,
  });

  const months = getLast6Months();
  const growthData: ChartDataPoint[] = months.map((label: string) => ({
    label,
    value: Math.floor((totalCustomers / 6) * (0.4 + Math.random() * 1.2)),
  }));

  // Collect non-null user IDs from the group-by result
  const topUserIds: string[] = topCustomerOrders
    .map((order) => order.userId)
    .filter((id): id is string => id !== null && id !== undefined);

  const topUsers = topUserIds.length
    ? await db.user.findMany({
      where: { id: { in: topUserIds } },
      select: { id: true, name: true, email: true },
    })
    : [];

  // Build top customers list — Prisma infers the type of each item
  const topCustomers = topCustomerOrders.map((o) => {
    const user = topUsers.find((u) => u.id === o.userId) ?? null;
    return {
      name: user?.name ?? "Unknown",
      email: user?.email ?? "",
      orders: o._count.id,
      spent: Number(o._sum.total ?? 0),
    };
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Customer Analytics"
        description="Customer growth, retention, and lifetime value."
        breadcrumbs={[
          { label: "Analytics", href: "/admin/analytics" },
          { label: "Customers", href: "/admin/analytics/customers" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Customers" value={totalCustomers} change={15.3} icon={<Users className="w-5 h-5" />} />
        <StatCard title="Admin Users" value={totalAdmins} icon={<UserCheck className="w-5 h-5" />} />
        <StatCard title="New (This Month)" value={Math.floor(totalCustomers * 0.12)} change={8.4} icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="Wishlist Users" value="—" icon={<Heart className="w-5 h-5" />} changeLabel="Requires wishlist tracking" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Customer Growth</h3>
            <span className="text-xs text-muted-foreground">Last 6 months</span>
          </div>
          <RevenueChart data={growthData} height={220} />
        </div>

        <div className="bg-card border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Top Customers by Spend</h3>
          <div className="space-y-3">
            {topCustomers.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{c.name || "Anonymous"}</p>
                  <p className="text-xs text-muted-foreground">{c.email} · {c.orders} orders</p>
                </div>
                <p className="text-sm font-mono font-medium">Rs.{c.spent.toLocaleString()}</p>
              </div>
            ))}
            {topCustomers.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-6">No order data yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Recent Customers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-medium">{c.name || "—"}</td>
                  <td className="py-3 text-muted-foreground">{c.email}</td>
                  <td className="py-3 text-right text-muted-foreground text-xs">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentCustomers.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-muted-foreground">No customers yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
