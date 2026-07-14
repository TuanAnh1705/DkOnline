"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  ProcedureFormDialog,
  type CategoryOption,
} from "./procedure-form-dialog";
import type { ProcedureDetailData } from "@/types";

export function ProcedureDetailActions({
  procedure,
  categories,
}: {
  procedure: ProcedureDetailData;
  categories: CategoryOption[];
}) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function del() {
    setBusy(true);
    try {
      await fetch(`/api/procedures/${procedure.id}`, { method: "DELETE" });
      router.push("/dashboard");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={() => setEditOpen(true)}>
          <Pencil className="size-4" /> Sửa
        </Button>
        <Button variant="danger" onClick={() => setDelOpen(true)}>
          <Trash2 className="size-4" /> Xoá
        </Button>
      </div>

      {editOpen && (
        <ProcedureFormDialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          categories={categories}
          initial={procedure}
          onSaved={() => router.refresh()}
        />
      )}

      <Dialog
        open={delOpen}
        onClose={() => setDelOpen(false)}
        size="md"
        title="Xoá thủ tục?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDelOpen(false)} disabled={busy}>
              Huỷ
            </Button>
            <Button variant="danger" onClick={del} loading={busy}>
              Xoá
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Xoá vĩnh viễn{" "}
          <span className="font-semibold text-slate-900">{procedure.title}</span>{" "}
          cùng toàn bộ các bước?
        </p>
      </Dialog>
    </>
  );
}
