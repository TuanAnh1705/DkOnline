"use client";

import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";
import { DrumMotif } from "@/components/site/ornament";
import { useTr, type Bi } from "@/lib/i18n";
import { useTranslated } from "@/lib/use-translated";

/**
 * Quy ước: nhãn tĩnh truyền vào dạng cặp song ngữ `{ vi, en }`; chuỗi thường là
 * nội dung lấy từ CSDL nên sẽ được dịch máy khi người dùng chọn tiếng Anh.
 */
export function PageHero({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow?: Bi | string;
  title: Bi | string;
  desc?: Bi | string;
  children?: React.ReactNode;
}) {
  const tr = useTr();

  const rawTitle = typeof title === "string" ? title : "";
  const rawDesc = typeof desc === "string" ? desc : "";
  const rawEyebrow = typeof eyebrow === "string" ? eyebrow : "";

  const dynamicTitle = useTranslated(rawTitle);
  const dynamicDesc = useTranslated(rawDesc);
  const dynamicEyebrow = useTranslated(rawEyebrow);

  const shownTitle = typeof title === "string" ? dynamicTitle : tr(title);
  const shownDesc = desc ? (typeof desc === "string" ? dynamicDesc : tr(desc)) : null;
  const shownEyebrow = eyebrow
    ? typeof eyebrow === "string"
      ? dynamicEyebrow
      : tr(eyebrow)
    : null;

  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-parchment to-cream">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] opacity-[0.07]">
        <DrumMotif className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-accent-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        {shownEyebrow && (
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-600">
              <span className="rule-gold h-px w-8" />
              {shownEyebrow}
            </span>
          </Reveal>
        )}
        <RevealText
          as="h1"
          text={shownTitle}
          className="mt-4 font-display text-[26px] font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
        />
        {shownDesc && (
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
              {shownDesc}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
