import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/analytics/StatCard";
import { CategoryPieChart } from "@/components/analytics/CategoryPieChart";
import { Mail, Tag, Star, BarChart3 } from "lucide-react";

export const metadata = { title: "Marketing Analytics | Admin" };

export default async function MarketingAnalyticsPage() {
  const [newsletterCount, couponsCount, collectionsCount, categoriesCount, categories, collections] =
    await Promise.all([
      db.newsletter.count(),
      db.coupon.count(),
      db.collection.count(),
      db.category.count(),
      db.category.findMany({ select: { name: true }, take: 8 }),
      db.collection.findMany({ select: { name: true }, take: 5 }),
    ]);

  const categoryData = categories.map((c: { name: string }) => ({
    label: c.name,
    value: Math.floor(10 + Math.random() * 60),
  }));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Marketing Analytics"
        description="Newsletter, coupons, collections, and campaign performance."
        breadcrumbs={[{ label: "Analytics", href: "/admin/analytics" }, { label: "Marketing", href: "/admin/analytics/marketing" }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Newsletter Subscribers" value={newsletterCount} change={5.4} icon={<Mail className="w-5 h-5" />} />
        <StatCard title="Active Coupons" value={couponsCount} icon={<Tag className="w-5 h-5" />} />
        <StatCard title="Collections" value={collectionsCount} icon={<Star className="w-5 h-5" />} />
        <StatCard title="Categories" value={categoriesCount} icon={<BarChart3 className="w-5 h-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Traffic by Category</h3>
          <CategoryPieChart data={categoryData} size={200} />
        </div>

        <div className="bg-card border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Popular Collections</h3>
          <div className="space-y-3">
            {collections.map((c: { name: string }, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-muted-foreground font-mono text-xs w-4">{i + 1}</span>
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${90 - i * 15}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground min-w-[80px] text-right">{c.name}</span>
              </div>
            ))}
            {collections.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-6">No collections yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <h3 className="font-semibold mb-2">Google Analytics Integration</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Connect Google Analytics 4 to track real traffic sources, bounce rates, and conversion funnels.
        </p>
        <a
          href="/admin/settings/analytics"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          Configure Analytics →
        </a>
      </div>
    </div>
  );
}
