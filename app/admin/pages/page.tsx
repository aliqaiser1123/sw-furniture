import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText, Plus, Search, Edit, Trash, Globe } from "lucide-react";

export default async function AdminPagesModule() {
  const pages = await db.staticPage.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pages"
        description="Manage static pages, landing pages, and policies."
        action={{ label: "Create Page" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Quick Stats */}
        <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-card border p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Pages</p>
              <p className="text-3xl font-heading mt-1">{pages.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-card border p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Published</p>
              <p className="text-3xl font-heading mt-1">{pages.filter(p => p.published).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-600">
              <Globe className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Data Table Area */}
        <div className="md:col-span-4 bg-card border rounded-xl overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between gap-4 bg-secondary/20">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search pages..."
                className="w-full pl-9 pr-4 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Slug</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Created</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      No pages found. Create your first static page.
                    </td>
                  </tr>
                ) : (
                  pages.map((page: any) => (
                    <tr key={page.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 font-medium">{page.title}</td>
                      <td className="px-6 py-4 text-muted-foreground">/{page.slug}</td>
                      <td className="px-6 py-4">
                        <Badge variant={page.published ? "default" : "secondary"} className={page.published ? "bg-green-100 text-green-800 border-green-200" : ""}>
                          {page.published ? "Published" : "Draft"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(page.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 flex items-center justify-end gap-3">
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
    </div>
  );
}
