import { PageHeader } from "@/components/admin/PageHeader";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import { ProductsClient } from "./ProductsClient";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Products" 
        description="Manage your furniture inventory, pricing, and stock."
        action={{
          label: "Add Product",
          href: "/admin/products/create",
          icon: <Plus className="h-4 w-4" />
        }}
      />

      <ProductsClient products={products} />
    </div>
  );
}
