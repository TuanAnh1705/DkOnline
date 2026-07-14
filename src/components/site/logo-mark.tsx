import { cn } from "@/lib/utils";

/** Logo dạng toà nhà hành chính (mái + cột trụ) — nét trắng trên nền gradient. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-lg shadow-brand-600/30",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-[60%]"
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
