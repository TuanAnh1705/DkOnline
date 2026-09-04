import type { NextConfig } from "next";

// Domain ảnh/video thật sự dùng (UploadThing) — dùng lại cho cả images.remotePatterns
// và Content-Security-Policy bên dưới, tránh khai hai nơi lệch nhau.
const UPLOADTHING_ASSET_HOSTS = ["https://*.ufs.sh", "https://utfs.io", "https://*.utfs.io"];
const UPLOADTHING_API_HOSTS = ["https://*.uploadthing.com", "https://uploadthing.com"];

// CSP chỉ bật ở production: chế độ dev của Next cần 'unsafe-eval' cho Fast Refresh/
// sourcemap, bật CSP chặt ở dev sẽ chỉ làm vỡ HMR chứ không tăng bảo mật thật.
const isProd = process.env.NODE_ENV === "production";

const CSP_DIRECTIVES: Record<string, string[]> = {
  "default-src": ["'self'"],
  // Next chèn 1 script inline nhỏ (khởi tạo cỡ chữ) và style runtime không dùng nonce.
  "script-src": ["'self'", "'unsafe-inline'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", ...UPLOADTHING_ASSET_HOSTS],
  "media-src": ["'self'", ...UPLOADTHING_ASSET_HOSTS],
  "font-src": ["'self'", "data:"],
  "connect-src": ["'self'", ...UPLOADTHING_API_HOSTS, ...UPLOADTHING_ASSET_HOSTS],
  "frame-ancestors": ["'none'"],
  "frame-src": ["'none'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
};

const CONTENT_SECURITY_POLICY = Object.entries(CSP_DIRECTIVES)
  .map(([key, values]) => `${key} ${values.join(" ")}`)
  .join("; ");

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  ...(isProd
    ? [
        // HSTS chỉ có ý nghĩa khi site đã luôn phục vụ qua HTTPS ở production.
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
      ]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
