"use client";

import { useEffect, useRef, useState } from "react";
import { StepsTimeline } from "@/components/site/steps-timeline";
import { StepNavBar } from "@/components/site/step-nav-bar";
import { getLenis } from "@/lib/lenis-singleton";
import { useTr } from "@/lib/i18n";
import type { StepData } from "@/types";

function storageKey(slug: string) {
  return `nophso:last-step:${slug}`;
}

/**
 * Bọc StepsTimeline: 1 IntersectionObserver duy nhất theo dõi bước đang xem,
 * dùng chung cho thanh điều hướng bước (đáy màn hình) và ghi nhớ vị trí xem
 * dở bằng localStorage — không cần tài khoản.
 */
export function ProcedureSteps({ slug, steps }: { slug: string; steps: StepData[] }) {
  const total = steps.length;
  const tr = useTr();
  const [currentIndex, setCurrentIndex] = useState(0);
  const stepElsRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const indexByEl = useRef<WeakMap<Element, number>>(new WeakMap());
  const restoredRef = useRef(false);

  function handleStepRef(i: number, el: HTMLDivElement | null) {
    if (el) {
      stepElsRef.current.set(i, el);
      indexByEl.current.set(el, i);
    } else {
      const prev = stepElsRef.current.get(i);
      if (prev) indexByEl.current.delete(prev);
      stepElsRef.current.delete(i);
    }
  }

  function scrollToStep(i: number) {
    const el = stepElsRef.current.get(i);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -96 });
    else el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    if (total === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const closest = visible.reduce((best, e) =>
          Math.abs(e.boundingClientRect.top) < Math.abs(best.boundingClientRect.top) ? e : best,
        );
        const idx = indexByEl.current.get(closest.target);
        if (idx !== undefined) setCurrentIndex(idx);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    stepElsRef.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [total]);

  // Khôi phục vị trí bước đang xem dở (bỏ qua nếu là bước 1 — đã ở đầu sẵn)
  useEffect(() => {
    if (restoredRef.current || total === 0) return;
    const saved = Number(window.localStorage.getItem(storageKey(slug)));
    if (Number.isFinite(saved) && saved > 0 && saved < total) {
      const id = requestAnimationFrame(() => {
        scrollToStep(saved);
        restoredRef.current = true;
      });
      return () => cancelAnimationFrame(id);
    }
    restoredRef.current = true;
  }, [slug, total]);

  useEffect(() => {
    if (!restoredRef.current) return;
    window.localStorage.setItem(storageKey(slug), String(currentIndex));
  }, [slug, currentIndex]);

  function resetToStart() {
    window.localStorage.removeItem(storageKey(slug));
    setCurrentIndex(0);
    scrollToStep(0);
  }

  if (total === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 sm:p-10">
        {tr(
          "Thủ tục này đang được cập nhật nội dung hướng dẫn.",
          "The guide for this procedure is still being written.",
        )}
      </p>
    );
  }

  return (
    <>
      <StepsTimeline steps={steps} onStepRef={handleStepRef} />
      <StepNavBar
        current={currentIndex}
        total={total}
        onPrev={() => scrollToStep(Math.max(0, currentIndex - 1))}
        onNext={() => scrollToStep(Math.min(total - 1, currentIndex + 1))}
        onReset={resetToStart}
      />
    </>
  );
}
