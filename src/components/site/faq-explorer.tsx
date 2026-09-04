"use client";

import { useMemo, useState } from "react";
import {
  FileText,
  IdCard,
  LayoutGrid,
  PackageCheck,
  Search,
  Send,
  ShieldCheck,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, useTr } from "@/lib/i18n";
import type { FaqCategory } from "@/lib/faq";
import { FaqAccordion, type FaqItem } from "@/components/site/faq-accordion";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  IdCard,
  Wallet,
  FileText,
  Send,
  PackageCheck,
  ShieldCheck,
};

export function FaqExplorer({
  items,
  categories,
}: {
  items: FaqItem[];
  categories: FaqCategory[];
}) {
  const tr = useTr();
  const { lang } = useLang();
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (active !== "all" && item.category !== active) return false;
      if (!q) return true;
      const question = item.q[lang].toLowerCase();
      const answer = item.a[lang].toLowerCase();
      return question.includes(q) || answer.includes(q);
    });
  }, [items, active, query, lang]);

  const countLabel = tr(
    `${filtered.length} câu hỏi phù hợp`,
    `${filtered.length} matching question${filtered.length === 1 ? "" : "s"}`,
  );

  return (
    <div>
      {/* Ô tìm kiếm */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-ink/35" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tr("Tìm câu hỏi, ví dụ: phí, VNeID, kết quả…", "Search, e.g. fee, VNeID, result…")}
          className="w-full rounded-2xl border border-line bg-white py-3.5 pl-11 pr-11 text-[15px] text-ink shadow-sm transition placeholder:text-ink/35 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label={tr("Xoá tìm kiếm", "Clear search")}
            className="absolute right-3.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink/40 transition hover:bg-parchment hover:text-ink"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Chip lọc theo nhóm */}
      <div className="mt-4 flex flex-wrap gap-2">
        <CategoryChip
          active={active === "all"}
          onClick={() => setActive("all")}
          icon={<LayoutGrid className="size-3.5" />}
          label={tr("Tất cả", "All")}
        />
        {categories.map((c) => {
          const Icon = ICONS[c.icon];
          return (
            <CategoryChip
              key={c.slug}
              active={active === c.slug}
              onClick={() => setActive(c.slug)}
              icon={Icon ? <Icon className="size-3.5" /> : undefined}
              label={tr(c.label)}
            />
          );
        })}
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink/40">
        {countLabel}
      </p>

      <div className="mt-3">
        {filtered.length > 0 ? (
          <FaqAccordion key={`${active}:${query}`} items={filtered} />
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-white/60 px-6 py-12 text-center">
            <p className="font-semibold text-ink">
              {tr("Không tìm thấy câu hỏi phù hợp", "No matching questions found")}
            </p>
            <p className="mt-1.5 text-sm text-ink/55">
              {tr(
                "Thử từ khoá khác, hoặc gửi câu hỏi qua trang Liên hệ.",
                "Try a different search term, or send your question through the Contact page.",
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition",
        active
          ? "bg-brand-600 text-white shadow-sm shadow-brand-700/25 ring-1 ring-inset ring-accent-400/40"
          : "bg-white text-ink/65 ring-1 ring-inset ring-line hover:bg-brand-50 hover:text-brand-700",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
