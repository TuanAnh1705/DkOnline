"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ListChecks,
  Loader2,
  PlayCircle,
} from "lucide-react";
import { ProcedureSteps } from "@/components/site/procedure-steps";
import { PortalLoginNotice } from "@/components/site/portal-login-notice";
import { VideoPlayer } from "@/components/site/video-player";
import { Badge } from "@/components/ui/badge";
import { buttonClass } from "@/components/ui/button";
import { CategoryIcon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { DrumMotif } from "@/components/site/ornament";
import { translateMany } from "@/lib/translate";
import { useLang, useTr } from "@/lib/i18n";
import type { StepData, CategoryLite } from "@/types";

type Translated = {
  title: string;
  summary: string | null;
  categoryName: string | null;
  steps: StepData[];
};

export function ProcedureContent({
  slug,
  title,
  summary,
  registrationUrl,
  videoUrl,
  thumbnailUrl,
  category,
  steps,
}: {
  slug: string;
  title: string;
  summary: string | null;
  registrationUrl: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  category: CategoryLite | null;
  steps: StepData[];
}) {
  const { lang } = useLang();
  const tr = useTr();
  const [translating, setTranslating] = useState(false);
  const [en, setEn] = useState<Translated | null>(null);
  const enRef = useRef<Translated | null>(null);

  // Nội dung từ CSDL là tiếng Việt nên chỉ cần dịch một lần khi người dùng
  // chuyển sang tiếng Anh; kết quả giữ lại để bấm qua lại không gọi mạng nữa.
  useEffect(() => {
    if (lang !== "en" || enRef.current) return;
    let cancelled = false;

    async function run() {
      setTranslating(true);
      try {
        // Gom TẤT CẢ câu của trang vào một lần gọi duy nhất — đây là lý do
        // trước đây trang bị dịch thiếu: mỗi bước gọi một request riêng và bị
        // dịch vụ miễn phí chặn khi thủ tục có hơn 20 bước.
        const sources = [
          title,
          summary ?? "",
          category?.name ?? "",
          ...steps.flatMap((s) => [s.title ?? "", s.content]),
        ];
        const out = await translateMany(sources, "vi", "en");
        if (cancelled) return;

        const translated: Translated = {
          title: out[0],
          summary: summary ? out[1] : null,
          categoryName: category?.name ? out[2] : null,
          steps: steps.map((s, i) => ({
            ...s,
            title: s.title ? out[3 + i * 2] : s.title,
            content: out[4 + i * 2],
          })),
        };
        enRef.current = translated;
        setEn(translated);
      } finally {
        if (!cancelled) setTranslating(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [lang, title, summary, category?.name, steps]);

  // Thẻ <title> do server render nên vẫn là tiếng Việt; cập nhật lại cho khớp
  // ngôn ngữ đang xem (trả về nguyên trạng khi quay lại tiếng Việt).
  useEffect(() => {
    const suffix =
      lang === "en" ? "Online Application Filing Guide" : "Cẩm nang hướng dẫn nộp hồ sơ trực tuyến";
    const heading = lang === "en" && enRef.current ? enRef.current.title : title;
    document.title = `${heading} · ${suffix}`;
  }, [lang, title, en]);

  const useEn = lang === "en" && en !== null;
  const displayTitle = useEn ? en.title : title;
  const displaySummary = useEn ? en.summary : summary;
  const displaySteps = useEn ? en.steps : steps;
  const displayCategory = useEn && en.categoryName ? en.categoryName : category?.name;

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-parchment to-cream">
        <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 opacity-[0.07]">
          <DrumMotif className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute -top-20 right-10 h-56 w-56 rounded-full bg-brand-400/15 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/#thu-tuc"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/50 transition hover:text-brand-600"
            >
              <ArrowLeft className="size-4" /> {tr("Tất cả thủ tục", "All procedures")}
            </Link>

            {translating && (
              <span
                data-no-print
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white/70 px-3 py-1.5 text-xs font-bold text-ink/70"
              >
                <Loader2 className="size-3.5 animate-spin" />
                {tr("Đang dịch...", "Translating…")}
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {category && (
              <Badge tone="brand">
                <CategoryIcon name={category.icon} className="size-3.5" />
                {displayCategory}
              </Badge>
            )}
            <Badge tone="slate">
              <ListChecks className="size-3.5" />
              {tr(`${steps.length} bước`, `${steps.length} steps`)}
            </Badge>
            {videoUrl && (
              <Badge tone="accent">
                <PlayCircle className="size-3.5" /> {tr("Có video", "Video included")}
              </Badge>
            )}
          </div>

          <h1 className="mt-4 font-display text-[26px] font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {displayTitle}
          </h1>
          {displaySummary && (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
              {displaySummary}
            </p>
          )}

          {registrationUrl && (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noreferrer"
              className={`mt-6 w-full sm:w-auto ${buttonClass("primary", "lg")}`}
            >
              {tr("Nộp hồ sơ trên Cổng DVC", "Submit on the public service portal")}
              <ExternalLink className="size-5" />
            </a>
          )}
        </div>
      </section>

      {/* Nội dung */}
      <div className="mx-auto max-w-4xl px-4 pb-32 pt-10 sm:px-6 sm:pt-14">
        <Reveal className="mb-10 sm:mb-12">
          <PortalLoginNotice />
        </Reveal>

        <ProcedureSteps slug={slug} steps={displaySteps} />

        {/* Video hướng dẫn */}
        {videoUrl && (
          <div className="mt-14 scroll-mt-20 sm:mt-16" id="video">
            <Reveal>
              <div className="mb-4 flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-600 text-accent-300 ring-1 ring-accent-500/50">
                  <PlayCircle className="size-5" />
                </span>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  {tr("Video hướng dẫn", "Step-by-step video")}
                </h2>
              </div>
              <VideoPlayer src={videoUrl} poster={thumbnailUrl} />
            </Reveal>
          </div>
        )}

        {/* CTA cuối */}
        <Reveal className="mt-14 sm:mt-16">
          <div className="ring-gold relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-6 text-white shadow-2xl shadow-brand-800/30 sm:p-12">
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-accent-400/15 blur-2xl" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 opacity-10">
              <DrumMotif className="h-full w-full text-accent-300" />
            </div>
            <div className="relative">
              <h2 className="font-display text-xl font-bold sm:text-3xl">
                {tr("Sẵn sàng nộp hồ sơ?", "Ready to submit?")}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-brand-100 sm:text-base">
                {tr(
                  "Sau khi đã xem hết hướng dẫn, bấm nút bên dưới để chuyển tới trang đăng ký hồ sơ trực tuyến tương ứng.",
                  "Once you have gone through the guide, tap the button below to open the matching online application page.",
                )}
              </p>
              <div className="mt-6">
                {registrationUrl ? (
                  <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-brand-700 shadow-lg transition hover:bg-brand-50 active:scale-[.98] sm:w-auto"
                  >
                    {tr("Nộp hồ sơ ngay", "Submit now")}
                    <ArrowRight className="size-5" />
                  </a>
                ) : (
                  <span className="text-sm text-brand-100">
                    {tr(
                      "Chưa cấu hình link đăng ký cho thủ tục này.",
                      "No application link has been configured for this procedure yet.",
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
