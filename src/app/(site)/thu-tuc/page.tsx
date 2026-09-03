import type { Metadata } from "next";
import { getPublishedProcedures, getCategories } from "@/lib/queries";
import { PageHero } from "@/components/site/page-hero";
import { SearchProcedures } from "@/components/site/search-procedures";
import type { ProcedureCardData } from "@/types";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Danh sách thủ tục",
  description:
    "Tra cứu và tìm kiếm hướng dẫn nộp hồ sơ cho các thủ tục dịch vụ công trực tuyến.",
};

export default async function AllProceduresPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  let procedures: Awaited<ReturnType<typeof getPublishedProcedures>> = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  try {
    [procedures, categories] = await Promise.all([
      getPublishedProcedures(),
      getCategories(),
    ]);
  } catch (e) {
    console.error(e);
  }

  const cards = procedures as unknown as ProcedureCardData[];

  return (
    <>
      <PageHero
        eyebrow={{
          vi: `${procedures.length} thủ tục`,
          en: `${procedures.length} procedures`,
        }}
        title={{ vi: "Danh sách thủ tục", en: "All procedures" }}
        desc={{
          vi: "Chọn thủ tục bạn cần để xem hướng dẫn chi tiết từng bước bằng hình ảnh và video.",
          en: "Pick the procedure you need to see a detailed step-by-step guide with photos and video.",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <SearchProcedures
          procedures={cards}
          categories={categories.map((c) => ({
            id: c.id,
            name: c.name,
            icon: c.icon,
          }))}
          initialQuery={q ?? ""}
        />
      </div>
    </>
  );
}
