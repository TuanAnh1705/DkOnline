import { cn } from "@/lib/utils";

/**
 * Hoa văn trống đồng Đông Sơn — ngôi sao nhiều cánh + các vành tròn đồng tâm.
 * Dùng làm hoạ tiết nền mờ, nét vàng thếp.
 */
/** Làm tròn cố định để chuỗi toạ độ khớp nhau giữa server và client (tránh hydration mismatch). */
const r = (n: number) => n.toFixed(2);

export function DrumMotif({ className }: { className?: string }) {
  const rays = Array.from({ length: 14 });
  const cx = 100;
  const cy = 100;
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={cn("text-accent-500", className)}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="0.9">
        {/* các vành đồng tâm */}
        <circle cx={cx} cy={cy} r="96" />
        <circle cx={cx} cy={cy} r="82" />
        <circle cx={cx} cy={cy} r="66" strokeDasharray="2 3" />
        <circle cx={cx} cy={cy} r="52" />
        <circle cx={cx} cy={cy} r="30" />
      </g>
      {/* ngôi sao 14 cánh ở tâm */}
      <g fill="currentColor" opacity="0.9">
        {rays.map((_, i) => {
          const a = (i / rays.length) * Math.PI * 2;
          const r1 = 26;
          const r2 = 7;
          const x1 = r(cx + Math.cos(a) * r1);
          const y1 = r(cy + Math.sin(a) * r1);
          const x2 = r(cx + Math.cos(a + 0.16) * r2);
          const y2 = r(cy + Math.sin(a + 0.16) * r2);
          const x3 = r(cx + Math.cos(a - 0.16) * r2);
          const y3 = r(cy + Math.sin(a - 0.16) * r2);
          return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} />;
        })}
        <circle cx={cx} cy={cy} r="4.5" />
      </g>
      {/* vành răng cưa ngoài */}
      <g stroke="currentColor" strokeWidth="0.8">
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={r(cx + Math.cos(a) * 82)}
              y1={r(cy + Math.sin(a) * 82)}
              x2={r(cx + Math.cos(a) * 90)}
              y2={r(cy + Math.sin(a) * 90)}
            />
          );
        })}
      </g>
    </svg>
  );
}

/** Đường phân cách trang trí: chỉ vàng + hạt ngọc ở giữa. */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <span className="rule-gold h-px w-16 sm:w-24" />
      <svg viewBox="0 0 24 24" className="size-3 text-accent-500" aria-hidden="true">
        <path
          d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"
          fill="currentColor"
        />
      </svg>
      <span className="rule-gold h-px w-16 sm:w-24" />
    </div>
  );
}
