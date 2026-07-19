"use client";

import { useState } from "react";
import { UploadCloud, Wand2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RoomDesignerUI() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [style, setStyle] = useState("Modern Minimalist");
  const [budget, setBudget] = useState("Premium");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
      setResultImage(null);
    }
  };

  const handleGenerate = async () => {
    if (!file) return;
    setIsGenerating(true);

    // Mock API delay for AI Image generation (e.g., Stable Diffusion / Midjourney API)
    setTimeout(() => {
      // Mock generated result
      setResultImage("https://picsum.photos/seed/roomgen/800/600");
      setIsGenerating(false);
    }, 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Sidebar Controls */}
      <div className="lg:col-span-4 space-y-8 bg-muted/30 p-6 sm:p-8 rounded-3xl border border-border">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">1. Upload Room Photo</h3>
          <div className="relative border-2 border-dashed border-border hover:border-primary transition-colors rounded-xl p-8 text-center bg-background">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <UploadCloud className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium">Click or drag image</p>
            <p className="text-xs text-muted-foreground mt-1">JPEG, PNG up to 10MB</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">2. Design Style</h3>
          <select 
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-3 rounded-xl bg-background border border-border focus:ring-1 focus:ring-ring text-sm"
          >
            <option>Modern Minimalist</option>
            <option>Traditional Pakistani</option>
            <option>Contemporary</option>
            <option>Rustic Vintage</option>
            <option>Bohemian</option>
          </select>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">3. Budget Tier</h3>
          <select 
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-3 rounded-xl bg-background border border-border focus:ring-1 focus:ring-ring text-sm"
          >
            <option>Standard</option>
            <option>Premium</option>
            <option>Luxury Hand-Carved</option>
          </select>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={!file || isGenerating}
          className="w-full py-6 rounded-xl text-base shadow-xl"
        >
          {isGenerating ? (
            <><RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Generating Design...</>
          ) : (
            <><Wand2 className="w-5 h-5 mr-2" /> Redesign My Room</>
          )}
        </Button>
      </div>

      {/* Main Preview Area */}
      <div className="lg:col-span-8">
        <div className="w-full h-[500px] sm:h-[600px] rounded-3xl bg-muted/20 border border-border overflow-hidden relative flex items-center justify-center">
          {!preview && !resultImage && (
            <div className="text-center text-muted-foreground px-4">
              <Wand2 className="w-16 h-16 mx-auto opacity-20 mb-4" />
              <p>Upload a photo and configure settings to see the magic.</p>
            </div>
          )}

          {preview && !resultImage && (
            <img src={preview} alt="Original Room" className="w-full h-full object-cover" />
          )}

          {isGenerating && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
              <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="font-medium text-lg">Analyzing spatial depth...</p>
              <p className="text-sm text-muted-foreground mt-2">Placing Sheesham furniture...</p>
            </div>
          )}

          {resultImage && !isGenerating && (
            <div className="relative w-full h-full">
              <img src={resultImage} alt="Redesigned Room" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
                AI Generated Concept
              </div>
            </div>
          )}
        </div>

        {resultImage && (
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Furniture Featured in this Design</h3>
            <p className="text-sm text-muted-foreground">
              We detected places where the following catalog items would fit perfectly.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Mock items detected */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-muted/30 p-3 rounded-xl border border-border">
                  <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                    <img src={`https://picsum.photos/seed/furn${i}/400`} alt="Furniture" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xs font-medium line-clamp-1">Sheesham Bed {i}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Rs. 125,000</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
