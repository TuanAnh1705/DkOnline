import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  ListChecks,
  PlayCircle,
} from "lucide-react";
import { getProcedureById, getCategories } from "@/lib/queries";
import { Badge } from "@/components/ui/badge";
import { CategoryIcon } from "@/components/icon";
import { ProcedureDetailActions } from "@/components/dashboard/procedure-detail-actions";
import type { ProcedureDetailData } from "@/types";

export const dynamic = "force-dynamic";

export default async function DashboardProcedureDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [procedure, categories] = await Promise.all([
    getProcedureById(id),
    getCategories(),
  ]);
  if (!procedure) notFound();

  const detail = procedure as unknown as ProcedureDetailData;

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-brand-600"
      >
        <ArrowLeft className="size-4" /> Về danh sách
      </Link>

      <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={detail.status === "PUBLISHED" ? "green" : "amber"}>
              {detail.status === "PUBLISHED" ? "Công khai" : "Bản nháp"}
            </Badge>
            {detail.category && (
              <Badge tone="brand">
                <CategoryIcon name={detail.category.icon} className="size-3.5" />
                {detail.category.name}
              </Badge>
            )}
            <Badge tone="slate">
              <ListChecks className="size-3.5" /> {detail.steps.length} bước
            </Badge>
          </div>
          <h1 className="mt-3 text-2xl font-extrabold text-slate-900">
            {detail.title}
          </h1>
          {detail.summary && (
            <p className="mt-2 max-w-xl text-slate-600">{detail.summary}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link
              href={`/thu-tuc/${detail.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:underline"
            >
              Xem trang người dùng <ExternalLink className="size-3.5" />
            </Link>
            {detail.registrationUrl && (
              <a
                href={detail.registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:underline"
              >
                Link đăng ký <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        </div>
        <ProcedureDetailActions procedure={detail} categories={categories} />
      </div>

      {/* Các bước */}
      <div className="mt-6 space-y-4">
        {detail.steps.map((step, i) => (
          <div
            key={step.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="flex gap-3 p-5">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                {step.title && (
                  <h3 className="font-bold text-slate-900">{step.title}</h3>
                )}
                <p className="step-content mt-1 text-[15px] leading-relaxed text-slate-600">
                  {step.content}
                </p>
              </div>
            </div>
            {step.imageUrl && (
              <div className="relative aspect-video w-full border-t border-slate-100 bg-slate-50">
                <Image
                  src={step.imageUrl}
                  alt={step.title || `Bước ${i + 1}`}
                  fill
                  sizes="800px"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Video */}
      {detail.videoUrl && (
        <div className="mt-6">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
            <PlayCircle className="size-4 text-accent-600" /> Video hướng dẫn
          </div>
          <video
            src={detail.videoUrl}
            controls
            className="aspect-video w-full rounded-2xl border border-slate-200 bg-black"
          />
        </div>
      )}
    </div>
  );
}
