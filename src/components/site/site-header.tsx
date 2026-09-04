"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button";
import { LogoMark } from "@/components/site/logo-mark";
import { FontSizeControl } from "@/components/site/font-size-control";
import { LangToggle } from "@/components/site/lang-toggle";
import { useTr, type Bi } from "@/lib/i18n";

const NAV: { href: string; label: Bi }[] = [
  { href: "/", label: { vi: "Trang chủ", en: "Home" } },
  { href: "/thu-tuc", label: { vi: "Thủ tục", en: "Procedures" } },
  { href: "/#linh-vuc", label: { vi: "Lĩnh vực", en: "Categories" } },
  { href: "/cau-hoi-thuong-gap", label: { vi: "Hỏi đáp", en: "FAQ" } },
  { href: "/gioi-thieu", label: { vi: "Giới thiệu", en: "About" } },
  { href: "/lien-he", label: { vi: "Liên hệ", en: "Contact" } },
];

export function SiteHeader() {
  const pathname = usePathname();
  const tr = useTr();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      data-no-print
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "glass border-b border-accent-500/20 shadow-sm shadow-brand-900/5"
          : "bg-transparent",
      )}
    >
      {/* chỉ vàng thếp mảnh ở đỉnh */}
      <div className="rule-gold h-px w-full opacity-70" />
      {/* Thanh header dùng khung rộng hơn nội dung (max-w-7xl thay vì 6xl) vì tên đầy đủ
          "Cẩm nang hướng dẫn nộp hồ sơ trực tuyến" + 6 mục menu cần nhiều chỗ hơn. */}
      <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-2.5">
          <LogoMark className="size-8 shrink-0 transition group-hover:scale-105 sm:size-9" />
          <span className="flex min-w-0 flex-col gap-0.5 leading-tight">
            <span className="truncate font-display text-[15px] font-bold leading-tight tracking-tight text-ink sm:text-[16px]">
              {tr("Cẩm nang hướng dẫn nộp hồ sơ trực tuyến", "Online Application Filing Guide")}
            </span>
            <span className="truncate text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-accent-600 sm:text-[10.5px] sm:tracking-[0.14em]">
              {tr("Dịch vụ công trực tuyến", "Public services online")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("#")[0]) &&
                  item.href !== "/";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-semibold transition",
                  active
                    ? "text-brand-700"
                    : "text-ink/70 hover:bg-brand-50/70 hover:text-brand-700",
                )}
              >
                {tr(item.label)}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-600 to-accent-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LangToggle />
          <span className="hidden sm:block">
            <FontSizeControl />
          </span>
          {/* `cn` chỉ nối chuỗi nên không thể đặt "hidden" cạnh "inline-flex"
              của buttonClass — bọc ngoài để ẩn hẳn trên màn hình nhỏ. */}
          <span className="hidden lg:block">
            <a
              href="https://dichvucong.gov.vn"
              target="_blank"
              rel="noreferrer"
              className={buttonClass("primary", "sm")}
            >
              {tr("Cổng DVC Quốc gia", "National Portal")}
            </a>
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            className="-mr-1 grid size-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label={tr("Menu", "Menu")}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-100 glass lg:hidden"
          >
            <nav className="mx-auto flex max-h-[70vh] max-w-6xl flex-col gap-1 overflow-y-auto px-4 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {tr(item.label)}
                </Link>
              ))}
              <a
                href="https://dichvucong.gov.vn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-3 text-base font-semibold text-brand-700"
              >
                {tr("Cổng DVC Quốc gia", "National Public Service Portal")} ↗
              </a>
              <div className="mt-1 flex items-center gap-3 border-t border-line px-3 pt-3">
                <span className="text-xs font-bold uppercase tracking-wider text-ink/40">
                  {tr("Cỡ chữ", "Text size")}
                </span>
                <FontSizeControl />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
