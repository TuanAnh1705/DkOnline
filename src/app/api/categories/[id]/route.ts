import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, ctx: Ctx) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
  }

  // Các thủ tục thuộc danh mục này chuyển về "Chưa phân loại" thay vì bị xoá theo.
  await prisma.$transaction([
    prisma.procedure.updateMany({ where: { categoryId: id }, data: { categoryId: null } }),
    prisma.category.delete({ where: { id } }),
  ]);

  revalidatePath("/");
  revalidatePath("/dashboard");
  return NextResponse.json({ ok: true });
}
