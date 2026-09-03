"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTr } from "@/lib/i18n";

type Scale = "base" | "md" | "lg";

const OPTIONS: { value: Scale; label: string }[] = [
  { value: "base", label: "A" },
  { value: "md", label: "A+" },
  { value: "lg", label: "A++" },
];

const STORAGE_KEY = "nophso:font-scale";

/** Nút chỉnh cỡ chữ toàn site — hữu ích cho người lớn tuổi/mắt kém, nhớ lựa chọn qua localStorage */
export function FontSizeControl({ className }: { className?: string }) {
  const [scale, setScale] = useState<Scale>("base");
  const tr = useTr();

  useEffect(() => {
    const saved = document.documentElement.dataset.fontScale as Scale | undefined;
    if (saved === "md" || saved === "lg") setScale(saved);
  }, []);

  function apply(next: Scale) {
    setScale(next);
    if (next === "base") {
      delete document.documentElement.dataset.fontScale;
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      document.documentElement.dataset.fontScale = next;
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }

  return (
    <div
      data-no-print
      role="group"
      aria-label={tr("Chỉnh cỡ chữ", "Adjust text size")}
      className={cn(
        "flex items-center gap-0.5 rounded-lg border border-line bg-white/70 p-0.5",
        className,
      )}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => apply(o.value)}
          aria-pressed={scale === o.value}
          title={tr(`Cỡ chữ ${o.label}`, `Text size ${o.label}`)}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-black transition",
            scale === o.value
              ? "bg-brand-600 text-white"
              : "text-ink/60 hover:bg-brand-50",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
