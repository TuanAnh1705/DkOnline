"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Eye,
  ImageIcon,
  ListChecks,
  Pencil,
  PlayCircle,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { CategoryIcon } from "@/components/icon";
import { cn } from "@/lib/utils";
import {
  ProcedureFormDialog,
  type CategoryOption,
} from "./procedure-form-dialog";
import type { ProcedureCardData, ProcedureDetailData } from "@/types";

const UNCAT = "__uncat__";

export function ProceduresBoard({
  procedures,
  categories,
}: {
  procedures: ProcedureCardData[];
  categories: (CategoryOption & { icon?: string | null; _count?: { procedures: number } })[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ProcedureDetailData | null>(null);
  const [deleting, setDeleting] = useState<ProcedureCardData | null>(null);
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    return procedures.filter((p) => {
      const matchQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        (p.summary ?? "").toLowerCase().includes(query.toLowerCase());
      const matchCat =
        filter === "all" ||
        (filter === UNCAT && !p.category) ||
        p.category?.id === filter;
      return matchQuery && matchCat;
    });
  }, [procedures, query, filter]);

  async function openEdit(id: string) {
    const res = await fetch(`/api/procedures/${id}`);
    if (!res.ok) return;
    const { procedure } = await res.json();
    setEditing(procedure as ProcedureDetailData);
    setFormOpen(true);
  }

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  async function confirmDelete() {
    if (!deleting) return;
    setBusy(true);
    try {
      await fetch(`/api/procedures/${deleting.id}`, { method: "DELETE" });
      setDeleting(null);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {/* Thanh công cụ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm thủ tục…"
            className="pl-10"
          />
        </div>
        <Button onClick={openCreate} size="md">
          <Plus className="size-4" /> Upload hồ sơ
        </Button>
      </div>

      {/* Bộ lọc danh mục (phân loại) */}
      <div className="mt-4 flex flex-wrap gap-2">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          Tất cả ({procedures.length})
        </FilterChip>
        {categories.map((c) => {
          const count = procedures.filter((p) => p.category?.id === c.id).length;
          return (
            <FilterChip
              key={c.id}
              active={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              <CategoryIcon name={c.icon} className="size-3.5" />
              {c.name} ({count})
            </FilterChip>
          );
        })}
        <FilterChip active={filter === UNCAT} onClick={() => setFilter(UNCAT)}>
          Chưa phân loại (
          {procedures.filter((p) => !p.category).length})
        </FilterChip>
      </div>

      {/* Danh sách */}
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center">
          <p className="font-semibold text-slate-700">Không có thủ tục nào</p>
          <p className="mt-1 text-sm text-slate-500">
            Bấm “Upload hồ sơ” để thêm hướng dẫn mới.
          </p>
        </div>
      ) : (
        <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[16/9] bg-slate-100">
                  {p.thumbnailUrl ? (
                    <Image
                      src={p.thumbnailUrl}
                      alt={p.title}
                      fill
                      sizes="360px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-50 to-slate-50">
                      <CategoryIcon name={p.category?.icon} className="size-8 text-brand-300" />
                    </div>
                  )}
                  <span className="absolute right-2 top-2">
                    <Badge tone={p.status === "PUBLISHED" ? "green" : "amber"}>
                      {p.status === "PUBLISHED" ? "Công khai" : "Nháp"}
                    </Badge>
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {p.category && (
                      <Badge tone="brand">
                        <CategoryIcon name={p.category.icon} className="size-3" />
                        {p.category.name}
                      </Badge>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <ListChecks className="size-3.5" /> {p._count.steps}
                    </span>
                    {p.videoUrl && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600">
                        <PlayCircle className="size-3.5" /> video
                      </span>
                    )}
                    {!p.thumbnailUrl && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <ImageIcon className="size-3.5" />
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 line-clamp-2 font-bold text-slate-900">
                    {p.title}
                  </h3>

                  <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3">
                    <Link
                      href={`/dashboard/procedures/${p.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                    >
                      <Eye className="size-4" /> Chi tiết
                    </Link>
                    <button
                      onClick={() => openEdit(p.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
                    >
                      <Pencil className="size-4" /> Sửa
                    </button>
                    <button
                      onClick={() => setDeleting(p)}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Dialog tạo/sửa */}
      {formOpen && (
        <ProcedureFormDialog
          open={formOpen}
          onClose={() => setFormOpen(false)}
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          initial={editing}
          onSaved={() => router.refresh()}
        />
      )}

      {/* Xác nhận xoá */}
      <Dialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        size="md"
        title="Xoá thủ tục?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleting(null)} disabled={busy}>
              Huỷ
            </Button>
            <Button variant="danger" onClick={confirmDelete} loading={busy}>
              Xoá
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Bạn có chắc muốn xoá{" "}
          <span className="font-semibold text-slate-900">{deleting?.title}</span>?
          Toàn bộ các bước hướng dẫn sẽ bị xoá và không thể khôi phục.
        </p>
      </Dialog>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
        active
          ? "bg-brand-600 text-white shadow-sm shadow-brand-600/30"
          : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  );
}
