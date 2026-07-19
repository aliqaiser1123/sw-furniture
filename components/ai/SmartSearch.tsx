"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mic, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

// Extend window for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function SmartSearch({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US"; // Can be dynamic based on user locale

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      // Auto submit after voice
      setTimeout(() => {
        router.push(`/search?q=${encodeURIComponent(transcript.trim())}`);
      }, 500);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search for furniture..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 pr-12 rounded-full bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:bg-background transition-all"
      />
      
      <div className="absolute right-2 flex items-center gap-1">
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={() => setQuery("")}
              className="p-1.5 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
        
        <button
          type="button"
          onClick={isListening ? () => setIsListening(false) : startListening}
          className={`p-1.5 rounded-full transition-colors ${
            isListening ? "bg-red-500/10 text-red-500 animate-pulse" : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Voice Search"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
