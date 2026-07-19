"use client";

import { useState, useCallback } from "react";
import { UploadCloud, Image as ImageIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function VisualSearch() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      handleFile(droppedFile);
    }
  }, []);

  const handleFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      
      const res = await fetch("/api/ai/visual-search", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      if (data.success) {
        setResults(data.results);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
          isDragging ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"
        } ${preview ? "border-solid bg-muted/20 p-6" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {preview ? (
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <img src={preview} alt="Upload preview" className="w-40 h-40 object-cover rounded-xl shadow-md" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">Analyzing image...</h3>
              <p className="text-sm text-muted-foreground mt-1">Our AI is finding visually similar Sheesham wood furniture.</p>
              {isLoading && <Loader2 className="w-6 h-6 animate-spin mt-4 text-primary" />}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Drag & drop an image here</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Upload an inspiration photo (JPEG, PNG, WEBP) to find visually similar products from our catalog.
              </p>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {results.length > 0 && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-heading flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
              Similar Products Found
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {results.map((product) => (
                <a key={product.id} href={`/product/${product.slug}`} className="group block">
                  <div className="aspect-square relative overflow-hidden rounded-xl bg-muted">
                    <img 
                      src={product.featuredImage || "https://picsum.photos/seed/placeholder/600"} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-3">
                    <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">Rs. {product.price.toLocaleString()}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
