import "server-only";
import { prisma } from "./db";

// ---- Trang người dùng (chỉ hiển thị thủ tục đã publish) ----

export async function getPublishedCategoriesWithProcedures() {
  return prisma.category.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      procedures: {
        where: { status: "PUBLISHED" },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        include: { _count: { select: { steps: true } } },
      },
    },
  });
}

export async function getPublishedProcedures() {
  return prisma.procedure.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { category: true, _count: { select: { steps: true } } },
  });
}

export async function getUncategorizedPublishedProcedures() {
  return prisma.procedure.findMany({
    where: { status: "PUBLISHED", categoryId: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { steps: true } } },
  });
}

export async function getProcedureBySlug(slug: string) {
  return prisma.procedure.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { category: true, steps: { orderBy: { order: "asc" } } },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      procedures: {
        where: { status: "PUBLISHED" },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        include: { category: true, _count: { select: { steps: true } } },
      },
    },
  });
}

export async function getPublishedCategorySlugs() {
  return prisma.category.findMany({ select: { slug: true } });
}

export async function getPublishedProcedureSlugs() {
  return prisma.procedure.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
}

// ---- Dashboard (tất cả thủ tục, gồm cả nháp) ----

export async function getAllProcedures() {
  return prisma.procedure.findMany({
    orderBy: [{ createdAt: "desc" }],
    include: { category: true, _count: { select: { steps: true } } },
  });
}

export async function getProcedureById(id: string) {
  return prisma.procedure.findUnique({
    where: { id },
    include: { category: true, steps: { orderBy: { order: "asc" } } },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: { _count: { select: { procedures: true } } },
  });
}

export async function getDashboardStats() {
  const [total, published, draft, categories] = await Promise.all([
    prisma.procedure.count(),
    prisma.procedure.count({ where: { status: "PUBLISHED" } }),
    prisma.procedure.count({ where: { status: "DRAFT" } }),
    prisma.category.count(),
  ]);
  return { total, published, draft, categories };
}
