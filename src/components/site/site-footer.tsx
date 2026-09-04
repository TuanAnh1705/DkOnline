"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { LogoMark } from "@/components/site/logo-mark";
import { GoldDivider } from "@/components/site/ornament";
import { useTr } from "@/lib/i18n";

export function SiteFooter() {
  const tr = useTr();

  return (
    <footer
      data-no-print
      className="relative mt-20 overflow-hidden bg-gradient-to-b from-brand-800 to-brand-900 text-white/80 sm:mt-24"
    >
      {/* chỉ vàng thếp ở đỉnh */}
      <div className="rule-gold h-px w-full" />
      <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-5">
          <div className="max-w-sm sm:col-span-2">
            <div className="flex items-center gap-2.5">
              <LogoMark className="size-9" />
              <span className="font-display text-[16px] font-bold text-white">
                {tr("Cẩm nang hướng dẫn nộp hồ sơ trực tuyến", "Online Application Filing Guide")}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {tr(
                "Hướng dẫn nộp hồ sơ dịch vụ công trực tuyến từng bước bằng hình ảnh và video, giúp người dân thao tác nhanh, đúng và không phải đi lại nhiều lần.",
                "Step-by-step guides with screenshots and video for submitting public service applications online, so you get it right the first time without repeated trips to the office.",
              )}
            </p>
            <a
              href="tel:18001096"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white ring-1 ring-accent-400/30 transition hover:bg-white/15"
            >
              <Phone className="size-4 text-accent-300" /> {tr("Tổng đài", "Hotline")}{" "}
              <span className="text-accent-300">18001096</span>
            </a>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="mb-1 font-bold uppercase tracking-wider text-accent-300">
              {tr("Khám phá", "Explore")}
            </span>
            <FooterLink href="/">{tr("Trang chủ", "Home")}</FooterLink>
            <FooterLink href="/thu-tuc">{tr("Tất cả thủ tục", "All procedures")}</FooterLink>
            <FooterLink href="/cau-hoi-thuong-gap">
              {tr("Câu hỏi thường gặp", "Frequently asked questions")}
            </FooterLink>
            <FooterLink href="/gioi-thieu">{tr("Giới thiệu", "About")}</FooterLink>
            <FooterLink href="/lien-he">{tr("Liên hệ", "Contact")}</FooterLink>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="mb-1 font-bold uppercase tracking-wider text-accent-300">
              {tr("Tham khảo", "Reference")}
            </span>
            <FooterExt href="https://dichvucong.gov.vn">
              {tr("Cổng DVC Quốc gia", "National Public Service Portal")}
            </FooterExt>
            <FooterExt href="https://vneid.gov.vn">
              {tr("Ứng dụng VNeID", "VNeID app")}
            </FooterExt>
            <FooterExt href="https://dichvuconglienthong.gov.vn">
              {tr("DVC Liên thông", "Interconnected services")}
            </FooterExt>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="mb-1 font-bold uppercase tracking-wider text-accent-300">
              {tr("Pháp lý", "Legal")}
            </span>
            <FooterLink href="/chinh-sach-bao-mat">
              {tr("Chính sách bảo mật", "Privacy Policy")}
            </FooterLink>
            <FooterLink href="/dieu-khoan-su-dung">
              {tr("Điều khoản sử dụng", "Terms of Use")}
            </FooterLink>
          </div>
        </div>

        <GoldDivider className="mt-10 sm:mt-12" />

        <div className="mt-6 text-center text-xs leading-relaxed text-white/50">
          © {new Date().getFullYear()}{" "}
          {tr(
            "Cẩm nang hướng dẫn nộp hồ sơ trực tuyến. Nội dung mang tính hướng dẫn tham khảo, không thay thế văn bản pháp luật.",
            "Online Application Filing Guide. This content is for reference only and does not replace official legal documents.",
          )}
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
