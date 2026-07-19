"use client";

import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  initialImages?: string[];
  maxImages?: number;
}

export function ImageUpload({ initialImages = [], maxImages = 5 }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(initialImages);

  const handleRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Mock upload for now until Cloudinary API is hooked up
  const handleMockUpload = () => {
    if (images.length < maxImages) {
      setImages([...images, `https://picsum.photos/seed/${Math.random()}/800/800`]);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        onClick={handleMockUpload}
        className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer"
      >
        <div className="p-3 bg-background rounded-full shadow-sm">
          <UploadCloud className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded-md overflow-hidden border">
              <Image src={url} alt="Uploaded" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  size="icon" 
                  variant="destructive" 
                  className="h-8 w-8" 
                  onClick={() => handleRemove(i)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {i === 0 && (
                <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-medium">
                  Featured
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
