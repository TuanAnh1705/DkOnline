"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  FolderPlus,
  Link2,
  Plus,
  Trash2,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/field";
import { MediaUpload } from "./media-upload";
import type { ProcedureDetailData } from "@/types";

export interface CategoryOption {
  id: string;
  name: string;
}

interface StepState {
  key: string;
  title: string;
  content: string;
  imageUrl: string | null;
}

const uid = () => Math.random().toString(36).slice(2, 9);

function emptyStep(): StepState {
  return { key: uid(), title: "", content: "", imageUrl: null };
}

export function ProcedureFormDialog({
  open,
  onClose,
  categories: initialCategories,
  initial,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  categories: CategoryOption[];
  initial?: ProcedureDetailData | null;
  onSaved: () => void;
}) {
  const editing = Boolean(initial);
  const [categories, setCategories] = useState(initialCategories);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [categoryId, setCategoryId] = useState(initial?.category?.id ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(
    initial?.status ?? "PUBLISHED",
  );
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    initial?.thumbnailUrl ?? null,
  );
  const [videoUrl, setVideoUrl] = useState<string | null>(
    initial?.videoUrl ?? null,
  );
  const [registrationUrl, setRegistrationUrl] = useState(
    initial?.registrationUrl ?? "",
  );
  const [steps, setSteps] = useState<StepState[]>(
    initial?.steps.length
      ? initial.steps.map((s) => ({
          key: uid(),
          title: s.title ?? "",
          content: s.content,
          imageUrl: s.imageUrl,
        }))
      : [emptyStep()],
  );

  const [newCatOpen, setNewCatOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function updateStep(key: string, patch: Partial<StepState>) {
    setSteps((prev) => prev.map((s) => (s.key === key ? { ...s, ...patch } : s)));
  }
  function removeStep(key: string) {
    setSteps((prev) => (prev.length > 1 ? prev.filter((s) => s.key !== key) : prev));
  }
  function moveStep(index: number, dir: -1 | 1) {
    setSteps((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function createCategory() {
    const name = newCatName.trim();
    if (!name) return;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      const { category } = await res.json();
      setCategories((prev) => [...prev, { id: category.id, name: category.name }]);
      setCategoryId(category.id);
      setNewCatName("");
      setNewCatOpen(false);
    }
  }

  async function onSubmit() {
    setError(null);
    if (!title.trim()) return setError("Vui lòng nhập tên thủ tục");
    const cleanSteps = steps
      .map((s) => ({
        title: s.title.trim() || null,
        content: s.content.trim(),
        imageUrl: s.imageUrl || null,
      }))
      .filter((s) => s.content.length > 0);
    if (cleanSteps.length === 0)
      return setError("Cần ít nhất 1 bước có nội dung");

    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        summary: summary.trim() || null,
        categoryId: categoryId || null,
        thumbnailUrl: thumbnailUrl || null,
        videoUrl: videoUrl || null,
        registrationUrl: registrationUrl.trim() || null,
        status,
        steps: cleanSteps,
      };
      const res = await fetch(
        editing ? `/api/procedures/${initial!.id}` : "/api/procedures",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Lưu thất bại");
        return;
      }
      onSaved();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="xl"
      title={editing ? "Chỉnh sửa thủ tục" : "Đăng tải hồ sơ hướng dẫn"}
      description="Điền thông tin, các bước hướng dẫn kèm ảnh, video và link đăng ký."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Huỷ
          </Button>
          <Button onClick={onSubmit} loading={saving}>
            {editing ? "Lưu thay đổi" : "Đăng tải"}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Thông tin chung */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label required>Tên thủ tục</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Đăng ký kết hôn"
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Mô tả ngắn</Label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Giới thiệu ngắn gọn về thủ tục này…"
              className="min-h-16"
            />
          </div>

          <div>
            <Label>Danh mục</Label>
            <div className="flex gap-2">
              <Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">— Chưa phân loại —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setNewCatOpen((v) => !v)}
                className="shrink-0"
              >
                <FolderPlus className="size-4" />
              </Button>
            </div>
            <AnimatePresence>
              {newCatOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 flex gap-2 overflow-hidden"
                >
                  <Input
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Tên danh mục mới"
                  />
                  <Button type="button" size="sm" onClick={createCategory} className="shrink-0">
                    Tạo
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <Label>Trạng thái</Label>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}
            >
              <option value="PUBLISHED">Công khai</option>
              <option value="DRAFT">Bản nháp</option>
            </Select>
          </div>

          <div>
            <Label>Ảnh đại diện</Label>
            <MediaUpload
              endpoint="imageUploader"
              kind="image"
              value={thumbnailUrl}
              onChange={setThumbnailUrl}
              compact
            />
          </div>
          <div>
            <Label>Video hướng dẫn</Label>
            <MediaUpload
              endpoint="videoUploader"
              kind="video"
              value={videoUrl}
              onChange={setVideoUrl}
              compact
            />
          </div>

          <div className="sm:col-span-2">
            <Label>Link đăng ký hồ sơ</Label>
            <div className="relative">
              <Link2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={registrationUrl}
                onChange={(e) => setRegistrationUrl(e.target.value)}
                placeholder="https://dichvucong.gov.vn/..."
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Các bước */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Các bước hướng dẫn ({steps.length})
            </h3>
          </div>
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {steps.map((step, i) => (
                <motion.div
                  key={step.key}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-lg bg-brand-600 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1 space-y-3">
                      <Input
                        value={step.title}
                        onChange={(e) => updateStep(step.key, { title: e.target.value })}
                        placeholder="Tiêu đề bước (không bắt buộc)"
                        className="bg-white"
                      />
                      <Textarea
                        value={step.content}
                        onChange={(e) =>
                          updateStep(step.key, { content: e.target.value })
                        }
                        placeholder="Mô tả thao tác của bước này…"
                        className="min-h-20 bg-white"
                      />
                      <MediaUpload
                        endpoint="imageUploader"
                        kind="image"
                        value={step.imageUrl}
                        onChange={(url) => updateStep(step.key, { imageUrl: url })}
                        compact
                      />
                    </div>
                    <div className="flex shrink-0 flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => moveStep(i, -1)}
                        disabled={i === 0}
                        className="rounded-md p-1 text-slate-400 hover:bg-white hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowUp className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStep(i, 1)}
                        disabled={i === steps.length - 1}
                        className="rounded-md p-1 text-slate-400 hover:bg-white hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowDown className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeStep(step.key)}
                        disabled={steps.length === 1}
                        className="rounded-md p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setSteps((prev) => [...prev, emptyStep()])}
            className="mt-3 w-full border-dashed"
          >
            <Plus className="size-4" /> Thêm bước
          </Button>
        </div>

        {error && (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">
            {error}
          </p>
        )}
      </div>
    </Dialog>
  );
}
