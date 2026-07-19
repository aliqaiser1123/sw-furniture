"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const POPULAR_SEARCHES = [
  "Sheesham Bed",
  "Dining Table",
  "Sofa Set",
  "TV Unit",
  "Wardrobe",
  "Coffee Table",
];

const RECENT_SEARCHES = ["Bedroom Set", "Office Chair"];

interface SearchBoxProps {
  className?: string;
  onClose?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
}

export function SearchBox({
  className,
  onClose,
  autoFocus,
  placeholder = "Search for furniture…",
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <label htmlFor="search-input" className="sr-only">Search furniture</label>
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <Input
          id="search-input"
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="pl-9 pr-9 h-11 bg-background border-border/60 text-sm focus-visible:ring-primary"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="search-dropdown"
          role="combobox"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          id="search-dropdown"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-xl shadow-lg z-50 overflow-hidden"
        >
          {!query && RECENT_SEARCHES.length > 0 && (
            <div className="p-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                <Clock className="w-3 h-3" aria-hidden="true" />
                Recent Searches
              </p>
              {RECENT_SEARCHES.map((s) => (
                <button
                  key={s}
                  role="option"
                  aria-selected="false"
                  onClick={() => { setQuery(s); }}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-secondary text-foreground transition-colors focus-brand"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="p-3 border-t border-border/40">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" aria-hidden="true" />
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2 px-1">
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); }}
                    className="px-3 py-1.5 text-xs rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors focus-brand"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && (
            <div className="p-3">
              <p className="text-sm text-muted-foreground px-3 py-2">
                Press Enter to search for <strong className="text-foreground">&ldquo;{query}&rdquo;</strong>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
