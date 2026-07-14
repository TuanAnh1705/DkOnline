import Link from "next/link";
import { LogoMark } from "@/components/site/logo-mark";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 max-w-sm">
            <div className="flex items-center gap-2.5">
              <LogoMark className="size-9" />
              <span className="text-[15px] font-extrabold text-slate-900">
                Cẩm nang hồ sơ trực tuyến
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Hướng dẫn nộp hồ sơ dịch vụ công trực tuyến từng bước bằng hình
              ảnh và video, giúp người dân thao tác nhanh, đúng và không phải đi
              lại nhiều lần.
            </p>
            <a
              href="tel:18001096"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-white"
            >
              Tổng đài <span className="text-brand-600">18001096</span>
            </a>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="mb-1 font-bold text-slate-900">Khám phá</span>
            <FooterLink href="/">Trang chủ</FooterLink>
            <FooterLink href="/thu-tuc">Tất cả thủ tục</FooterLink>
            <FooterLink href="/cau-hoi-thuong-gap">Câu hỏi thường gặp</FooterLink>
            <FooterLink href="/gioi-thieu">Giới thiệu</FooterLink>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="mb-1 font-bold text-slate-900">Tham khảo</span>
            <FooterExt href="https://dichvucong.gov.vn">
              Cổng DVC Quốc gia
            </FooterExt>
            <FooterExt href="https://vneid.gov.vn">Ứng dụng VNeID</FooterExt>
            <FooterExt href="https://dichvuconglienthong.gov.vn">
              DVC Liên thông
            </FooterExt>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} Cẩm nang hồ sơ trực tuyến. Nội dung mang
          tính hướng dẫn tham khảo, không thay thế văn bản pháp luật.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-slate-500 transition hover:text-brand-600">
      {children}
    </Link>
  );
}

function FooterExt({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-slate-500 transition hover:text-brand-600"
    >
      {children}
    </a>
  );
}
