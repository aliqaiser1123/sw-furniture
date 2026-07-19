"use client";

import { useState } from "react";
import { Check, X, ArrowRightLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CompareProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  material: string;
  dimensions: string;
  warranty: string;
}

// Global state mock for compare (In a real app, use Zustand like cart store)
let compareItems: CompareProduct[] = [];
let setGlobalCompareItems: any = null;

export const addToCompare = (product: CompareProduct) => {
  if (compareItems.length < 3 && !compareItems.find(p => p.id === product.id)) {
    compareItems = [...compareItems, product];
    if (setGlobalCompareItems) setGlobalCompareItems(compareItems);
  }
};

export function CompareProducts() {
  const [items, setItems] = useState<CompareProduct[]>(compareItems);
  const [isOpen, setIsOpen] = useState(false);

  // Bind global state setter
  setGlobalCompareItems = setItems;

  const removeItem = (id: string) => {
    compareItems = compareItems.filter(p => p.id !== id);
    setItems(compareItems);
    if (compareItems.length === 0) setIsOpen(false);
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Floating Compare Dock */}
      <AnimatePresence>
        {!isOpen && items.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 bg-background border border-border rounded-t-2xl shadow-2xl p-4 flex items-center gap-6"
          >
            <div className="flex -space-x-4">
              {items.map((item, i) => (
                <div key={item.id} className="w-12 h-12 rounded-full border-2 border-background overflow-hidden relative z-[3-i]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-sm font-medium">
              {items.length} item{items.length > 1 ? "s" : ""} to compare
            </div>
            <Button onClick={() => setIsOpen(true)} className="rounded-full shadow-lg">
              Compare Now <ArrowRightLeft className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-5xl bg-background border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-2xl font-heading flex items-center gap-2">
                  <ArrowRightLeft className="w-6 h-6" /> Product Comparison
                </h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-auto">
                <div className="min-w-[800px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="w-1/4 p-4 align-bottom text-muted-foreground font-medium">Specs</th>
                        {items.map(item => (
                          <th key={item.id} className="w-1/4 p-4 relative">
                            <button onClick={() => removeItem(item.id)} className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-destructive bg-background rounded-full border border-border shadow-sm">
                              <X className="w-3 h-3" />
                            </button>
                            <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-xl mb-4" />
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-primary font-medium mt-1">Rs. {item.price.toLocaleString()}</p>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="p-4 font-medium text-muted-foreground">Material</td>
                        {items.map(item => <td key={item.id} className="p-4">{item.material}</td>)}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-muted-foreground">Dimensions</td>
                        {items.map(item => <td key={item.id} className="p-4">{item.dimensions}</td>)}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-muted-foreground">Warranty</td>
                        {items.map(item => <td key={item.id} className="p-4">{item.warranty}</td>)}
                      </tr>
                      <tr>
                        <td className="p-4"></td>
                        {items.map(item => (
                          <td key={item.id} className="p-4">
                            <Button className="w-full rounded-full">Add to Cart</Button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
