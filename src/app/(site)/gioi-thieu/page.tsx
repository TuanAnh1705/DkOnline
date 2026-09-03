import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { buttonClass } from "@/components/ui/button";
import { T, type Bi } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Về Cẩm nang hồ sơ trực tuyến — nền tảng hướng dẫn nộp hồ sơ dịch vụ công từng bước bằng hình ảnh và video.",
};

const VALUES: { title: Bi; desc: Bi }[] = [
  {
    title: { vi: "Trực quan bằng hình ảnh", en: "Shown with screenshots" },
    desc: {
      vi: "Mỗi bước có ảnh chụp màn hình thực tế, nhìn là làm theo được ngay.",
      en: "Every step has a real screenshot, so you can follow along at a glance.",
    },
  },
  {
    title: { vi: "Video hướng dẫn", en: "Video walkthroughs" },
    desc: {
      vi: "Xem lại toàn bộ quy trình qua video để nắm chắc trước khi thao tác.",
      en: "Watch the whole process on video to feel sure before you start.",
    },
  },
  {
    title: { vi: "Làm mọi lúc, mọi nơi", en: "Anytime, anywhere" },
    desc: {
      vi: "Thao tác trên máy tính hay điện thoại, không phải xếp hàng chờ đợi.",
      en: "Works on a computer or a phone — no queueing at an office.",
    },
  },
  {
    title: { vi: "Chính xác, cập nhật", en: "Accurate and current" },
    desc: {
      vi: "Nội dung bám sát quy trình thực tế trên Cổng Dịch vụ công.",
      en: "Content follows the real workflow on the public service portal.",
    },
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={{ vi: "Về chúng tôi", en: "About us" }}
        title={{
          vi: "Giúp mọi người dân tự nộp hồ sơ trực tuyến",
          en: "Helping everyone file their own paperwork online",
        }}
        desc={{
          vi: "Cẩm nang hồ sơ trực tuyến biến những thủ tục hành chính tưởng chừng phức tạp thành các bước đơn giản, ai cũng có thể tự làm tại nhà.",
          en: "This guide turns administrative procedures that look complicated into simple steps anyone can complete from home.",
        }}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/thu-tuc" className={buttonClass("primary", "lg")}>
            <T vi="Bắt đầu ngay" en="Get started" />
          </Link>
          <Link href="/cau-hoi-thuong-gap" className={buttonClass("secondary", "lg")}>
            <T vi="Câu hỏi thường gặp" en="Frequently asked questions" />
          </Link>
        </div>
      </PageHero>

      {/* Sứ mệnh */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              eyebrow={{ vi: "Sứ mệnh", en: "Our mission" }}
              title={{
                vi: "Không ai bị bỏ lại phía sau chuyển đổi số",
                en: "No one left behind by digital government",
              }}
            />
            <Reveal delay={0.15}>
              <p className="mt-5 leading-relaxed text-slate-600">
                <T
                  vi="Dịch vụ công trực tuyến giúp tiết kiệm thời gian và công sức, nhưng không phải ai cũng quen thao tác. Chúng tôi ghi lại tỉ mỉ từng màn hình, từng nút bấm — để người lần đầu làm cũng có thể hoàn thành hồ sơ một cách tự tin."
                  en="Online public services save time and effort, but not everyone is used to them. We document every screen and every button — so even a first-timer can finish an application with confidence."
                />
              </p>
              <p className="mt-3 leading-relaxed text-slate-600">
                <T
                  vi="Toàn bộ hướng dẫn được xây dựng từ quy trình thực tế trên Cổng Dịch vụ công Quốc gia và hệ thống của các cơ quan liên quan."
                  en="Every guide is built from the real workflow on the National Public Service Portal and the systems of the agencies involved."
                />
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <StatBox value="6+" label={{ vi: "Thủ tục hướng dẫn", en: "Guided procedures" }} />
              <StatBox value="120+" label={{ vi: "Bước minh hoạ", en: "Illustrated steps" }} />
              <StatBox value="100%" label={{ vi: "Trực tuyến", en: "Online" }} />
              <StatBox value="~10'" label={{ vi: "Mỗi hồ sơ", en: "Per application" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Giá trị */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading
            center
            eyebrow={{ vi: "Vì sao chọn chúng tôi", en: "Why use this guide" }}
            title={{
              vi: "Đơn giản — Trực quan — Đáng tin",
              en: "Simple — Visual — Reliable",
            }}
          />
          <StaggerGroup className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <StaggerItem key={v.title.vi}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
                  <span className="text-sm font-black tracking-widest text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-3 h-px w-8 bg-slate-200 transition-all group-hover:w-14 group-hover:bg-brand-400" />
                  <h3 className="mt-4 font-bold text-slate-900">
                    <T {...v.title} />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    <T {...v.desc} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-7 text-center text-white shadow-2xl shadow-brand-700/30 sm:p-14">
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
            <h2 className="relative text-2xl font-extrabold sm:text-4xl">
              <T vi="Sẵn sàng tự làm hồ sơ của bạn?" en="Ready to file it yourself?" />
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm text-brand-100 sm:text-base">
              <T
                vi="Chọn thủ tục và làm theo hướng dẫn từng bước ngay hôm nay."
                en="Pick a procedure and follow the step-by-step guide today."
              />
            </p>
            <div className="relative mt-7 flex justify-center">
              <Link
                href="/thu-tuc"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-brand-700 shadow-lg transition hover:bg-brand-50"
              >
                <T vi="Khám phá thủ tục" en="Explore procedures" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function StatBox({ value, label }: { value: string; label: Bi }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
      <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">
        <T {...label} />
      </p>
    </div>
  );
}
