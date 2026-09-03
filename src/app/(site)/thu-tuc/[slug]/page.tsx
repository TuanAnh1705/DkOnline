import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProcedureBySlug, getPublishedProcedureSlugs } from "@/lib/queries";
import { ProcedureContent } from "@/components/site/procedure-content";
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
    <ProcedureContent
      slug={slug}
      title={procedure.title}
      summary={procedure.summary}
      registrationUrl={procedure.registrationUrl}
      videoUrl={procedure.videoUrl}
      thumbnailUrl={procedure.thumbnailUrl}
      category={procedure.category}
      steps={steps}
    />
  );
}
