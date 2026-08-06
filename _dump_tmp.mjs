import { PrismaClient } from "./src/generated/prisma/index.js";
import fs from "node:fs";
const p = new PrismaClient();
const rows = await p.procedure.findMany({ include: { steps: { orderBy: { order: "asc" } }, category: true }, orderBy: { order: "asc" } });
fs.writeFileSync("C:/Users/OS/AppData/Local/Temp/claude/D--NopHsOnline/dca4f681-6ba4-40cc-a1e6-93fb9041bd06/scratchpad/db.json", JSON.stringify(rows, null, 2));
console.log(rows.map(r => `${r.slug} | steps=${r.steps.length} | video=${r.videoUrl ? "Y":"N"}`).join("\n"));
await p.$disconnect();
