import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { procedureInputSchema } from "@/lib/validation";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const procedure = await prisma.procedure.findUnique({
    where: { id },
    include: { category: true, steps: { orderBy: { order: "asc" } } },
  });
  if (!procedure) {
    return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
  }
  return NextResponse.json({ procedure });
}

export async function PUT(req: Request, ctx: Ctx) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  const parsed = procedureInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dữ liệu không hợp lệ", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const existing = await prisma.procedure.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
  }

  // Thay toàn bộ các bước: xoá cũ, tạo lại theo thứ tự mới
  const procedure = await prisma.$transaction(async (tx) => {
    await tx.step.deleteMany({ where: { procedureId: id } });
    return tx.procedure.update({
      where: { id },
      data: {
        title: data.title,
        summary: data.summary || null,
        categoryId: data.categoryId || null,
        thumbnailUrl: data.thumbnailUrl || null,
        videoUrl: data.videoUrl || null,
        registrationUrl: data.registrationUrl || null,
        status: data.status,
        steps: {
          create: data.steps.map((s, idx) => ({
            order: idx,
            title: s.title || null,
            content: s.content,
            imageUrl: s.imageUrl || null,
          })),
        },
      },
      include: { steps: true, category: true },
    });
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath(`/thu-tuc/${procedure.slug}`);
  return NextResponse.json({ procedure });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const existing = await prisma.procedure.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
  }
  await prisma.procedure.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard");
  return NextResponse.json({ ok: true });
}
