import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ListChecks,
  PlayCircle,
} from "lucide-react";
import { getProcedureBySlug, getPublishedProcedureSlugs } from "@/lib/queries";
import { StepsTimeline } from "@/components/site/steps-timeline";
import { VideoPlayer } from "@/components/site/video-player";
import { Badge } from "@/components/ui/badge";
import { buttonClass } from "@/components/ui/button";
import { CategoryIcon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import type { StepData } from "@/types";

export const revalidate = 120;

export async function generateStaticParams() {
  try {
    const slugs = await getPublishedProcedureSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProcedureBySlug(slug);
  if (!p) return { title: "Không tìm thấy thủ tục" };
  return {
    title: p.title,
    description: p.summary ?? "Hướng dẫn nộp hồ sơ trực tuyến từng bước.",
  };
}

export default async function ProcedureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const procedure = await getProcedureBySlug(slug);
  if (!procedure) notFound();

  const steps = procedure.steps as StepData[];

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-400/15 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <Link
            href="/#thu-tuc"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-brand-600"
          >
            <ArrowLeft className="size-4" /> Tất cả thủ tục
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {procedure.category && (
              <Badge tone="brand">
                <CategoryIcon
                  name={procedure.category.icon}
                  className="size-3.5"
                />
                {procedure.category.name}
              </Badge>
            )}
            <Badge tone="slate">
              <ListChecks className="size-3.5" />
              {steps.length} bước
            </Badge>
            {procedure.videoUrl && (
              <Badge tone="accent">
                <PlayCircle className="size-3.5" /> Có video
              </Badge>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {procedure.title}
          </h1>
          {procedure.summary && (
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
              {procedure.summary}
            </p>
          )}

          {procedure.registrationUrl && (
            <a
              href={procedure.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className={`mt-6 ${buttonClass("primary", "lg")}`}
            >
              Nộp hồ sơ trên Cổng DVC
              <ExternalLink className="size-5" />
            </a>
          )}
        </div>
      </section>

      {/* Nội dung */}
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        {steps.length > 0 ? (
          <StepsTimeline steps={steps} />
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            Thủ tục này đang được cập nhật nội dung hướng dẫn.
          </p>
        )}

        {/* Video hướng dẫn */}
        {procedure.videoUrl && (
          <div className="mt-16 scroll-mt-20" id="video">
            <Reveal>
              <div className="mb-4 flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-xl bg-accent-500/10 text-accent-600">
                  <PlayCircle className="size-5" />
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Video hướng dẫn
                </h2>
              </div>
              <VideoPlayer
                src={procedure.videoUrl}
                poster={procedure.thumbnailUrl}
              />
            </Reveal>
          </div>
        )}

        {/* CTA cuối */}
        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-8 text-white shadow-2xl shadow-brand-700/30 sm:p-12">
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Sẵn sàng nộp hồ sơ?
              </h2>
              <p className="mt-2 max-w-xl text-brand-100">
                Sau khi đã xem hết hướng dẫn, bấm nút bên dưới để chuyển tới
                trang đăng ký hồ sơ trực tuyến tương ứng.
              </p>
              <div className="mt-6">
                {procedure.registrationUrl ? (
                  <a
                    href={procedure.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-brand-700 shadow-lg transition hover:bg-brand-50 active:scale-[.98]"
                  >
                    Nộp hồ sơ ngay
                    <ArrowRight className="size-5" />
                  </a>
                ) : (
                  <span className="text-sm text-brand-100">
                    Chưa cấu hình link đăng ký cho thủ tục này.
                  </span>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
