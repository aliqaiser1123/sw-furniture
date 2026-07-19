import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { contextIds, limit = 4 } = await req.json();

    // In a real AI setup, we would send contextIds (recently viewed / cart items)
    // to an embeddings DB or a recommendation model (e.g. Personalize) 
    // to get dynamically ranked results.

    // Mock logic: return products from the same categories as context items,
    // fallback to featured products if no context.

    let recommendedProducts: Awaited<ReturnType<typeof db.product.findMany>> = [];

    if (contextIds && contextIds.length > 0) {
      // Find categories of context items
      const contextItems = await db.product.findMany({
        where: { id: { in: contextIds } },
        select: { categoryId: true },
      });

      const categoryIds = [...new Set(contextItems.map(c => c.categoryId))].filter((id): id is string => id !== null);

      recommendedProducts = await db.product.findMany({
        where: { 
          categoryId: { in: categoryIds },
          id: { notIn: contextIds }, // don't recommend what they already have
          status: "PUBLISHED"
        },
        take: limit,
      });
    }

    // Fill remaining slots with featured products
    if (recommendedProducts.length < limit) {
      const fillAmount = limit - recommendedProducts.length;
      const featured = await db.product.findMany({
        where: { 
          featured: true, 
          status: "PUBLISHED",
          id: { notIn: [...(contextIds || []), ...recommendedProducts.map(p => p.id)] }
        },
        take: fillAmount,
      });
      recommendedProducts = [...recommendedProducts, ...featured];
    }

    return NextResponse.json({ success: true, recommendations: recommendedProducts });

  } catch (error) {
    console.error("[AI Recommendations Error]", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}
