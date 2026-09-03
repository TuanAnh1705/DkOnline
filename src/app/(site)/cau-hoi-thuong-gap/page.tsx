import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { buttonClass } from "@/components/ui/button";
import { FAQ_ITEMS } from "@/lib/faq";
import { T } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp",
  description:
    "Giải đáp các thắc mắc phổ biến khi nộp hồ sơ dịch vụ công trực tuyến: VNeID, phí, nhận kết quả…",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow={{ vi: "Hỏi đáp", en: "FAQ" }}
        title={{ vi: "Câu hỏi thường gặp", en: "Frequently asked questions" }}
        desc={{
          vi: "Những thắc mắc phổ biến khi nộp hồ sơ trực tuyến, được giải đáp ngắn gọn, dễ hiểu.",
          en: "Short, plain answers to the questions people ask most when submitting online.",
        }}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <FaqAccordion items={FAQ_ITEMS} />

        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-6 text-white shadow-xl shadow-brand-700/25 sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <h2 className="relative text-xl font-extrabold sm:text-2xl">
              <T vi="Vẫn cần hỗ trợ?" en="Still need help?" />
            </h2>
            <p className="relative mt-2 max-w-xl text-sm text-brand-100 sm:text-base">
              <T
                vi="Gọi tổng đài Cổng Dịch vụ công Quốc gia, hoặc xem lại video hướng dẫn từng bước ở mỗi thủ tục."
                en="Call the National Public Service Portal hotline, or rewatch the step-by-step video on each procedure."
              />
            </p>
            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="tel:18001096"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
              >
                <T vi="Tổng đài 18001096" en="Hotline 18001096" />
              </a>
              <Link
                href="/thu-tuc"
                className={buttonClass("ghost", "md") + " !text-white hover:!bg-white/10"}
              >
                <T vi="Xem thủ tục" en="Browse procedures" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
