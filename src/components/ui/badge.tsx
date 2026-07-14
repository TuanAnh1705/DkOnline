import { cn } from "@/lib/utils";

type Tone = "brand" | "green" | "amber" | "slate" | "accent";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-600/15",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/15",
  slate: "bg-slate-100 text-slate-600 ring-slate-500/15",
  accent: "bg-orange-50 text-accent-600 ring-accent-500/15",
};

export function Badge({
  tone = "slate",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
