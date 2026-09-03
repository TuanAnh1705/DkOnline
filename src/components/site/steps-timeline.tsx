"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Expand } from "lucide-react";
import type { StepData } from "@/types";
import { ImageLightbox } from "@/components/site/image-lightbox";
import { StepTtsButton } from "@/components/site/step-tts-button";
import { useTr } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export function StepsTimeline({
  steps,
  onStepRef,
}: {
  steps: StepData[];
  onStepRef?: (i: number, el: HTMLDivElement | null) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const tr = useTr();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".timeline-track",
            start: "top 60%",
            end: "bottom 70%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".step-item").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [steps.length]);

  const total = steps.length;

  return (
    <div ref={root} className="relative">
      <div className="timeline-track relative pl-12 sm:pl-16">
        {/* Đường kẻ nền + vạch tiến trình đỏ→vàng */}
        <div className="absolute bottom-4 left-[19px] top-4 w-0.5 bg-line sm:left-[27px]" />
        <div className="timeline-progress absolute bottom-4 left-[19px] top-4 w-0.5 bg-gradient-to-b from-brand-600 via-brand-500 to-accent-500 sm:left-[27px]" />

        <div className="space-y-10">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className="step-item relative"
              ref={(el) => onStepRef?.(i, el)}
            >
              {/* Nút số thứ tự — con dấu đỏ vành vàng */}
              <span className="absolute -left-12 top-1 grid size-10 place-items-center rounded-full border-4 border-cream bg-brand-600 font-display text-sm font-bold text-white shadow-lg shadow-brand-700/30 ring-1 ring-accent-500/60 sm:-left-16 sm:size-14 sm:text-base">
                {i + 1}
              </span>

              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:shadow-md">
                {/* đầu bài đỏ + huy hiệu vàng (giống khung video) */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-brand-700 to-brand-600 px-5 py-3 sm:px-6">
                  <span className="grid shrink-0 place-items-center rounded-lg bg-accent-400 px-2 py-0.5 text-[11px] font-black text-brand-900 shadow ring-1 ring-white/30">
                    {i + 1}/{total}
                  </span>
                  <p className="min-w-0 flex-1 text-[13px] font-bold text-white sm:text-sm">
                    {step.title
                      ? `${tr(`Bước ${i + 1}`, `Step ${i + 1}`)}: ${step.title}`
                      : tr(`Bước ${i + 1}`, `Step ${i + 1}`)}
                  </p>
                  <StepTtsButton stepId={step.id} text={step.content} />
                </div>
                <div className="px-5 py-4 sm:px-6">
                  <p className="step-content text-[15px] leading-relaxed text-ink/75">
                    {step.content}
                  </p>
                </div>
                {step.imageUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox({
                        src: step.imageUrl!,
                        alt: step.title || tr(`Bước ${i + 1}`, `Step ${i + 1}`),
                      })
                    }
                    className="group relative aspect-video w-full cursor-zoom-in border-t border-line bg-parchment"
                    aria-label={tr("Phóng to ảnh hướng dẫn", "Zoom in on the screenshot")}
                  >
                    <Image
                      src={step.imageUrl}
                      alt={step.title || tr(`Bước ${i + 1}`, `Step ${i + 1}`)}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-contain"
                    />
                    <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-ink/60 text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                      <Expand className="size-4" />
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Nút hoàn tất */}
          <div className="step-item relative">
            <span className="absolute -left-12 top-1 grid size-10 place-items-center rounded-full border-4 border-cream bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 sm:-left-16 sm:size-14">
              <Check className="size-5 sm:size-6" />
            </span>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 sm:px-6">
              <h3 className="font-display font-semibold text-emerald-800">
                {tr("Hoàn tất các bước", "All steps completed")}
              </h3>
              <p className="mt-1 text-sm text-emerald-700">
                {tr(
                  "Xem video hướng dẫn bên dưới và bấm nút để nộp hồ sơ trực tuyến.",
                  "Watch the video guide below, then tap the button to submit your application online.",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
