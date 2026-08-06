// Engine import: upload ảnh/video local lên UploadThing rồi ghi Procedure + Step vào DB.
// Chạy: npx tsx --env-file=.env scripts/import.mts [folderKeyHoặcSlug...]
// - Có cache (scripts/.upload-cache.json): chạy lại sẽ bỏ qua file đã upload.
// - Idempotent theo slug: nếu thủ tục đã tồn tại -> xoá step cũ, ghi lại.

import { readFile } from "node:fs/promises";
import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { UTApi } from "uploadthing/server";
import { PrismaClient } from "../src/generated/prisma/index.js";
import { PROCEDURES, type ProcedureSpec } from "./data.mjs";

const prisma = new PrismaClient();
const utapi = new UTApi();

const CACHE_PATH = join(process.cwd(), "scripts", ".upload-cache.json");
const cache: Record<string, string> = existsSync(CACHE_PATH)
  ? JSON.parse(readFileSync(CACHE_PATH, "utf8"))
  : {};

function saveCache() {
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

function mimeOf(name: string): string {
  const ext = name.toLowerCase().split(".").pop();
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "mp4") return "video/mp4";
  return "application/octet-stream";
}

async function uploadCached(
  localPath: string,
  displayName: string,
  tries = 5,
): Promise<string> {
  if (cache[localPath]) return cache[localPath];
  const buf = await readFile(localPath);
  const file = new File([new Uint8Array(buf)], displayName, {
    type: mimeOf(displayName),
  });
  for (let k = 0; k < tries; k++) {
    try {
      const res = await utapi.uploadFiles([file]);
      const url = res[0]?.data?.ufsUrl;
      if (url) {
        cache[localPath] = url;
        saveCache();
        return url;
      }
      console.warn(`   ! lỗi upload (${displayName}):`, res[0]?.error?.message);
    } catch (e) {
      console.warn(`   ! retry ${k + 1} (${displayName}):`, (e as Error).message?.slice(0, 80));
    }
    await new Promise((r) => setTimeout(r, 1500 * (k + 1)));
  }
  throw new Error(`Upload thất bại: ${displayName}`);
}

async function getCategoryId(slug: string, name: string): Promise<string> {
  const found = await prisma.category.findUnique({ where: { slug } });
  if (found) return found.id;
  const created = await prisma.category.create({ data: { slug, name } });
  return created.id;
}

async function importProcedure(spec: ProcedureSpec) {
  console.log(`\n▶ ${spec.title} (${spec.steps.length} bước)`);
  const categoryId = spec.categorySlug
    ? await getCategoryId(spec.categorySlug, spec.categoryName ?? spec.categorySlug)
    : null;

  // Ảnh lấy từ imagesDir nếu có (vd "annotated" — ảnh đã khoanh đỏ, đặt tên buoc-NN),
  // ngược lại lấy ngay trong spec.dir. Video luôn nằm ở spec.dir.
  const imgDir = spec.imagesDir ? join(spec.dir, spec.imagesDir) : spec.dir;
  const images = readdirSync(imgDir)
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort();
  if (images.length !== spec.steps.length) {
    console.warn(
      `   ⚠ số ảnh (${images.length}) ≠ số caption (${spec.steps.length}) — ghép tới min`,
    );
  }

  const stepData: { order: number; title: string | null; content: string; imageUrl: string }[] = [];
  const n = Math.min(images.length, spec.steps.length);
  for (let i = 0; i < n; i++) {
    const s = spec.steps[i];
    // imgIndex (1-based) cho phép chỉ định ảnh sort thứ mấy; nếu không có -> theo vị trí
    const img = s.imgIndex ? images[s.imgIndex - 1] : images[i];
    const url = await uploadCached(
      join(imgDir, img),
      `${spec.slug}-buoc-${i + 1}.jpg`,
    );
    console.log(`   ✓ bước ${i + 1}/${n}`);
    stepData.push({ order: i, title: s.title ?? null, content: s.content, imageUrl: url });
  }

  // Upload video
  let videoUrl: string | null = null;
  if (spec.video) {
    videoUrl = await uploadCached(join(spec.dir, spec.video), `${spec.slug}-video.mp4`);
    console.log("   ✓ video");
  }

  const thumbnailUrl = stepData[0]?.imageUrl ?? null;

  // Ghi DB (idempotent theo slug)
  const existing = await prisma.procedure.findUnique({ where: { slug: spec.slug } });
  if (existing) {
    await prisma.step.deleteMany({ where: { procedureId: existing.id } });
    await prisma.procedure.update({
      where: { id: existing.id },
      data: {
        title: spec.title,
        summary: spec.summary ?? null,
        categoryId,
        thumbnailUrl,
        videoUrl,
        registrationUrl: spec.registrationUrl ?? null,
        status: "PUBLISHED",
        order: spec.order ?? 0,
        steps: { create: stepData },
      },
    });
    console.log("   ↻ cập nhật xong");
  } else {
    await prisma.procedure.create({
      data: {
        title: spec.title,
        slug: spec.slug,
        summary: spec.summary ?? null,
        categoryId,
        thumbnailUrl,
        videoUrl,
        registrationUrl: spec.registrationUrl ?? null,
        status: "PUBLISHED",
        order: spec.order ?? 0,
        steps: { create: stepData },
      },
    });
    console.log("   + tạo mới xong");
  }
}

async function main() {
  const filters = process.argv.slice(2);
  const list = filters.length
    ? PROCEDURES.filter((p) => filters.includes(p.key) || filters.includes(p.slug))
    : PROCEDURES;
  if (!list.length) {
    console.log("Không có thủ tục khớp filter:", filters.join(", "));
    return;
  }
  for (const spec of list) await importProcedure(spec);
  console.log("\n✅ Hoàn tất import.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
