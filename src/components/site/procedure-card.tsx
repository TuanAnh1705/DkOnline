"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTr } from "@/lib/i18n";
import { useTranslated } from "@/lib/use-translated";
import type { ProcedureCardData } from "@/types";

export function ProcedureCard({ procedure }: { procedure: ProcedureCardData }) {
  const tr = useTr();
  const title = useTranslated(procedure.title);
  const summary = useTranslated(procedure.summary);
  const categoryName = useTranslated(procedure.category?.name ?? null);

  return (
    <Link
      href={`/thu-tuc/${procedure.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/10"
    >
      {/* chỉ vàng thếp chạy khi hover */}
      <span className="rule-gold absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />

      <div className="relative aspect-[16/9] overflow-hidden bg-parchment">
        {procedure.thumbnailUrl ? (
          <>
            <Image
              src={procedure.thumbnailUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 via-parchment to-white">
            <span className="px-6 text-center font-display text-base font-semibold text-brand-300">
              {categoryName ?? tr("Thủ tục", "Procedure")}
            </span>
          </div>
        )}

        {procedure.category && (
          <span className="absolute left-3 top-3">
            <Badge tone="brand">{categoryName}</Badge>
          </span>
        )}
        {procedure.videoUrl && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-brand-700/85 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
            <span className="grid size-3.5 place-items-center rounded-full bg-accent-400 text-brand-900">
              <Play className="size-2 fill-current" />
            </span>
            Video
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-base font-semibold leading-snug text-ink transition group-hover:text-brand-700">
          {title}
        </h3>
        {summary && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/55">
            {summary}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-4">
          <span className="text-xs font-semibold text-ink/50">
            {procedure._count.steps > 0
              ? tr(
                  `${procedure._count.steps} bước hướng dẫn`,
                  `${procedure._count.steps} guided steps`,
                )
              : tr("Đang cập nhật", "Coming soon")}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 transition-transform duration-300 group-hover:translate-x-1">
            {tr("Xem", "View")}
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
