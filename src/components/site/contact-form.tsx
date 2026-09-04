"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Label, Input, Textarea } from "@/components/ui/field";
import { Button, buttonClass } from "@/components/ui/button";
import { useTr } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Trang này không có hộp thư hỗ trợ được theo dõi thường xuyên (xem trang Liên hệ),
 * nên form chỉ soạn sẵn nội dung để bạn tự sao chép hoặc mở email gửi đi — không có
 * gì được gửi ngầm hay lưu lại phía máy chủ.
 */
export function ContactForm() {
  const tr = useTr();
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const composed = [
    `${tr("Họ tên", "Name")}: ${name || tr("(chưa nhập)", "(not provided)")}`,
    `${tr("Chủ đề", "Topic")}: ${topic || tr("(chưa nhập)", "(not provided)")}`,
    "",
    message,
  ].join("\n");

  const canSend = message.trim().length > 0;

  async function handleCopy() {
    if (!canSend) return;
    try {
      await navigator.clipboard.writeText(composed);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard bị chặn — người dùng có thể tự bôi đen sao chép */
    }
  }

  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    topic
      ? `[Cẩm nang hướng dẫn nộp hồ sơ trực tuyến] ${topic}`
      : "[Cẩm nang hướng dẫn nộp hồ sơ trực tuyến] Câu hỏi",
  )}&body=${encodeURIComponent(composed)}`;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">{tr("Họ tên", "Name")}</Label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={tr("Không bắt buộc", "Optional")}
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="contact-topic">{tr("Chủ đề", "Topic")}</Label>
          <Input
            id="contact-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={tr("Ví dụ: Lỗi hiển thị video hướng dẫn", "e.g. Video guide won't play")}
          />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="contact-message" required>
          {tr("Nội dung câu hỏi", "Your question")}
        </Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={tr(
            "Mô tả ngắn gọn thắc mắc hoặc góp ý của bạn…",
            "Briefly describe your question or feedback…",
          )}
          rows={5}
        />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink/50">
        {tr(
          "Trang cẩm nang này chưa có hộp thư hỗ trợ được theo dõi thường xuyên, nên nội dung sẽ không được gửi đi ở đây — hãy sao chép hoặc mở email để tự gửi qua kênh bạn tin tưởng. Cách nhanh nhất vẫn là gọi tổng đài 18001096.",
          "This guide has no support inbox that's actively monitored, so nothing is sent from here — copy the text or open your email app to send it through a channel you trust. Calling the 18001096 hotline is still the fastest option.",
        )}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="secondary"
          onClick={handleCopy}
          disabled={!canSend}
          className={cn(!canSend && "cursor-not-allowed")}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? tr("Đã sao chép", "Copied") : tr("Sao chép nội dung", "Copy text")}
        </Button>
        <a
          href={canSend ? mailtoHref : undefined}
          aria-disabled={!canSend}
          className={cn(
            buttonClass("primary", "md"),
            !canSend && "pointer-events-none opacity-60",
          )}
        >
          <Mail className="size-4" />
          {tr("Mở ứng dụng email", "Open email app")}
        </a>
      </div>
    </div>
  );
}
