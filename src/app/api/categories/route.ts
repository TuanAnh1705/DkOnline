import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { categoryInputSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: { _count: { select: { procedures: true } } },
  });
  return NextResponse.json({ categories });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const parsed = categoryInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dữ liệu không hợp lệ", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const base = slugify(data.name) || "danh-muc";
  let slug = base;
  let i = 1;
  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }

  const category = await prisma.category.create({
    data: {
      name: data.name,
      slug,
      description: data.description || null,
      icon: data.icon || null,
      color: data.color || null,
    },
  });
  revalidatePath("/");
  revalidatePath("/dashboard");
  return NextResponse.json({ category }, { status: 201 });
}
