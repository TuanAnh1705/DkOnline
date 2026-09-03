"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "vi" | "en";

/** Một cặp chữ song ngữ dùng cho các nhãn tĩnh (không phải nội dung từ CSDL) */
export interface Bi {
  vi: string;
  en: string;
}

const STORAGE_KEY = "nophso:lang";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangCtx>({
  lang: "vi",
  setLang: () => {},
  toggle: () => {},
});

/**
 * Ngôn ngữ hiển thị toàn site. Server luôn render tiếng Việt để HTML tĩnh
 * (SSG/ISR) khớp lúc hydrate; lựa chọn của người dùng được đọc lại từ
 * localStorage ngay sau khi mount.
 */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "en") setLangState("en");
    } catch {
      /* localStorage bị chặn — giữ tiếng Việt */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* bỏ qua */
    }
  }, []);

  const value = useMemo<LangCtx>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "vi" ? "en" : "vi"),
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/**
 * `tr("Xin chào", "Hello")` hoặc `tr({ vi: "Xin chào", en: "Hello" })`.
 * Dùng cho chuỗi nằm trong thuộc tính (aria-label, title, placeholder…).
 */
export function useTr() {
  const { lang } = useLang();
  return useCallback(
    (vi: string | Bi, en?: string) => {
      if (typeof vi === "string") return lang === "en" && en !== undefined ? en : vi;
      return lang === "en" ? vi.en : vi.vi;
    },
    [lang],
  );
}

/** Nhãn tĩnh song ngữ dùng trực tiếp trong JSX (kể cả từ Server Component). */
export function T({ vi, en }: Bi) {
  const tr = useTr();
  return <>{tr(vi, en)}</>;
}
