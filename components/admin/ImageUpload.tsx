"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUpload({ value, onChange, folder = "emj-consulting", label = "Image" }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Fichier non valide. Veuillez choisir une image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image trop lourde (max 10 Mo).");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur upload");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur upload");
    } finally {
      setUploading(false);
    }
  }, [folder, onChange]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }, [upload]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1.5">{label}</label>

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 group">
          <div className="relative w-full h-48">
            <Image
              src={value}
              alt="Aperçu"
              fill
              className="object-cover"
              sizes="600px"
            />
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Changer
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 h-48 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragging
              ? "border-[#D4AF37] bg-[#D4AF37]/5"
              : "border-gray-200 dark:border-white/10 hover:border-[#D4AF37]/50 hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
              <p className="text-sm text-gray-500 dark:text-white/40">Envoi en cours...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-400 dark:text-white/40" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 dark:text-white/70">
                  Glissez une image ici
                </p>
                <p className="text-xs text-gray-400 dark:text-white/30 mt-1">
                  ou cliquez pour parcourir · JPG, PNG, WebP · max 10 Mo
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }}
      />
    </div>
  );
}
