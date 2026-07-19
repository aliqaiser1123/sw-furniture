import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export const metadata = {
  title: "Search Results | Shesham Wood Furniture",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  
  if (!q) {
    return (
      <div className="container-default py-20 text-center">
        <h1 className="text-3xl font-heading mb-4">Search</h1>
        <p className="text-muted-foreground">Please enter a search term to find products.</p>
      </div>
    );
  }

  const products = await db.product.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { sku: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { category: { name: { contains: q, mode: "insensitive" } } },
        { collection: { name: { contains: q, mode: "insensitive" } } },
      ]
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="container-default py-16">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-heading mb-4">Search Results</h1>
        <p className="text-muted-foreground">
          Found {products.length} {products.length === 1 ? 'result' : 'results'} for "{q}"
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border">
          <p className="text-muted-foreground mb-6">We couldn't find any products matching your search.</p>
          <Link href="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary/30 mb-4">
                {product.featuredImage ? (
                  <Image
                    src={product.featuredImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                )}
                
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-accent hover:bg-white transition-colors opacity-0 group-hover:opacity-100 z-10 shadow-sm">
                  <Heart className="w-4 h-4" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <button className="w-full bg-white/95 backdrop-blur-sm text-foreground py-3.5 rounded-lg font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-1">
                  {product.category?.name || "Uncategorized"}
                </div>
                <Link href={`/product/${product.slug}`} className="block group-hover:text-primary transition-colors">
                  <h3 className="font-heading text-lg mb-1">{product.name}</h3>
                </Link>
                <div className="font-medium text-foreground">
                  {product.salePrice ? (
                    <div className="flex gap-2 items-center">
                      <span>Rs. {product.salePrice}</span>
                      <span className="text-sm text-muted-foreground line-through">Rs. {product.price}</span>
                    </div>
                  ) : (
                    <span>Rs. {product.price}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
