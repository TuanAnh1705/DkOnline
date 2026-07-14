"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buttonClass } from "@/components/ui/button";

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

      // Đếm số cho các chỉ số
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

        // Parallax khi cuộn
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
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden" id="huong-dan">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="hero-blob pointer-events-none absolute -top-24 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-brand-400/25 blur-3xl" />
      <div className="hero-blob pointer-events-none absolute top-40 right-0 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-24 sm:px-6 lg:grid-cols-2 lg:pt-20">
        <div>
          <span className="hero-badge inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
            <span className="h-px w-7 bg-brand-400/70" />
            Hướng dẫn bằng hình ảnh & video
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">Tự tin hoàn thành</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="hero-line block text-gradient">mọi thủ tục hành chính</span>
            </span>
          </h1>

          <p className="hero-sub mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
            Từ khai sinh, kết hôn đến khai tử — mỗi thủ tục được hướng dẫn chi
            tiết bằng hình ảnh và video, dẫn thẳng tới trang nộp hồ sơ trực tuyến
            của Cổng Dịch vụ công Quốc gia.
          </p>

          <form onSubmit={submit} className="hero-search mt-7 max-w-lg">
            <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Bạn cần làm thủ tục gì?"
                className="min-w-0 flex-1 bg-transparent py-4 pl-5 text-[15px] outline-none placeholder:text-slate-400"
              />
              <button type="submit" className={`m-1.5 ${buttonClass("primary", "md")}`}>
                Tìm kiếm
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Phổ biến:</span>
                {suggestions.slice(0, 4).map((s) => (
                  <Link
                    key={s}
                    href={`/thu-tuc?q=${encodeURIComponent(s)}`}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-700"
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

          <div className="mt-12 flex flex-wrap gap-10 border-t border-slate-200/70 pt-8">
            <Stat count={procedureCount} label="Thủ tục hướng dẫn" />
            <Stat count={categoryCount} label="Nhóm lĩnh vực" />
            <div className="hero-stat">
              <p className="text-3xl font-extrabold text-slate-900">100%</p>
              <p className="mt-0.5 text-sm text-slate-500">Trực tuyến, tại nhà</p>
            </div>
          </div>
        </div>

        <div className="hero-visual relative [perspective:1200px]">
          <div className="hero-card float-a relative z-20 rounded-2xl border border-slate-100 bg-white p-5 shadow-2xl shadow-slate-900/10">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-brand-600">01</span>
              <div>
                <p className="text-sm font-bold text-slate-900">Đăng nhập VNeID</p>
                <p className="text-xs text-slate-500">Xác thực bằng định danh điện tử</p>
              </div>
              <span className="ml-auto grid size-6 place-items-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                ✓
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-2.5 w-3/4 rounded-full bg-slate-100" />
              <div className="h-2.5 w-full rounded-full bg-slate-100" />
              <div className="h-2.5 w-5/6 rounded-full bg-slate-100" />
            </div>
            <div className="mt-4 aspect-video rounded-xl bg-gradient-to-br from-brand-100 via-brand-50 to-slate-50" />
          </div>

          <div className="hero-card float-b absolute -right-4 top-24 z-10 w-64 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-xl shadow-slate-900/10 backdrop-blur">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-full bg-accent-500 text-[10px] text-white">
                ▶
              </span>
              <p className="text-xs font-bold text-slate-900">Video hướng dẫn</p>
            </div>
            <div className="mt-3 aspect-video rounded-lg bg-gradient-to-br from-accent-400/30 to-brand-400/20" />
          </div>

          <div className="hero-card absolute -left-2 bottom-2 z-30 rounded-xl border border-slate-100 bg-white px-4 py-2.5 shadow-xl shadow-slate-900/10">
            <p className="text-xs font-semibold text-slate-700">
              Hoàn thành trong <span className="text-brand-600">~10 phút</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ count, label }: { count: number; label: string }) {
  return (
    <div className="hero-stat">
      <p className="text-3xl font-extrabold text-slate-900">
        <span className="hero-count" data-value={count}>
          {count}
        </span>
      </p>
      <p className="mt-0.5 text-sm text-slate-500">{label}</p>
    </div>
  );
}
