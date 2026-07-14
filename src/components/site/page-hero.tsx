import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";

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
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-accent-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        {eyebrow && (
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
              <span className="h-px w-7 bg-brand-400/70" />
              {eyebrow}
            </span>
          </Reveal>
        )}
        <RevealText
          as="h1"
          text={title}
          className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        />
        {desc && (
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              {desc}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
