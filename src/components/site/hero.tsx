"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Check } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { DrumMotif } from "@/components/site/ornament";

gsap.registerPlugin(ScrollTrigger);

export function Hero({
  procedureCount,
  categoryCount,
  suggestions = [],
}: {
  procedureCount: number;
  categoryCount: number;
  suggestions?: string[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/thu-tuc?q=${encodeURIComponent(q.trim())}` : "/thu-tuc");
  }

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.5 })
        .from(".hero-line", { yPercent: 120, opacity: 0, duration: 0.85, stagger: 0.12 }, "-=0.2")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.45")
        .from(".hero-search", { y: 18, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-cta", { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(".hero-stat", { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(".hero-card", { y: 44, opacity: 0, rotateX: -12, duration: 0.75, stagger: 0.14 }, "-=0.8");

      gsap.utils.toArray<HTMLElement>(".hero-count").forEach((el) => {
        const target = Number(el.dataset.value || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          delay: 0.7,
          ease: "power2.out",
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        });
      });

      if (!reduce) {
        gsap.to(".float-a", { y: -18, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".float-b", { y: 16, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut" });

        gsap.to(".hero-visual", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-blob", {
          yPercent: 26,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-drum", {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: "none",
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden" id="huong-dan">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.35]" />
      {/* hoa văn trống đồng mờ */}
      <div className="hero-drum pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] opacity-[0.06] sm:opacity-[0.09]">
        <DrumMotif className="h-full w-full" />
      </div>
      <div className="hero-blob pointer-events-none absolute -top-24 left-1/3 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="hero-blob pointer-events-none absolute top-40 right-0 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-24 sm:px-6 lg:grid-cols-2 lg:pt-20">
        <div>
          <span className="hero-badge inline-flex items-center gap-2.5 rounded-full border border-accent-500/30 bg-white/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700 shadow-sm">
            <span className="size-1.5 rounded-full bg-accent-500" />
            Hướng dẫn bằng hình ảnh & video
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">Tự tin hoàn thành</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="hero-line block text-gradient">mọi thủ tục hành chính</span>
            </span>
          </h1>

          <p className="hero-sub mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
            Từ khai sinh, kết hôn đến khai tử — mỗi thủ tục được hướng dẫn chi
            tiết bằng hình ảnh và video, dẫn thẳng tới trang nộp hồ sơ trực tuyến
            của Cổng Dịch vụ công Quốc gia.
          </p>

          <form onSubmit={submit} className="hero-search mt-7 max-w-lg">
            <div className="flex overflow-hidden rounded-2xl border border-line bg-white shadow-lg shadow-brand-900/5 focus-within:border-accent-500 focus-within:ring-4 focus-within:ring-accent-500/15">
              <span className="grid place-items-center pl-4 text-accent-600">
                <Search className="size-5" />
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Bạn cần làm thủ tục gì?"
                className="min-w-0 flex-1 bg-transparent py-4 pl-3 text-[15px] outline-none placeholder:text-ink/40"
              />
              <button type="submit" className={`m-1.5 ${buttonClass("primary", "md")}`}>
                Tìm kiếm
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-ink/40">Phổ biến:</span>
                {suggestions.slice(0, 4).map((s) => (
                  <Link
                    key={s}
                    href={`/thu-tuc?q=${encodeURIComponent(s)}`}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink/70 ring-1 ring-line transition hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            )}
          </form>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/thu-tuc" className={`hero-cta ${buttonClass("secondary", "lg")}`}>
              Xem tất cả thủ tục
            </Link>
            <Link href="/cau-hoi-thuong-gap" className={`hero-cta ${buttonClass("ghost", "lg")}`}>
              Câu hỏi thường gặp
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-10 border-t border-line pt-8">
            <Stat count={procedureCount} label="Thủ tục hướng dẫn" />
            <Stat count={categoryCount} label="Nhóm lĩnh vực" />
            <div className="hero-stat">
              <p className="font-display text-3xl font-bold text-ink">100%</p>
              <p className="mt-0.5 text-sm text-ink/50">Trực tuyến, tại nhà</p>
            </div>
          </div>
        </div>

        {/* Bộ thẻ mô phỏng khung hình video hướng dẫn — xếp chồng như một tập bước */}
        <div className="hero-visual relative min-h-[30rem] [perspective:1400px]">
          {/* Bước 22 — hoàn tất (phía sau, nghiêng trái) */}
          <StepCard
            variant="success"
            step={22}
            total={22}
            title="Thanh toán thành công"
            className="hero-card absolute left-0 top-28 z-0 w-64 -rotate-6 sm:w-72"
          />
          {/* Bước 12 — kê khai (phía sau, nghiêng phải) */}
          <StepCard
            variant="mini"
            step={12}
            total={22}
            title="Kê khai thông tin"
            className="hero-card absolute right-0 top-2 z-10 w-64 rotate-3 sm:w-72"
          />
          {/* Bước 1 — biểu mẫu có khoanh đỏ (nổi bật phía trước) */}
          <StepCard
            variant="full"
            step={1}
            total={22}
            title="Đăng nhập VNeID"
            sub="Xác thực bằng tài khoản định danh điện tử"
            className="hero-card float-a relative z-20 mx-auto w-[21rem] max-w-full"
          />
          {/* nhãn nổi */}
          <div className="hero-card absolute -left-3 bottom-4 z-30 flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 shadow-xl shadow-brand-900/10">
            <span className="grid size-6 place-items-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">✓</span>
            <p className="text-xs font-semibold text-ink/80">
              Hoàn thành trong <span className="font-bold text-brand-700">~10 phút</span>
            </p>
          </div>
          <div className="hero-card float-b absolute -right-2 bottom-24 z-30 flex items-center gap-2 rounded-xl border border-accent-500/40 bg-white px-3 py-2 shadow-xl shadow-brand-900/10">
            <span className="grid size-6 place-items-center rounded-md bg-accent-400 text-[10px] font-black text-brand-900">▶</span>
            <p className="text-xs font-semibold text-ink/80">Kèm video từng bước</p>
          </div>
        </div>
      </div>

      {/* viền chỉ vàng dưới hero */}
      <div className="rule-gold absolute inset-x-0 bottom-0 h-px opacity-60" />
    </section>
  );
}

function StepCard({
  step,
  total,
  title,
  sub,
  variant = "full",
  className,
}: {
  step: number;
  total: number;
  title: string;
  sub?: string;
  variant?: "full" | "mini" | "success";
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-brand-900/10 ${className ?? ""}`}
    >
      {/* đầu bài đỏ + huy hiệu vàng (giống khung video) */}
      <div className="flex items-center gap-2.5 bg-gradient-to-r from-brand-700 to-brand-600 px-4 py-2.5">
        <span className="shrink-0 rounded-md bg-accent-400 px-1.5 py-0.5 text-[11px] font-black text-brand-900 shadow ring-1 ring-white/30">
          {step}/{total}
        </span>
        <p className="truncate text-[13px] font-bold text-white">
          Bước {step}: {title}
        </p>
      </div>

      {variant === "full" && (
        <div className="p-4">
          {sub && <p className="text-xs leading-relaxed text-ink/55">{sub}</p>}
          {/* mô phỏng biểu mẫu có khoanh đỏ vào nút thao tác */}
          <div className="mt-3 space-y-2.5">
            <div className="h-2 w-2/5 rounded-full bg-parchment" />
            <div className="h-8 rounded-lg border border-line bg-cream" />
            <div className="h-8 rounded-lg border border-line bg-cream" />
            <div className="relative mt-1 flex justify-end">
              <div className="relative">
                <div className="h-9 w-32 rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 shadow" />
                <span className="pointer-events-none absolute -inset-1.5 rounded-xl border-2 border-brand-600" />
                <span className="pointer-events-none absolute -left-11 top-1/2 flex -translate-y-1/2 items-center">
                  <span className="h-0.5 w-8 bg-brand-600" />
                  <span className="border-y-[5px] border-l-[8px] border-y-transparent border-l-brand-600" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {variant === "mini" && (
        <div className="space-y-2 p-4">
          <div className="h-2 w-3/5 rounded-full bg-parchment" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-7 rounded-lg border border-line bg-cream" />
            <div className="h-7 rounded-lg border border-line bg-cream" />
          </div>
          <div className="relative h-7 rounded-lg border border-line bg-cream">
            <span className="pointer-events-none absolute -inset-1 rounded-lg border-2 border-brand-600" />
          </div>
        </div>
      )}

      {variant === "success" && (
        <div className="flex flex-col items-center gap-1.5 px-4 py-6 text-center">
          <span className="grid size-11 place-items-center rounded-full bg-emerald-100 text-emerald-600 ring-4 ring-emerald-50">
            <Check className="size-6" />
          </span>
          <p className="text-sm font-bold text-ink">Giao dịch thành công</p>
          <p className="text-[11px] text-ink/50">Mã: TH20260713061185</p>
          <p className="mt-1 font-display text-lg font-bold text-emerald-600">40.000 đ</p>
        </div>
      )}
    </div>
  );
}

function Stat({ count, label }: { count: number; label: string }) {
  return (
    <div className="hero-stat">
      <p className="font-display text-3xl font-bold text-ink">
        <span className="hero-count" data-value={count}>
          {count}
        </span>
      </p>
      <p className="mt-0.5 text-sm text-ink/50">{label}</p>
    </div>
  );
}
