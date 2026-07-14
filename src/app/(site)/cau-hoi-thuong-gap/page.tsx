import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { buttonClass } from "@/components/ui/button";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp",
  description:
    "Giải đáp các thắc mắc phổ biến khi nộp hồ sơ dịch vụ công trực tuyến: VNeID, phí, nhận kết quả…",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Hỏi đáp"
        title="Câu hỏi thường gặp"
        desc="Những thắc mắc phổ biến khi nộp hồ sơ trực tuyến, được giải đáp ngắn gọn, dễ hiểu."
      />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <FaqAccordion items={FAQ_ITEMS} />

        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-8 text-white shadow-xl shadow-brand-700/25 sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <h2 className="relative text-2xl font-extrabold">Vẫn cần hỗ trợ?</h2>
            <p className="relative mt-2 max-w-xl text-brand-100">
              Gọi tổng đài Cổng Dịch vụ công Quốc gia, hoặc xem lại video hướng
              dẫn từng bước ở mỗi thủ tục.
            </p>
            <div className="relative mt-6 flex flex-wrap gap-3">
              <a
                href="tel:18001096"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
              >
                Tổng đài 18001096
              </a>
              <Link
                href="/thu-tuc"
                className={buttonClass("ghost", "md") + " !text-white hover:!bg-white/10"}
              >
                Xem thủ tục
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
