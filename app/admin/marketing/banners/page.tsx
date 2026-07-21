import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash, Image as ImageIcon } from "lucide-react";

export default async function AdminBannersModule() {
  const banners = await db.banner.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banner Management"
        description="Manage promotional, seasonal, and homepage banners."
        action={{ label: "Add Banner" }}
      />

      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between gap-4 bg-secondary/20">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search banners..."
              className="w-full pl-9 pr-4 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Preview</th>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Position</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {banners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No banners configured. Add a new promotional banner.
                  </td>
                </tr>
              ) : (
                banners.map((banner: any) => (
                  <tr key={banner.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-24 h-12 bg-secondary/30 rounded flex items-center justify-center overflow-hidden relative">
                        {banner.imageUrl ? (
                          <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <div>{banner.title}</div>
                      {banner.subtitle && <div className="text-xs text-muted-foreground mt-0.5">{banner.subtitle}</div>}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground capitalize">
                      {banner.position.replace(/_/g, " ")}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={banner.active ? "default" : "secondary"} className={banner.active ? "bg-green-100 text-green-800 border-green-200" : ""}>
                        {banner.active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-end gap-3 h-full pt-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
