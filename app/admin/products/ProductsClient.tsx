"use client";

import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function ProductsClient({ products }: { products: any[] }) {
  return (
    <DataTable 
      data={products}
      columns={[
        {
          header: "Product",
          cell: (product) => (
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                {product.featuredImage ? (
                  <Image src={product.featuredImage} alt={product.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-secondary" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{product.name}</span>
                <span className="text-xs text-muted-foreground">{product.sku}</span>
              </div>
            </div>
          )
        },
        {
          header: "Status",
          cell: (product) => (
            <Badge variant={product.published ? "default" : "secondary"}>
              {product.status}
            </Badge>
          )
        },
        {
          header: "Stock",
          cell: (product) => (
            <div className="flex items-center gap-2">
              <span className={product.stock <= product.lowStockLimit ? "text-destructive font-medium" : ""}>
                {product.stock}
              </span>
              {product.stock <= product.lowStockLimit && (
                <Badge variant="destructive" className="text-[10px] h-4 px-1">Low</Badge>
              )}
            </div>
          )
        },
        {
          header: "Price",
          cell: (product) => (
            <div className="flex flex-col">
              {product.salePrice ? (
                <>
                  <span className="text-sm font-medium">Rs. {product.salePrice}</span>
                  <span className="text-xs text-muted-foreground line-through">Rs. {product.price}</span>
                </>
              ) : (
                <span className="text-sm font-medium">Rs. {product.price}</span>
              )}
            </div>
          )
        }
      ]}
    />
  );
}
