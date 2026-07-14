import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getSession } from "@/lib/session";

const f = createUploadthing();

// Chỉ cho phép người đã đăng nhập upload
async function authMiddleware() {
  const session = await getSession();
  if (!session) throw new UploadThingError("Chưa đăng nhập");
  return { userId: session.sub };
}

export const ourFileRouter = {
  // Ảnh minh hoạ cho từng bước & ảnh đại diện thủ tục
  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(authMiddleware)
    .onUploadComplete(async ({ file }) => ({ url: file.ufsUrl, name: file.name })),

  // Video hướng dẫn cuối các bước
  videoUploader: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware(authMiddleware)
    .onUploadComplete(async ({ file }) => ({ url: file.ufsUrl, name: file.name })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
