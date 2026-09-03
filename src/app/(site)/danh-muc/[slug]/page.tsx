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
import { T } from "@/lib/i18n";
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
        eyebrow={{ vi: "Lĩnh vực", en: "Category" }}
        title={category.name}
        desc={category.description ?? undefined}
      >
        <Link
          href="/thu-tuc"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
        >
          ← <T vi="Tất cả thủ tục" en="All procedures" />
        </Link>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {cards.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 sm:p-14">
            <T
              vi="Lĩnh vực này chưa có thủ tục nào."
              en="There are no procedures in this category yet."
            />
          </div>
        ) : (
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
