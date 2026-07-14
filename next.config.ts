import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Ảnh/video thumbnail phục vụ từ UploadThing
    remotePatterns: [
      { protocol: "https", hostname: "**.ufs.sh" },
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "**.utfs.io" },
    ],
  },
  // Prisma là external ở server để tránh bundle nặng
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
};

export default nextConfig;
