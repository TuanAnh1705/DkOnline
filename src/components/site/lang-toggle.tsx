"use client";

import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, useTr, type Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "vi", label: "VI" },
  { value: "en", label: "EN" },
];

/** Chuyển ngôn ngữ toàn site — nhãn tĩnh đổi ngay, nội dung CSDL được dịch máy. */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const tr = useTr();

  return (
    <div
      data-no-print
      role="group"
      aria-label={tr("Chọn ngôn ngữ", "Choose language")}
      className={cn(
        "flex items-center gap-0.5 rounded-lg border border-line bg-white/70 p-0.5",
        className,
      )}
    >
      <Languages className="ml-1 size-3.5 shrink-0 text-ink/40" aria-hidden />
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setLang(o.value)}
          aria-pressed={lang === o.value}
          title={o.value === "vi" ? "Tiếng Việt" : "English"}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-black transition",
            lang === o.value ? "bg-brand-600 text-white" : "text-ink/60 hover:bg-brand-50",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
