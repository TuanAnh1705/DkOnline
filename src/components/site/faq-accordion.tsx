"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTr, type Bi } from "@/lib/i18n";

export interface FaqItem {
  q: Bi;
  a: Bi;
  /** Slug nhóm — dùng để lọc trong FaqExplorer, không bắt buộc. */
  category?: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const tr = useTr();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white transition-colors",
              isOpen ? "border-brand-200 shadow-sm" : "border-slate-200/80",
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5"
              aria-expanded={isOpen}
            >
              <span className="font-bold text-slate-900">{tr(item.q)}</span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-brand-600 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="step-content px-4 pb-5 text-[15px] leading-relaxed text-slate-600 sm:px-5">
                    {tr(item.a)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
