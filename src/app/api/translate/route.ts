import { NextResponse } from "next/server";

/**
 * Dịch máy VI↔EN chạy phía server.
 *
 * Vì sao không gọi thẳng từ trình duyệt: một thủ tục có tới ~26 bước, gọi song
 * song 26 request tới dịch vụ miễn phí sẽ bị chặn theo IP và phần lớn đoạn trả
 * về nguyên văn tiếng Việt — đó chính là lỗi "dịch không hết". Ở đây các câu
 * được gộp thành lô, gọi tuần tự có giới hạn, có nguồn dự phòng và có cache.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lang = "vi" | "en";

const MAX_TEXTS = 400;
const MAX_TEXT_LEN = 5000;
const BATCH_CHARS = 1200; // tổng ký tự mỗi lần gọi Google
const CONCURRENCY = 4;
const MYMEMORY_CHARS = 450; // hạn mức cho khách ẩn danh
const TIMEOUT_MS = 12000;

// Cache theo tiến trình: người sau mở cùng thủ tục là có ngay, không gọi mạng.
const cache = new Map<string, string>();
const CACHE_MAX = 5000;

function cacheGet(key: string) {
  return cache.get(key);
}

function cacheSet(key: string, value: string) {
  if (cache.size >= CACHE_MAX) {
    // xoá bớt 10% mục cũ nhất (Map giữ thứ tự chèn)
    const drop = Math.ceil(CACHE_MAX * 0.1);
    let i = 0;
    for (const k of cache.keys()) {
      cache.delete(k);
      if (++i >= drop) break;
    }
  }
  cache.set(key, value);
}

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        // Không có User-Agent, endpoint gtx hay trả 403.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
        Accept: "application/json,text/plain,*/*",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
}

/** Nguồn chính: endpoint gtx của Google — chất lượng tốt, giữ nguyên xuống dòng. */
async function googleTranslate(text: string, from: Lang, to: Lang): Promise<string | null> {
  const url =
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=` +
    encodeURIComponent(text);
  const data = await fetchJson(url);
  if (!Array.isArray(data) || !Array.isArray(data[0])) return null;
  const out = (data[0] as unknown[])
    .map((seg) => (Array.isArray(seg) && typeof seg[0] === "string" ? seg[0] : ""))
    .join("");
  return out.trim() ? out : null;
}

/** Nguồn dự phòng: MyMemory (giới hạn ~500 ký tự/lần cho khách ẩn danh). */
async function myMemoryTranslate(text: string, from: Lang, to: Lang): Promise<string | null> {
  const parts = hardSplit(text, MYMEMORY_CHARS);
  const out: string[] = [];
  for (const part of parts) {
    const url =
      `https://api.mymemory.translated.net/get?langpair=${from}|${to}&q=` +
      encodeURIComponent(part);
    const data = (await fetchJson(url)) as
      | { responseData?: { translatedText?: string }; responseStatus?: number | string }
      | null;
    const translated = data?.responseData?.translatedText;
    const status = Number(data?.responseStatus);
    // Hết hạn mức thì MyMemory vẫn trả 200 nhưng nhét câu cảnh báo vào kết quả.
    if (
      status !== 200 ||
      typeof translated !== "string" ||
      !translated.trim() ||
      /MYMEMORY WARNING|QUERY LENGTH LIMIT|ALL AVAILABLE FREE TRANSLATIONS/i.test(translated)
    ) {
      return null;
    }
    out.push(translated);
  }
  return out.join(" ");
}

/** Cắt chuỗi quá dài theo ranh giới câu, rồi theo từ nếu vẫn còn dài. */
function hardSplit(text: string, limit: number): string[] {
  if (text.length <= limit) return [text];
  const chunks: string[] = [];
  let cur = "";
  for (const sentence of text.split(/(?<=[.!?…:;])\s+/)) {
    for (const piece of sentence.length > limit ? splitWords(sentence, limit) : [sentence]) {
      if (cur && cur.length + piece.length + 1 > limit) {
        chunks.push(cur);
        cur = piece;
      } else {
        cur = cur ? `${cur} ${piece}` : piece;
      }
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

function splitWords(text: string, limit: number): string[] {
  const out: string[] = [];
  let cur = "";
  for (const w of text.split(/\s+/)) {
    if (cur && cur.length + w.length + 1 > limit) {
      out.push(cur);
      cur = w;
    } else {
      cur = cur ? `${cur} ${w}` : w;
    }
  }
  if (cur) out.push(cur);
  return out;
}

async function translateOne(text: string, from: Lang, to: Lang): Promise<string> {
  const parts = hardSplit(text, BATCH_CHARS);
  const done: string[] = [];
  for (const part of parts) {
    const viaGoogle = await googleTranslate(part, from, to);
    if (viaGoogle) {
      done.push(viaGoogle);
      continue;
    }
    const viaMyMemory = await myMemoryTranslate(part, from, to);
    done.push(viaMyMemory ?? part);
  }
  return done.join(" ");
}

/**
 * Gộp nhiều câu ngắn vào một lần gọi bằng cách nối bằng ký tự xuống dòng —
 * Google giữ nguyên vị trí xuống dòng nên tách lại được. Nếu số dòng trả về
 * không khớp, quay lại dịch từng câu để không bao giờ trả nhầm câu.
 */
async function translateBatch(texts: string[], from: Lang, to: Lang): Promise<string[]> {
  if (texts.length === 1) return [await translateOne(texts[0], from, to)];

  const joined = texts.join("\n");
  const result = await googleTranslate(joined, from, to);
  if (result) {
    const lines = result.split("\n");
    if (lines.length === texts.length) {
      return lines.map((line, i) => (line.trim() ? line.trim() : texts[i]));
    }
  }
  const out: string[] = [];
  for (const t of texts) out.push(await translateOne(t, from, to));
  return out;
}

function makeBatches(texts: string[]): string[][] {
  const batches: string[][] = [];
  let cur: string[] = [];
  let size = 0;
  for (const t of texts) {
    // Câu dài hoặc có xuống dòng thì đi riêng để không phá cách tách theo dòng.
    if (t.length > BATCH_CHARS / 2 || t.includes("\n")) {
      batches.push([t]);
      continue;
    }
    if (cur.length && size + t.length > BATCH_CHARS) {
      batches.push(cur);
      cur = [];
      size = 0;
    }
    cur.push(t);
    size += t.length + 1;
  }
  if (cur.length) batches.push(cur);
  return batches;
}

/** Chạy các lô với số kết nối đồng thời có giới hạn để không bị chặn theo IP. */
async function runPool<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await worker(items[i]);
    }
  });
  await Promise.all(runners);
  return results;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    texts?: unknown;
    from?: unknown;
    to?: unknown;
  } | null;

  const from: Lang = body?.from === "en" ? "en" : "vi";
  const to: Lang = body?.to === "vi" ? "vi" : "en";
  const raw = Array.isArray(body?.texts) ? body.texts : null;

  if (!raw) {
    return NextResponse.json({ error: "Thiếu danh sách văn bản cần dịch" }, { status: 400 });
  }
  if (from === to) {
    return NextResponse.json({ translations: raw.map((t) => String(t ?? "")) });
  }
  if (raw.length > MAX_TEXTS) {
    return NextResponse.json({ error: "Quá nhiều đoạn văn bản" }, { status: 413 });
  }

  const texts = raw.map((t) => (typeof t === "string" ? t.slice(0, MAX_TEXT_LEN) : ""));

  // Chỉ dịch những câu chưa có trong cache, và mỗi câu trùng nhau chỉ dịch 1 lần.
  const missing: string[] = [];
  const seen = new Set<string>();
  for (const text of texts) {
    const trimmed = text.trim();
    if (!trimmed) continue;
    const key = `${from}|${to}:${trimmed}`;
    if (cacheGet(key) !== undefined || seen.has(trimmed)) continue;
    seen.add(trimmed);
    missing.push(trimmed);
  }

  if (missing.length) {
    const batches = makeBatches(missing);
    const translated = await runPool(batches, CONCURRENCY, (batch) =>
      translateBatch(batch, from, to),
    );
    batches.forEach((batch, bi) => {
      batch.forEach((source, si) => {
        cacheSet(`${from}|${to}:${source}`, translated[bi]?.[si] ?? source);
      });
    });
  }

  const translations = texts.map((text) => {
    const trimmed = text.trim();
    if (!trimmed) return text;
    return cacheGet(`${from}|${to}:${trimmed}`) ?? text;
  });

  return NextResponse.json({ translations });
}
