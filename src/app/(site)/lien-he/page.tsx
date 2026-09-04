import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MapPinned, MessageCircleQuestion, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { T, type Bi } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Các kênh hỗ trợ khi nộp hồ sơ dịch vụ công trực tuyến: tổng đài Cổng Dịch vụ công Quốc gia, trung tâm hành chính công, và câu hỏi thường gặp.",
};

const CHANNELS: { icon: typeof Phone; title: Bi; desc: Bi; action: Bi; href: string; external?: boolean }[] = [
  {
    icon: Phone,
    title: { vi: "Tổng đài Cổng Dịch vụ công Quốc gia", en: "National Public Service Portal hotline" },
    desc: {
      vi: "Kênh chính thức, nhanh nhất cho các vấn đề về tài khoản, hồ sơ đang xử lý, thanh toán.",
      en: "The official, fastest channel for account issues, applications in progress, and payments.",
    },
    action: { vi: "Gọi 18001096", en: "Call 18001096" },
    href: "tel:18001096",
  },
  {
    icon: MessageCircleQuestion,
    title: { vi: "Câu hỏi thường gặp", en: "Frequently asked questions" },
    desc: {
      vi: "Rất nhiều thắc mắc phổ biến đã được trả lời sẵn — thử tìm trước khi liên hệ.",
      en: "Most common questions already have an answer — search there before reaching out.",
    },
    action: { vi: "Xem hỏi đáp", en: "Browse FAQ" },
    href: "/cau-hoi-thuong-gap",
  },
  {
    icon: MapPinned,
    title: { vi: "Trung tâm phục vụ hành chính công", en: "Public administration service centre" },
    desc: {
      vi: "Nếu cần hỗ trợ trực tiếp, đến trung tâm hành chính công tại tỉnh/thành nơi bạn cư trú.",
      en: "For in-person help, visit the public administration service centre in your province or city.",
    },
    action: { vi: "Tìm trên Cổng DVC", en: "Find on the portal" },
    href: "https://dichvucong.gov.vn",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={{ vi: "Liên hệ", en: "Contact" }}
        title={{ vi: "Chúng tôi sẵn sàng hỗ trợ bạn", en: "We're here to help" }}
        desc={{
          vi: "Trang cẩm nang này không xử lý hồ sơ hay đăng nhập thay bạn — dưới đây là những kênh hỗ trợ thật cho từng nhu cầu.",
          en: "This guide never processes applications or signs in on your behalf — here are the real channels for each kind of need.",
        }}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {CHANNELS.map((c) => (
            <StaggerItem key={c.title.vi}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
                <div className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <c.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-bold text-slate-900">
                  <T {...c.title} />
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">
                  <T {...c.desc} />
                </p>
                {c.external ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800"
                  >
                    <T {...c.action} /> <ExternalLink className="size-3.5" />
                  </a>
                ) : (
                  <Link
                    href={c.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800"
                  >
                    <T {...c.action} /> →
                  </Link>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow={{ vi: "Gửi câu hỏi", en: "Send a question" }}
            title={{ vi: "Soạn nhanh nội dung cần hỏi", en: "Draft your question" }}
            desc={{
              vi: "Điền vài dòng, rồi sao chép hoặc mở email để gửi qua kênh bạn muốn.",
              en: "Fill in a few lines, then copy or open your email app to send it however you prefer.",
            }}
          />
          <Reveal delay={0.15} className="mt-8">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
