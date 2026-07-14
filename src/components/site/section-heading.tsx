import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";

export function SectionHeading({
  eyebrow,
  title,
  desc,
  center,
  className,
}: {
  eyebrow?: string;
  title: string;
  desc?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "text-center", className)}>
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-600",
              center && "justify-center",
            )}
          >
            <span className="h-px w-7 bg-brand-400/70" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <RevealText
        as="h2"
        text={title}
        className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
      />
      {desc && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed text-slate-500",
              center ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}
