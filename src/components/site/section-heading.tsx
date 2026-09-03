"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { useTr, type Bi } from "@/lib/i18n";

export function SectionHeading({
  eyebrow,
  title,
  desc,
  center,
  className,
}: {
  eyebrow?: Bi;
  title: Bi;
  desc?: Bi;
  center?: boolean;
  className?: string;
}) {
  const tr = useTr();

  return (
    <div className={cn(center && "text-center", className)}>
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-600",
              center && "justify-center",
            )}
          >
            <span className="rule-gold h-px w-8" />
            {tr(eyebrow)}
            {center && <span className="rule-gold h-px w-8" />}
          </span>
        </Reveal>
      )}
      <RevealText
        as="h2"
        text={tr(title)}
        className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl"
      />
      {desc && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed text-slate-500 sm:text-lg",
              center ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {tr(desc)}
          </p>
        </Reveal>
      )}
    </div>
  );
}
