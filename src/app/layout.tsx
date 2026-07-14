import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cẩm nang nộp hồ sơ trực tuyến",
    template: "%s · Cẩm nang nộp hồ sơ trực tuyến",
  },
  description:
    "Hướng dẫn nộp hồ sơ dịch vụ công trực tuyến từng bước bằng hình ảnh và video, dễ hiểu, dễ làm theo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${beVietnam.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
