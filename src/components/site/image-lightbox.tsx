"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { getLenis } from "@/lib/lenis-singleton";
import { useTr } from "@/lib/i18n";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const tr = useTr();
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{
    pointers: Map<number, { x: number; y: number }>;
    lastDist: number | null;
    lastPos: { x: number; y: number } | null;
  }>({ pointers: new Map(), lastDist: null, lastPos: null });

  // Khoá cuộn nền (Lenis + fallback native) trong lúc mở modal
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function clampScale(s: number) {
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
  }

  function resetIfMin(next: number) {
    if (next <= MIN_SCALE) setPos({ x: 0, y: 0 });
  }

  function zoomBy(delta: number) {
    setScale((s) => {
      const next = clampScale(s + delta);
      resetIfMin(next);
      return next;
    });
  }

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    zoomBy(e.deltaY > 0 ? -0.35 : 0.35);
  }

  function onDoubleClick() {
    setScale((s) => {
      const next = s > MIN_SCALE ? MIN_SCALE : 2.5;
      resetIfMin(next);
      return next;
    });
  }

  function onPointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (dragRef.current.pointers.size === 1) {
      dragRef.current.lastPos = { x: e.clientX, y: e.clientY };
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    const { pointers } = dragRef.current;
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dragRef.current.lastDist != null) {
        const ratio = dist / dragRef.current.lastDist;
        setScale((s) => {
          const next = clampScale(s * ratio);
          resetIfMin(next);
          return next;
        });
      }
      dragRef.current.lastDist = dist;
    } else if (pointers.size === 1 && dragRef.current.lastPos) {
      const dx = e.clientX - dragRef.current.lastPos.x;
      const dy = e.clientY - dragRef.current.lastPos.y;
      dragRef.current.lastPos = { x: e.clientX, y: e.clientY };
      setScale((s) => {
        if (s > MIN_SCALE) {
          setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
        }
        return s;
      });
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    dragRef.current.pointers.delete(e.pointerId);
    dragRef.current.lastDist = dragRef.current.pointers.size === 2 ? dragRef.current.lastDist : null;
    dragRef.current.lastPos = dragRef.current.pointers.size === 1 ? dragRef.current.lastPos : null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-ink/90 backdrop-blur-sm"
      data-lenis-prevent
      data-no-print
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-end gap-2 p-3 sm:p-4">
        <button
          type="button"
          onClick={() => zoomBy(-0.6)}
          className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label={tr("Thu nhỏ", "Zoom out")}
        >
          <ZoomOut className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => zoomBy(0.6)}
          className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label={tr("Phóng to", "Zoom in")}
        >
          <ZoomIn className="size-5" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label={tr("Đóng", "Close")}
        >
          <X className="size-5" />
        </button>
      </div>

      <div
        className="relative flex-1 touch-none select-none overflow-hidden"
        onWheel={onWheel}
        onDoubleClick={onDoubleClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transition: dragRef.current.pointers.size > 0 ? "none" : "transform 0.15s ease-out",
            cursor: scale > MIN_SCALE ? "grab" : "zoom-in",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className="object-contain"
            draggable={false}
          />
        </div>
      </div>

      <p className="px-4 pb-4 text-center text-xs text-white/60 sm:text-sm">
        {tr(
          "Chụm hai ngón tay hoặc cuộn chuột để phóng to · bấm đúp để zoom nhanh · Esc để đóng",
          "Pinch or scroll to zoom · double-tap for quick zoom · press Esc to close",
        )}
      </p>
    </div>
  );
}
