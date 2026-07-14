import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CategoryCardData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  _count: { procedures: number };
}

export function CategoryCard({
  category,
  index = 0,
}: {
  category: CategoryCardData;
  index?: number;
}) {
  return (
    <Link
      href={`/danh-muc/${category.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/10"
    >
      {/* dải vàng thếp chạy khi hover */}
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent-500 via-accent-400 to-brand-500 transition-transform duration-500 group-hover:scale-x-100" />
      {/* số thứ tự lớn mờ (đỏ sơn) */}
      <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-8xl font-bold leading-none text-brand-600 opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.13]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent-600">
        <span className="size-1.5 rounded-full bg-accent-500" />
        Lĩnh vực
      </span>
      <h3 className="mt-3 font-display text-xl font-semibold text-ink">{category.name}</h3>
      {category.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/55">
          {category.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="text-sm font-semibold text-ink/50">
          {category._count.procedures} thủ tục
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-transform duration-300 group-hover:translate-x-1">
          Xem lĩnh vực
          <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
