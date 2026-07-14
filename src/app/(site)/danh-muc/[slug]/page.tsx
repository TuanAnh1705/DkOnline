import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getPublishedCategorySlugs,
} from "@/lib/queries";
import { PageHero } from "@/components/site/page-hero";
import { ProcedureCard } from "@/components/site/procedure-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { ProcedureCardData } from "@/types";

export const revalidate = 120;

export async function generateStaticParams() {
  try {
    const cats = await getPublishedCategorySlugs();
    return cats.map((c) => ({ slug: c.slug }));
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
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Không tìm thấy lĩnh vực" };
  return { title: cat.name, description: cat.description ?? undefined };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const cards = category.procedures as unknown as ProcedureCardData[];

  return (
    <>
      <PageHero
        eyebrow="Lĩnh vực"
        title={category.name}
        desc={category.description ?? "Các thủ tục thuộc lĩnh vực này."}
      >
        <Link
          href="/thu-tuc"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
        >
          ← Tất cả thủ tục
        </Link>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {cards.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center text-slate-500">
            Lĩnh vực này chưa có thủ tục nào.
          </div>
        ) : (
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((p) => (
              <StaggerItem key={p.id} className="h-full">
                <ProcedureCard procedure={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </>
  );
}
