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
        eyebrow={`${procedures.length} thủ tục`}
        title="Danh sách thủ tục"
        desc="Chọn thủ tục bạn cần để xem hướng dẫn chi tiết từng bước bằng hình ảnh và video."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
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
