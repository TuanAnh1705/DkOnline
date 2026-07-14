import Link from "next/link";

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
  const color = category.color || "#2563eb";
  return (
    <Link
      href={`/danh-muc/${category.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/10"
    >
      {/* dải màu chạy khi hover */}
      <span
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: color }}
      />
      {/* số thứ tự lớn mờ */}
      <span
        className="pointer-events-none absolute -right-2 -top-4 select-none text-8xl font-black leading-none opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12]"
        style={{ color }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className="text-xs font-bold uppercase tracking-[0.16em]"
        style={{ color }}
      >
        Lĩnh vực
      </span>
      <h3 className="mt-3 text-xl font-bold text-slate-900">{category.name}</h3>
      {category.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {category.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="text-sm font-semibold text-slate-500">
          {category._count.procedures} thủ tục
        </span>
        <span
          className="inline-flex items-center gap-1 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1"
          style={{ color }}
        >
          Xem lĩnh vực
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
