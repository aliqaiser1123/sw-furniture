"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SEOFieldsProps {
  title?: string;
  description?: string;
  keyword?: string;
}

export function SEOFields({ title = "", description = "", keyword = "" }: SEOFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="seoTitle">SEO Title</Label>
        <Input 
          id="seoTitle" 
          name="seoTitle" 
          defaultValue={title}
          placeholder="Optimal length 50-60 characters" 
        />
        <p className="text-[11px] text-muted-foreground text-right">{title.length} / 60</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea 
          id="metaDescription" 
          name="metaDescription" 
          defaultValue={description}
          placeholder="Optimal length 150-160 characters" 
          className="h-20"
        />
        <p className="text-[11px] text-muted-foreground text-right">{description.length} / 160</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="focusKeyword">Focus Keyword</Label>
        <Input 
          id="focusKeyword" 
          name="focusKeyword" 
          defaultValue={keyword}
          placeholder="e.g., solid wood dining table" 
        />
      </div>

      {/* Google Search Preview Mock */}
      <div className="mt-6 p-4 border rounded-md bg-secondary/30">
        <h4 className="text-sm font-semibold mb-3">Google Search Preview</h4>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-primary/20" />
            https://sheshamwood.com &gt; products &gt; {keyword.toLowerCase().replace(/\s+/g, '-')}
          </div>
          <div className="text-[#1a0dab] dark:text-[#8ab4f8] text-lg cursor-pointer hover:underline">
            {title || "Product Title - Shesham Wood Furniture"}
          </div>
          <div className="text-sm text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2">
            {description || "Discover premium quality solid wood furniture. Handcrafted to perfection."}
          </div>
        </div>
      </div>
    </div>
  );
}
