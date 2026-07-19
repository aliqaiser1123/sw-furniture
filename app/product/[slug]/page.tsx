import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Share2, Shield, Truck } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await db.product.findUnique({ where: { slug: resolvedParams.slug } });
  
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: product.seoTitle || `${product.name} | Shesham Wood Furniture`,
    description: product.metaDescription || product.shortDescription || `Buy ${product.name} online.`,
    keywords: product.focusKeyword ? [product.focusKeyword] : [],
    openGraph: {
      images: product.featuredImage ? [product.featuredImage] : [],
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await db.product.findUnique({
    where: { slug: resolvedParams.slug, status: "PUBLISHED" },
    include: {
      category: true,
      images: { orderBy: { displayOrder: 'asc' } }
    }
  });

  if (!product) notFound();

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.featuredImage ? [product.featuredImage] : [],
    description: product.metaDescription || product.shortDescription,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      url: `https://sheshamwood.com/product/${product.slug}`,
      priceCurrency: "PKR",
      price: product.salePrice || product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-default py-8 md:py-16">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <ChevronRight className="h-4 w-4" />
          {product.category && (
            <>
              <Link href={`/shop?category=${product.category.slug}`} className="hover:text-foreground">
                {product.category.name}
              </Link>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery Placeholder (In a real app, this would be a client component with thumbnails) */}
          <div className="space-y-4">
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-secondary/30 rounded-2xl overflow-hidden">
              {product.featuredImage ? (
                <Image src={product.featuredImage} alt={product.name} fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image available</div>
              )}
            </div>
            {product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img) => (
                  <div key={img.id} className="relative aspect-square bg-secondary/30 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all">
                    <Image src={img.imageUrl} alt={img.altText || product.name} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-heading mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>SKU: {product.sku}</span>
                {product.stock > 0 ? (
                  <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" /> In Stock
                  </span>
                ) : (
                  <span className="text-destructive font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-3 mb-4">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-bold">Rs. {product.salePrice.toLocaleString()}</span>
                    <span className="text-xl text-muted-foreground line-through mb-1">Rs. {product.price.toLocaleString()}</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold">Rs. {product.price.toLocaleString()}</span>
                )}
              </div>
              {product.shortDescription && (
                <p className="text-muted-foreground leading-relaxed">{product.shortDescription}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-10">
              <Button size="lg" className="flex-1 text-base h-14" disabled={product.stock <= 0}>
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button size="icon" variant="outline" className="h-14 w-14 shrink-0">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="h-14 w-14 shrink-0">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Specs */}
            <div className="grid sm:grid-cols-2 gap-4 pt-8 border-t">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <h4 className="font-medium text-sm">Lifetime Warranty</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">On solid wood structure</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <h4 className="font-medium text-sm">Free Delivery</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">In Lahore & Islamabad</p>
                </div>
              </div>
            </div>

            {/* Full Description & Specs Tabs (Simplified for now) */}
            <div className="mt-12 space-y-6">
              <div>
                <h3 className="text-lg font-heading border-b pb-2 mb-4">Description</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                  {product.description || "No detailed description available."}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                {product.material && (
                  <div className="flex flex-col gap-1 border-b pb-2">
                    <span className="text-muted-foreground">Material</span>
                    <span className="font-medium">{product.material}</span>
                  </div>
                )}
                {product.finish && (
                  <div className="flex flex-col gap-1 border-b pb-2">
                    <span className="text-muted-foreground">Finish</span>
                    <span className="font-medium">{product.finish}</span>
                  </div>
                )}
                {(product.length || product.width || product.height) && (
                  <div className="flex flex-col gap-1 border-b pb-2">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span className="font-medium">
                      {product.length || "-"} x {product.width || "-"} x {product.height || "-"} cm
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
