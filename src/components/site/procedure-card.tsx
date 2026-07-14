import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { ProcedureCardData } from "@/types";

export function ProcedureCard({ procedure }: { procedure: ProcedureCardData }) {
  return (
    <Link
      href={`/thu-tuc/${procedure.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/10"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        {procedure.thumbnailUrl ? (
          <>
            <Image
              src={procedure.thumbnailUrl}
              alt={procedure.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 via-brand-50 to-slate-50">
            <span className="px-6 text-center text-base font-bold text-brand-300">
              {procedure.category?.name ?? "Thủ tục"}
            </span>
          </div>
        )}

        {procedure.category && (
          <span className="absolute left-3 top-3">
            <Badge tone="brand">{procedure.category.name}</Badge>
          </span>
        )}
        {procedure.videoUrl && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900/70 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
            <span className="grid size-3.5 place-items-center rounded-full bg-white/90 text-[7px] text-slate-900">
              ▶
            </span>
            Video
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold leading-snug text-slate-900 transition group-hover:text-brand-700">
          {procedure.title}
        </h3>
        {procedure.summary && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {procedure.summary}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-semibold text-slate-500">
            {procedure._count.steps > 0
              ? `${procedure._count.steps} bước hướng dẫn`
              : "Đang cập nhật"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-transform duration-300 group-hover:translate-x-1">
            Xem
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
