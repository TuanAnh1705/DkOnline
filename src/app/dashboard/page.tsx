import {
  FileStack,
  FolderTree,
  Globe2,
  PencilRuler,
} from "lucide-react";
import { getAllProcedures, getCategories, getDashboardStats } from "@/lib/queries";
import { ProceduresBoard } from "@/components/dashboard/procedures-board";
import type { ProcedureCardData } from "@/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [procedures, categories, stats] = await Promise.all([
    getAllProcedures(),
    getCategories(),
    getDashboardStats(),
  ]);

  const cards = procedures as unknown as ProcedureCardData[];

  return (
    <div className="mx-auto max-w-6xl">
      {/* Thống kê */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={FileStack}
          label="Tổng thủ tục"
          value={stats.total}
          tone="brand"
        />
        <StatCard
          icon={Globe2}
          label="Đang công khai"
          value={stats.published}
          tone="green"
        />
        <StatCard
          icon={PencilRuler}
          label="Bản nháp"
          value={stats.draft}
          tone="amber"
        />
        <StatCard
          icon={FolderTree}
          label="Danh mục"
          value={stats.categories}
          tone="accent"
        />
      </div>

      <div className="mt-8">
        <ProceduresBoard procedures={cards} categories={categories} />
      </div>
    </div>
  );
}

const toneMap = {
  brand: "bg-brand-50 text-brand-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  accent: "bg-orange-50 text-accent-600",
} as const;

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  tone: keyof typeof toneMap;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className={`grid size-10 place-items-center rounded-xl ${toneMap[tone]}`}>
          <Icon className="size-5" />
        </span>
        <span className="text-3xl font-extrabold text-slate-900">{value}</span>
      </div>
      <p className="mt-3 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}
