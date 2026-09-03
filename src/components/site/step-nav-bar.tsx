"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useTr } from "@/lib/i18n";

export function StepNavBar({
  current,
  total,
  onPrev,
  onNext,
  onReset,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}) {
  const tr = useTr();

  return (
    <div
      data-no-print
      className="glass fixed inset-x-0 bottom-0 z-40 border-t border-accent-500/20 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-1 px-2 py-2 sm:gap-2 sm:px-6 sm:py-2.5">
        <button
          type="button"
          onClick={onPrev}
          disabled={current === 0}
          aria-label={tr("Bước trước", "Previous step")}
          className="flex min-h-11 items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-semibold text-ink/70 transition hover:bg-brand-50 disabled:opacity-30 disabled:hover:bg-transparent sm:px-3"
        >
          <ChevronLeft className="size-5 sm:size-4" />
          <span className="hidden sm:inline">{tr("Bước trước", "Previous")}</span>
        </button>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="whitespace-nowrap text-sm font-bold text-ink">
            {tr(`Bước ${current + 1}/${total}`, `Step ${current + 1}/${total}`)}
          </span>
          <button
            type="button"
            onClick={onReset}
            aria-label={tr("Xem lại từ đầu", "Start over")}
            className="flex min-h-9 items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-ink/50 transition hover:bg-brand-50 hover:text-brand-700"
          >
            <RotateCcw className="size-4 sm:size-3.5" />
            <span className="hidden sm:inline">{tr("Xem lại từ đầu", "Start over")}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={current === total - 1}
          aria-label={tr("Bước tiếp", "Next step")}
          className="flex min-h-11 items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-semibold text-ink/70 transition hover:bg-brand-50 disabled:opacity-30 disabled:hover:bg-transparent sm:px-3"
        >
          <span className="hidden sm:inline">{tr("Bước tiếp", "Next")}</span>
          <ChevronRight className="size-5 sm:size-4" />
        </button>
      </div>
    </div>
  );
}
