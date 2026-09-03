// Wrapper cho SpeechSynthesis: chỉ 1 câu đọc tại 1 thời điểm trong toàn site.
// Các nút loa (mỗi bước 1 nút) subscribe để biết bước nào đang được đọc.

type Listener = (activeId: string | null) => void;
type SpeechLang = "vi" | "en";

let activeId: string | null = null;
const listeners = new Set<Listener>();

function setActive(id: string | null) {
  activeId = id;
  listeners.forEach((l) => l(id));
}

export function subscribeActiveTts(cb: Listener): () => void {
  listeners.add(cb);
  cb(activeId);
  return () => listeners.delete(cb);
}

export function isTtsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function hasLang(voices: SpeechSynthesisVoice[], lang: SpeechLang) {
  return voices.some((v) => v.lang?.toLowerCase().startsWith(lang));
}

// Trên Windows, Chrome nạp giọng "Google ..." (mạng) gần như ngay lập tức,
// rồi mới nạp giọng cục bộ của hệ điều hành (vd "Microsoft An - Vietnamese")
// qua một sự kiện voiceschanged RIÊNG, đến muộn hơn. Nếu chốt kết quả ngay khi
// getVoices() lần đầu trả về danh sách không rỗng, giọng tiếng Việt cục bộ có
// thể chưa kịp xuất hiện — nút loa bị tắt oan dù máy có sẵn giọng Việt.
// Vì vậy: chờ tới khi thấy giọng "vi" (chốt ngay), hoặc poll tối đa ~2.5s rồi
// lấy danh sách đầy đủ nhất từng thấy được.
function loadVoices(lang: SpeechLang = "vi"): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    let resolved = false;
    let best: SpeechSynthesisVoice[] = [];

    const settle = (voices: SpeechSynthesisVoice[]) => {
      if (resolved) return;
      resolved = true;
      window.speechSynthesis.removeEventListener("voiceschanged", check);
      clearInterval(poll);
      clearTimeout(timeout);
      resolve(voices);
    };

    const check = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > best.length) best = voices;
      if (hasLang(voices, lang)) settle(voices);
    };

    const poll = setInterval(check, 200);
    const timeout = setTimeout(() => settle(best), 2500);

    window.speechSynthesis.addEventListener("voiceschanged", check);
    check();
  });
}

/** Máy có giọng đọc cho ngôn ngữ đang xem hay không (nút loa tắt nếu không có). */
export async function hasVoiceFor(lang: SpeechLang): Promise<boolean> {
  if (!isTtsSupported()) return false;
  const voices = await loadVoices(lang);
  return hasLang(voices, lang);
}

export async function speakStep(
  id: string,
  text: string,
  lang: SpeechLang = "vi",
): Promise<void> {
  if (!isTtsSupported()) return;
  window.speechSynthesis.cancel();
  const voices = await loadVoices(lang);
  const voice = voices.find((v) => v.lang?.toLowerCase().startsWith(lang));

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "en" ? "en-US" : "vi-VN";
  if (voice) utterance.voice = voice;
  utterance.rate = 0.95;
  utterance.onend = () => {
    if (activeId === id) setActive(null);
  };
  utterance.onerror = () => {
    if (activeId === id) setActive(null);
  };

  setActive(id);
  window.speechSynthesis.speak(utterance);
}

export function stopTts() {
  if (isTtsSupported()) window.speechSynthesis.cancel();
  setActive(null);
}
