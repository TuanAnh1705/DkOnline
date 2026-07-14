import { cn } from "@/lib/utils";

/** Con dấu sơn son thếp vàng: nền đỏ sơn mài, vành vàng, nét vàng toà nhà hành chính. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-lg shadow-brand-800/30 ring-1 ring-accent-500/50",
        className,
      )}
    >
      {/* vành vàng mảnh bên trong */}
      <span className="pointer-events-none absolute inset-[3px] rounded-[8px] border border-accent-400/45" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative size-[58%] text-accent-300"
        aria-hidden="true"
      >
        {/* mái tam giác */}
        <path d="M12 3.4 3.7 7.7h16.6L12 3.4Z" />
        {/* cột trụ */}
        <path d="M5.7 10.4v6.2M9.9 10.4v6.2M14.1 10.4v6.2M18.3 10.4v6.2" />
        {/* bệ nền */}
        <path d="M4 19.5h16" />
      </svg>
    </span>
  );
}
