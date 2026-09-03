"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { ProcedureCard } from "./procedure-card";
import { cn } from "@/lib/utils";
import { useTr } from "@/lib/i18n";
import { useTranslated } from "@/lib/use-translated";
import type { ProcedureCardData } from "@/types";

interface Cat {
  id: string;
  name: string;
  icon: string | null;
}

export function SearchProcedures({
  procedures,
  categories,
  initialQuery = "",
}: {
  procedures: ProcedureCardData[];
  categories: Cat[];
  initialQuery?: string;
}) {
  const tr = useTr();
  const [query, setQuery] = useState(initialQuery);
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return procedures.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.summary ?? "").toLowerCase().includes(q);
      const matchC = cat === "all" || p.category?.id === cat;
      return matchQ && matchC;
    });
  }, [procedures, query, cat]);

  return (
    <div>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr(
              "Tìm thủ tục theo tên, ví dụ: kết hôn, khai sinh…",
              "Search by name, e.g. marriage, birth registration…",
            )}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-3.5 pl-12 pr-11 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/15"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label={tr("Xoá từ khoá", "Clear search")}
              className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 w-full text-xs font-bold uppercase tracking-[0.14em] text-slate-400 sm:w-auto">
            {tr("Lĩnh vực", "Category")}
          </span>
          <Chip active={cat === "all"} onClick={() => setCat("all")}>
            {tr("Tất cả", "All")}
          </Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              <CategoryName name={c.name} />
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {tr("Tìm thấy", "Found")}{" "}
        <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
        {tr("thủ tục", filtered.length === 1 ? "procedure" : "procedures")}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center sm:p-14">
          <p className="font-semibold text-slate-700">
            {tr("Không có kết quả phù hợp", "No matching results")}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {tr(
              "Thử từ khóa khác hoặc chọn lĩnh vực “Tất cả”.",
              "Try another keyword, or pick the “All” category.",
            )}
          </p>
        </div>
      ) : (
        <motion.div layout className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <ProcedureCard procedure={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

/** Tên lĩnh vực lấy từ CSDL — dịch máy khi xem tiếng Anh. */
function CategoryName({ name }: { name: string }) {
  return <>{useTranslated(name)}</>;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
        active
          ? "bg-brand-600 text-white shadow-sm shadow-brand-600/30"
          : "bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100",
      )}
    >
      {children}
    </button>
  );
}
