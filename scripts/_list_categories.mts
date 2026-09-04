import { PrismaClient } from "../src/generated/prisma/index.js";
const prisma = new PrismaClient();
const rows = await prisma.category.findMany({
  select: { id: true, slug: true, name: true, order: true, _count: { select: { procedures: true } } },
  orderBy: { order: "asc" },
});
for (const r of rows) console.log(r.order, r.slug, "|", r.name, "| procedures=", r._count.procedures, "| id=", r.id);
console.log("TOTAL:", rows.length);
await prisma.$disconnect();
