"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Maximize2, Minimize2, Move3D, Sun } from "lucide-react";

interface Product3DViewerProps {
  modelUrl: string;
  productName: string;
  posterUrl?: string;
}

export function Product3DViewer({ modelUrl, productName, posterUrl }: Product3DViewerProps) {
  const viewerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [arSupported, setArSupported] = useState(false);

  useEffect(() => {
    // Dynamically import model-viewer script (client-side only)
    if (!document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;

    const handleLoad = () => {
      setIsLoaded(true);
      // Check AR support
      setArSupported(!!(el as any).canActivateAR);
    };

    el.addEventListener("load", handleLoad);
    return () => el.removeEventListener("load", handleLoad);
  }, []);

  const handleReset = () => {
    const el = viewerRef.current as any;
    if (el) el.resetTurntableRotation?.();
  };

  const toggleFullscreen = () => {
    const container = document.getElementById("model-viewer-container");
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const toggleRotate = () => {
    const el = viewerRef.current as any;
    if (!el) return;
    const newState = !autoRotate;
    el.setAttribute("auto-rotate", newState ? "" : undefined);
    if (!newState) el.removeAttribute("auto-rotate");
    setAutoRotate(newState);
  };

  return (
    <div
      id="model-viewer-container"
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#F5EFE7] to-[#EDE0D0] border border-[#D9CABA]"
      style={{ minHeight: "400px" }}
    >
      {/* Loading State */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-b from-[#F5EFE7] to-[#EDE0D0]"
          >
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-[#D9CABA] animate-ping opacity-30" />
              <div className="absolute inset-2 rounded-full border-4 border-t-[#3E2410] border-[#D9CABA] animate-spin" />
              <Move3D className="absolute inset-0 m-auto w-8 h-8 text-[#3E2410]" />
            </div>
            <p className="text-[#7C5C45] text-sm font-semibold tracking-widest uppercase">Loading 3D Model</p>
            <p className="text-[#7C5C45]/60 text-xs mt-1">Preparing interactive view…</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* model-viewer element */}
      {/* @ts-ignore */}
      <model-viewer
        ref={viewerRef}
        src={modelUrl}
        alt={`3D model of ${productName}`}
        poster={posterUrl || ""}
        shadow-intensity="1.2"
        camera-controls=""
        auto-rotate={autoRotate ? "" : undefined}
        auto-rotate-delay="1000"
        rotation-per-second="30deg"
        environment-image="neutral"
        exposure="0.85"
        ar={arSupported ? "" : undefined}
        ar-modes="webxr scene-viewer quick-look"
        loading="eager"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "400px",
          backgroundColor: "transparent",
        }}
      />

      {/* Controls Bar */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-[#D9CABA]/50"
          >
            <button
              onClick={handleReset}
              title="Reset view"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#7C5C45] hover:bg-[#3E2410] hover:text-white transition-all"
            >
              <RotateCcw size={16} />
            </button>
            <div className="w-px h-5 bg-[#D9CABA]" />
            <button
              onClick={toggleRotate}
              title={autoRotate ? "Stop rotation" : "Auto rotate"}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${autoRotate ? "bg-[#3E2410] text-white" : "text-[#7C5C45] hover:bg-[#3E2410] hover:text-white"}`}
            >
              <Sun size={16} />
            </button>
            <div className="w-px h-5 bg-[#D9CABA]" />
            <button
              onClick={toggleFullscreen}
              title="Toggle fullscreen"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#7C5C45] hover:bg-[#3E2410] hover:text-white transition-all"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AR Badge */}
      {arSupported && isLoaded && (
        <div className="absolute top-4 right-4 bg-[#3E2410] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md">
          AR Ready
        </div>
      )}

      {/* Drag hint */}
      {isLoaded && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-[10px] font-semibold text-[#7C5C45] tracking-wider">
          <Move3D size={12} />
          DRAG TO ROTATE
        </div>
      )}
    </div>
  );
}
