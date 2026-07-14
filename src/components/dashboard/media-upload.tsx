"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Video, X } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

type Endpoint = "imageUploader" | "videoUploader";

interface MediaUploadProps {
  endpoint: Endpoint;
  value?: string | null;
  onChange: (url: string | null) => void;
  kind: "image" | "video";
  className?: string;
  compact?: boolean;
}

export function MediaUpload({
  endpoint,
  value,
  onChange,
  kind,
  className,
  compact,
}: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onUploadProgress: setProgress,
    onUploadError: (e) => setError(e.message),
  });

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setProgress(0);
    try {
      const res = await startUpload([file]);
      const url =
        res?.[0]?.serverData?.url ??
        (res?.[0] as { ufsUrl?: string } | undefined)?.ufsUrl ??
        null;
      if (url) onChange(url);
      else setError("Upload thất bại");
    } catch {
      setError("Upload thất bại (kiểm tra UPLOADTHING_TOKEN)");
    }
  }

  const accept = kind === "image" ? "image/*" : "video/*";

  if (value) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50", className)}>
        {kind === "image" ? (
          <div className="relative aspect-video w-full">
            <Image src={value} alt="preview" fill sizes="400px" className="object-contain" />
          </div>
        ) : (
          <video src={value} controls className="aspect-video w-full bg-black" />
        )}
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute right-2 top-2 grid size-7 place-items-center rounded-lg bg-slate-900/70 text-white transition hover:bg-rose-600"
          aria-label="Xoá"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 text-slate-500 transition hover:border-brand-400 hover:bg-brand-50/40 hover:text-brand-600 disabled:opacity-70",
          compact ? "py-4" : "py-8",
        )}
      >
        {isUploading ? (
          <>
            <Loader2 className="size-6 animate-spin text-brand-500" />
            <span className="text-xs font-semibold">Đang tải lên… {progress}%</span>
          </>
        ) : (
          <>
            {kind === "image" ? (
              <ImagePlus className="size-6" />
            ) : (
              <Video className="size-6" />
            )}
            <span className="text-xs font-semibold">
              {kind === "image" ? "Chọn ảnh" : "Chọn video"}
            </span>
          </>
        )}
      </button>
      {error && <p className="mt-1.5 text-xs font-medium text-rose-500">{error}</p>}
    </div>
  );
}
