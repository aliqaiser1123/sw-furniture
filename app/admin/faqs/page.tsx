import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash, MoveVertical } from "lucide-react";

export default async function AdminFAQsModule() {
  const faqs = await db.fAQ.findMany({
    orderBy: { displayOrder: "asc" },
    include: { category: true }
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="FAQ Management" 
        description="Manage Frequently Asked Questions across the store." 
        action={{ label: "Add FAQ" }}
      />
      <div className="flex justify-end gap-2 mb-6 -mt-4">
        <Button variant="outline">Categories</Button>
      </div>
      
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between gap-4 bg-secondary/20">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search questions..." 
              className="w-full pl-9 pr-4 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b">
              <tr>
                <th className="px-4 py-4 w-12 text-center"></th>
                <th className="px-6 py-4 font-medium">Question</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No FAQs configured. Help your customers by adding some.
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-secondary/20 transition-colors group">
                    <td className="px-4 py-4 text-center">
                      <MoveVertical className="w-4 h-4 text-muted-foreground/50 cursor-grab mx-auto hover:text-foreground" />
                    </td>
                    <td className="px-6 py-4 font-medium max-w-md truncate">
                      {faq.question}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {faq.category?.name || "General"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={faq.active ? "default" : "secondary"} className={faq.active ? "bg-green-100 text-green-800 border-green-200" : ""}>
                        {faq.active ? "Active" : "Hidden"}
                      </Badge>
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
  );
}
