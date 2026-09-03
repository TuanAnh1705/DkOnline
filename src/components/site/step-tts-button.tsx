"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  hasVoiceFor,
  isTtsSupported,
  speakStep,
  stopTts,
  subscribeActiveTts,
} from "@/lib/tts";
import { useLang, useTr } from "@/lib/i18n";

export function StepTtsButton({ stepId, text }: { stepId: string; text: string }) {
  const { lang } = useLang();
  const tr = useTr();
  const [supported, setSupported] = useState(true);
  const [hasVoice, setHasVoice] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(isTtsSupported());
    return subscribeActiveTts((activeId) => setSpeaking(activeId === stepId));
  }, [stepId]);

  // Đổi ngôn ngữ thì kiểm tra lại giọng đọc tương ứng và dừng câu đang đọc dở.
  useEffect(() => {
    let alive = true;
    hasVoiceFor(lang).then((ok) => {
      if (alive) setHasVoice(ok);
    });
    stopTts();
    return () => {
      alive = false;
    };
  }, [lang]);

  if (!supported) return null;

  const disabled = !hasVoice;
  const label = speaking
    ? tr("Dừng đọc", "Stop reading")
    : tr("Đọc to nội dung bước này", "Read this step aloud");

  return (
    <button
      type="button"
      data-no-print
      disabled={disabled}
      onClick={() => (speaking ? stopTts() : speakStep(stepId, text, lang))}
      title={
        disabled
          ? tr(
              "Máy này chưa có giọng đọc tiếng Việt",
              "This device has no English voice installed",
            )
          : label
      }
      aria-label={label}
      className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/15 sm:size-8"
    >
      {speaking ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
    </button>
  );
}
