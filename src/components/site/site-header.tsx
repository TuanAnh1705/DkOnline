"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button";
import { LogoMark } from "@/components/site/logo-mark";

const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/thu-tuc", label: "Thủ tục" },
  { href: "/#linh-vuc", label: "Lĩnh vực" },
  { href: "/cau-hoi-thuong-gap", label: "Hỏi đáp" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
];

export function SiteHeader() {
  const pathname = usePathname();
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
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "glass border-b border-accent-500/20 shadow-sm shadow-brand-900/5"
          : "bg-transparent",
      )}
    >
      {/* chỉ vàng thếp mảnh ở đỉnh */}
      <div className="rule-gold h-px w-full opacity-70" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <LogoMark className="size-9 transition group-hover:scale-105" />
          <span className="flex flex-col gap-0.5 leading-tight">
            <span className="font-display text-[16px] font-bold leading-tight tracking-tight text-ink">
              Cẩm nang hồ sơ
            </span>
            <span className="text-[10.5px] font-semibold uppercase leading-tight tracking-[0.14em] text-accent-600">
              Dịch vụ công trực tuyến
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
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-600 to-accent-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://dichvucong.gov.vn"
            target="_blank"
            rel="noreferrer"
            className={cn("hidden sm:inline-flex", buttonClass("primary", "sm"))}
          >
            Cổng DVC Quốc gia
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Menu"
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
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://dichvucong.gov.vn"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-700"
              >
                Cổng DVC Quốc gia ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
