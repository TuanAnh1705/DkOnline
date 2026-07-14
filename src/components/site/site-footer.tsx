import Link from "next/link";
import { Phone } from "lucide-react";
import { LogoMark } from "@/components/site/logo-mark";
import { GoldDivider } from "@/components/site/ornament";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-gradient-to-b from-brand-800 to-brand-900 text-white/80">
      {/* chỉ vàng thếp ở đỉnh */}
      <div className="rule-gold h-px w-full" />
      <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 max-w-sm">
            <div className="flex items-center gap-2.5">
              <LogoMark className="size-9" />
              <span className="font-display text-[16px] font-bold text-white">
                Cẩm nang hồ sơ trực tuyến
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Hướng dẫn nộp hồ sơ dịch vụ công trực tuyến từng bước bằng hình
              ảnh và video, giúp người dân thao tác nhanh, đúng và không phải đi
              lại nhiều lần.
            </p>
            <a
              href="tel:18001096"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 text-sm font-semibold text-white ring-1 ring-accent-400/30 transition hover:bg-white/15"
            >
              <Phone className="size-4 text-accent-300" /> Tổng đài{" "}
              <span className="text-accent-300">18001096</span>
            </a>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="mb-1 font-bold uppercase tracking-wider text-accent-300">
              Khám phá
            </span>
            <FooterLink href="/">Trang chủ</FooterLink>
            <FooterLink href="/thu-tuc">Tất cả thủ tục</FooterLink>
            <FooterLink href="/cau-hoi-thuong-gap">Câu hỏi thường gặp</FooterLink>
            <FooterLink href="/gioi-thieu">Giới thiệu</FooterLink>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="mb-1 font-bold uppercase tracking-wider text-accent-300">
              Tham khảo
            </span>
            <FooterExt href="https://dichvucong.gov.vn">
              Cổng DVC Quốc gia
            </FooterExt>
            <FooterExt href="https://vneid.gov.vn">Ứng dụng VNeID</FooterExt>
            <FooterExt href="https://dichvuconglienthong.gov.vn">
              DVC Liên thông
            </FooterExt>
          </div>
        </div>

        <GoldDivider className="mt-12" />

        <div className="mt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Cẩm nang hồ sơ trực tuyến. Nội dung mang
          tính hướng dẫn tham khảo, không thay thế văn bản pháp luật.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white/70 transition hover:text-accent-300">
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
      className="text-white/70 transition hover:text-accent-300"
    >
      {children}
    </a>
  );
}
