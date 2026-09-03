// Dịch máy VI↔EN cho nội dung động lấy từ CSDL (tiêu đề, tóm tắt, các bước).
//
// Mọi câu cần dịch trong cùng một khoảnh khắc được gom lại thành MỘT request
// tới /api/translate. Trước đây mỗi bước gọi một request riêng nên thủ tục
// hơn 20 bước bị dịch vụ dịch miễn phí chặn theo IP và trả lại nguyên văn
// tiếng Việt — trang bị "dịch nửa vời". Kết quả được cache theo
// (chiều dịch + câu gốc) nên bấm qua lại VI↔EN không gọi lại mạng.

import type { Lang } from "@/lib/i18n";

const cache = new Map<string, string>();

function key(text: string, from: Lang, to: Lang) {
  return `${from}|${to}:${text}`;
}

/** Bản dịch đã có sẵn trong cache (đọc đồng bộ, dùng cho lần render đầu). */
export function peekTranslation(text: string, from: Lang, to: Lang): string | null {
  if (from === to) return text;
  return cache.get(key(text.trim(), from, to)) ?? null;
}

/**
 * Dịch nhiều câu trong một lần gọi. Luôn trả về mảng cùng độ dài với đầu vào;
 * câu nào dịch lỗi thì giữ nguyên văn bản gốc.
 */
export async function translateMany(
  texts: string[],
  from: Lang,
  to: Lang,
): Promise<string[]> {
  if (from === to || texts.length === 0) return texts;

  const needed = [
    ...new Set(
      texts.map((t) => t.trim()).filter((t) => t && !cache.has(key(t, from, to))),
    ),
  ];

  if (needed.length > 0) {
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: needed, from, to }),
      });
      if (res.ok) {
        const data = (await res.json()) as { translations?: unknown };
        const list = Array.isArray(data.translations) ? data.translations : [];
        needed.forEach((source, i) => {
          const value = list[i];
          if (typeof value === "string" && value.trim()) {
            cache.set(key(source, from, to), value);
          }
        });
      }
    } catch {
      /* mất mạng — trả nguyên văn bên dưới */
    }
  }

  return texts.map((t) => {
    const trimmed = t.trim();
    if (!trimmed) return t;
    return cache.get(key(trimmed, from, to)) ?? t;
  });
}

/** Dịch một câu (dùng lại cùng cache với translateMany). */
export async function translateText(text: string, from: Lang, to: Lang): Promise<string> {
  const [out] = await translateMany([text], from, to);
  return out;
}

// --- Gom nhóm tự động -------------------------------------------------------
// Nhiều thẻ trên cùng một trang (danh sách thủ tục, lĩnh vực…) mỗi thẻ yêu cầu
// dịch riêng; hàng đợi dưới đây gộp tất cả yêu cầu phát sinh trong ~40ms thành
// một request duy nhất.

const FLUSH_MS = 40;

type Waiter = (value: string) => void;
const pending = new Map<string, { text: string; from: Lang; to: Lang; waiters: Waiter[] }>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;

async function flush() {
  flushTimer = null;
  const batch = [...pending.values()];
  pending.clear();
  if (batch.length === 0) return;

  // Mỗi chiều dịch là một request riêng (thực tế gần như luôn chỉ có một chiều).
  const byDirection = new Map<string, typeof batch>();
  for (const item of batch) {
    const dir = `${item.from}|${item.to}`;
    const list = byDirection.get(dir);
    if (list) list.push(item);
    else byDirection.set(dir, [item]);
  }

  await Promise.all(
    [...byDirection.values()].map(async (items) => {
      const { from, to } = items[0];
      const out = await translateMany(
        items.map((i) => i.text),
        from,
        to,
      );
      items.forEach((item, i) => item.waiters.forEach((w) => w(out[i] ?? item.text)));
    }),
  );
}

/** Xếp một câu vào hàng đợi dịch chung; trả về bản dịch khi lô được gửi đi. */
export function queueTranslate(text: string, from: Lang, to: Lang): Promise<string> {
  const trimmed = text.trim();
  if (from === to || !trimmed) return Promise.resolve(text);

  const cached = cache.get(key(trimmed, from, to));
  if (cached) return Promise.resolve(cached);

  return new Promise<string>((resolve) => {
    const k = key(trimmed, from, to);
    const entry = pending.get(k);
    if (entry) entry.waiters.push(resolve);
    else pending.set(k, { text: trimmed, from, to, waiters: [resolve] });
    if (!flushTimer) flushTimer = setTimeout(flush, FLUSH_MS);
  });
}
