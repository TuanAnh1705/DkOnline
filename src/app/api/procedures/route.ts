import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { procedureInputSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";

export async function GET() {
  const procedures = await prisma.procedure.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: {
      category: true,
      _count: { select: { steps: true } },
    },
  });
  return NextResponse.json({ procedures });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const parsed = procedureInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dữ liệu không hợp lệ", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const base = slugify(data.title) || "thu-tuc";
  let slug = base;
  let i = 1;
  while (await prisma.procedure.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }

  const procedure = await prisma.procedure.create({
    data: {
      title: data.title,
      slug,
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

  revalidatePath("/");
  revalidatePath("/dashboard");
  return NextResponse.json({ procedure }, { status: 201 });
}
