import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";
import { DrumMotif } from "@/components/site/ornament";

export function PageHero({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow?: string;
  title: string;
  desc?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-parchment to-cream">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] opacity-[0.07]">
        <DrumMotif className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-accent-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        {eyebrow && (
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-600">
              <span className="rule-gold h-px w-8" />
              {eyebrow}
            </span>
          </Reveal>
        )}
        <RevealText
          as="h1"
          text={title}
          className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
        />
        {desc && (
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/65">
              {desc}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
