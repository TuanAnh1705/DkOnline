import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

// Serif trang trọng cho tiêu đề (sơn son thếp vàng)
const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const SITE_NAME = "Cẩm nang hướng dẫn nộp hồ sơ trực tuyến";
const SITE_DESCRIPTION =
  "Hướng dẫn nộp hồ sơ dịch vụ công trực tuyến từng bước bằng hình ảnh và video.";

export const metadata: Metadata = {
  // Bắt buộc phải có để các URL ảnh (og:image, twitter:image, icon...) trong <head>
  // được ghép thành đường dẫn tuyệt đối đúng domain thật — nếu để trống, Next chỉ
  // build được với localhost:3000, sai khi chia sẻ link ở production.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // Không khai title/description/images riêng ở đây — Next tự lấy từ `title`/
  // `description` phía trên và từ file opengraph-image.png/twitter-image.png cho
  // từng trang, nên tiêu đề + mô tả + ảnh logo luôn khớp nội dung khi dán link
  // (Facebook, Zalo, Telegram, Twitter/X…) mà không cần khai lại ở mỗi trang.
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Script id="font-scale-init" strategy="beforeInteractive">
          {`try{var s=localStorage.getItem("nophso:font-scale");if(s==="md"||s==="lg")document.documentElement.dataset.fontScale=s;}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
