"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { peekTranslation, queueTranslate } from "@/lib/translate";

/**
 * Dịch một đoạn nội dung lấy từ CSDL theo ngôn ngữ đang xem.
 * Các lời gọi rải rác trên cùng một trang được gom thành một request duy nhất
 * (xem hàng đợi trong `@/lib/translate`).
 */
export function useTranslated<T extends string | null | undefined>(text: T): T {
  const { lang } = useLang();
  const source = typeof text === "string" ? text : "";

  const [value, setValue] = useState<string>(() =>
    lang === "en" && source ? (peekTranslation(source, "vi", "en") ?? source) : source,
  );

  useEffect(() => {
    if (lang !== "en" || !source) {
      setValue(source);
      return;
    }
    const cached = peekTranslation(source, "vi", "en");
    if (cached) {
      setValue(cached);
      return;
    }
    let alive = true;
    setValue(source);
    queueTranslate(source, "vi", "en").then((out) => {
      if (alive) setValue(out);
    });
    return () => {
      alive = false;
    };
  }, [lang, source]);

  return (typeof text === "string" ? value : text) as T;
}
