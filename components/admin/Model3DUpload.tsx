"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, CheckCircle, Box, FileWarning } from "lucide-react";

interface Model3DUploadProps {
  onUpload: (url: string, fileName: string, fileSize: number) => void;
  currentModelUrl?: string;
  onRemove?: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Model3DUpload({ onUpload, currentModelUrl, onRemove }: Model3DUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED = [".glb", ".gltf"];
  const MAX_SIZE_MB = 100;

  const handleFile = async (file: File) => {
    setError(null);
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED.includes(ext)) {
      setError("Only .glb and .gltf files are accepted.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File must be under ${MAX_SIZE_MB}MB. Yours is ${formatFileSize(file.size)}.`);
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload-model", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onUpload(data.url, file.name, file.size);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-4">
      {/* Current Model Preview */}
      <AnimatePresence>
        {currentModelUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-xl border-2 border-[#3E2410] bg-gradient-to-b from-[#F5EFE7] to-[#EDE0D0] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3E2410] flex items-center justify-center">
                  <Box className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2C1A0E]">3D Model Uploaded</p>
                  <p className="text-xs text-[#7C5C45] truncate max-w-[200px]">{currentModelUrl}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                {onRemove && (
                  <button
                    onClick={onRemove}
                    className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Embedded live preview */}
            <div className="h-64 px-4 pb-4">
              {!document.querySelector('script[src*="model-viewer"]') && (
                <script
                  type="module"
                  src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
                />
              )}
              {/* @ts-ignore */}
              <model-viewer
                src={currentModelUrl}
                alt="3D model preview"
                camera-controls=""
                auto-rotate=""
                style={{ width: "100%", height: "100%", borderRadius: "12px" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drop Zone */}
      {!currentModelUrl && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 text-center
            ${isDragging
              ? "border-[#3E2410] bg-[#F5EFE7] scale-[1.01]"
              : "border-[#D9CABA] hover:border-[#3E2410] hover:bg-[#F5EFE7]/50 bg-white"
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,.gltf"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-12 h-12 text-[#3E2410] animate-spin" />
              <p className="text-sm font-semibold text-[#3E2410]">Uploading 3D model…</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-[#3E2410]/10 flex items-center justify-center mb-4">
                <Box className="w-8 h-8 text-[#3E2410]" />
              </div>
              <p className="font-bold text-[#2C1A0E] mb-1">Drop your 3D model here</p>
              <p className="text-sm text-[#7C5C45] mb-4">or click to browse files</p>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-[#3E2410]/10 text-[#3E2410] font-bold px-3 py-1 rounded-full">.GLB</span>
                <span className="text-xs bg-[#3E2410]/10 text-[#3E2410] font-bold px-3 py-1 rounded-full">.GLTF</span>
                <span className="text-xs text-[#7C5C45]">Max 100MB</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
          >
            <FileWarning size={16} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
