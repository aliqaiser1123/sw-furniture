import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const page = await db.staticPage.findUnique({ where: { slug: resolvedParams.slug } });
  
  if (!page || !page.published) return { title: "Page Not Found" };
  
  return {
    title: page.seoTitle || `${page.title} | Shesham Wood Furniture`,
    description: page.metaDescription,
  };
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const page = await db.staticPage.findUnique({
    where: { slug: resolvedParams.slug, published: true }
  });

  if (!page) notFound();

  return (
    <div className="container-default py-16 md:py-24 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-heading mb-12 text-center">{page.title}</h1>
      
      {/* 
        In a real production environment, 'page.content' would be sanitized HTML from a rich text editor.
        For this scaffold, we'll render it safely using a prose wrapper.
      */}
      <div 
        className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground
          prose-headings:text-foreground prose-headings:font-heading prose-a:text-primary hover:prose-a:text-accent transition-colors"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
