"use client";

export function VideoPlayer({
  src,
  poster,
}: {
  src: string;
  poster?: string | null;
}) {
  return (
    <div className="ring-gold overflow-hidden rounded-2xl border border-accent-500/30 bg-brand-900 p-1.5 shadow-xl shadow-brand-900/15">
      <div className="overflow-hidden rounded-xl bg-black">
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
    </div>
  );
}
