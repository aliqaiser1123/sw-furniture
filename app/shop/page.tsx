import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader"; // Reusing style for now, or build a shop header
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export const metadata = {
  title: "Shop All Furniture | Shesham Wood",
  description: "Browse our premium collection of solid wood furniture.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const category = typeof resolvedParams.category === "string" ? resolvedParams.category : undefined;
  
  const products = await db.product.findMany({
    where: {
      status: "PUBLISHED",
      ...(category && {
        category: {
          slug: category
        }
      })
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
        <h1 className="text-4xl md:text-5xl font-heading mb-4">Shop Collection</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our handcrafted furniture, designed to bring timeless elegance to your home.
        </p>
      </div>

      {/* Basic Filters placeholder */}
      <div className="flex flex-wrap gap-4 mb-10 justify-center">
        <Link href="/shop" className={`px-4 py-2 rounded-full border ${!category ? 'bg-primary text-white' : 'bg-transparent text-foreground'}`}>All</Link>
        <Link href="/shop?category=beds" className={`px-4 py-2 rounded-full border ${category === 'beds' ? 'bg-primary text-white' : 'bg-transparent text-foreground'}`}>Beds</Link>
        <Link href="/shop?category=sofas" className={`px-4 py-2 rounded-full border ${category === 'sofas' ? 'bg-primary text-white' : 'bg-transparent text-foreground'}`}>Sofas</Link>
        <Link href="/shop?category=dining" className={`px-4 py-2 rounded-full border ${category === 'dining' ? 'bg-primary text-white' : 'bg-transparent text-foreground'}`}>Dining</Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No products found in this category.
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
