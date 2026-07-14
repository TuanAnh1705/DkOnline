"use client";

export function VideoPlayer({
  src,
  poster,
}: {
  src: string;
  poster?: string | null;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-lg">
      <video
        controls
        preload="metadata"
        poster={poster || undefined}
        className="aspect-video w-full"
      >
        <source src={src} />
        Trình duyệt của bạn không hỗ trợ phát video.
      </video>
    </div>
  );
}
