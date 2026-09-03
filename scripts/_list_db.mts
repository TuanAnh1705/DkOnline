import { PrismaClient } from "../src/generated/prisma/index.js";
const prisma = new PrismaClient();
const rows = await prisma.procedure.findMany({
  select: { slug: true, title: true, videoUrl: true, order: true, category: { select: { slug: true } }, _count: { select: { steps: true } } },
  orderBy: { order: "asc" },
});
for (const r of rows) console.log(r.order, r.slug, "|", r.title, "| steps=", r._count.steps, "| video=", !!r.videoUrl, "| cat=", r.category?.slug);
console.log("TOTAL:", rows.length);
await prisma.$disconnect();
