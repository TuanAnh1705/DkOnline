import Link from "next/link";
import {
  ListChecks,
  PlayCircle,
  ShieldCheck,
  MousePointerClick,
} from "lucide-react";
import { getPublishedProcedures, getCategories } from "@/lib/queries";
import { Hero } from "@/components/site/hero";
import { ProcedureCard } from "@/components/site/procedure-card";
import { CategoryCard } from "@/components/site/category-card";
import { SectionHeading } from "@/components/site/section-heading";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { DrumMotif } from "@/components/site/ornament";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { buttonClass } from "@/components/ui/button";
import { FAQ_ITEMS } from "@/lib/faq";
import { T, type Bi } from "@/lib/i18n";
import type { ProcedureCardData } from "@/types";

export const revalidate = 120;

const HOW_STEPS: { title: Bi; desc: Bi }[] = [
  {
    title: { vi: "Tra cứu thủ tục", en: "Find your procedure" },
    desc: {
      vi: "Xác định đúng thủ tục hành chính cần thực hiện theo lĩnh vực và cơ quan có thẩm quyền giải quyết nơi cư trú.",
      en: "Identify the right administrative procedure by category and by the authority responsible where you live.",
    },
  },
  {
    title: { vi: "Nghiên cứu hướng dẫn", en: "Read the guide" },
    desc: {
      vi: "Nắm trình tự thực hiện, thành phần hồ sơ và cách kê khai qua ảnh chụp màn hình thực tế kèm video minh họa.",
      en: "Learn the sequence, the required documents and how to fill in each form through real screenshots and video.",
    },
  },
  {
    title: { vi: "Nộp hồ sơ trực tuyến", en: "Submit online" },
    desc: {
      vi: "Đăng nhập bằng tài khoản định danh điện tử VNeID, kê khai biểu mẫu, đính kèm giấy tờ và nhận mã hồ sơ để tra cứu tiến độ.",
      en: "Sign in with your VNeID digital identity, fill in the form, attach documents and get a reference code to track progress.",
    },
  },
];

const PREP: { title: Bi; desc: Bi }[] = [
  {
    title: { vi: "Tài khoản VNeID", en: "VNeID account" },
    desc: {
      vi: "Định danh điện tử mức độ 2 đang hoạt động và điện thoại nhận mã OTP.",
      en: "An active level-2 digital identity plus a phone to receive OTP codes.",
    },
  },
  {
    title: { vi: "Giấy tờ cần thiết", en: "Required documents" },
    desc: {
      vi: "Ảnh hoặc bản scan rõ nét các giấy tờ (giấy chứng sinh, giấy tờ tùy thân…).",
      en: "Clear photos or scans of your papers (birth certificate, ID documents, etc.).",
    },
  },
  {
    title: { vi: "Phương thức thanh toán", en: "A payment method" },
    desc: {
      vi: "Tài khoản ngân hàng hoặc ví điện tử nếu thủ tục có thu phí bản sao.",
      en: "A bank account or e-wallet, in case the procedure charges a copy fee.",
    },
  },
];

const FEATURES: { icon: typeof ListChecks; title: Bi; desc: Bi }[] = [
  {
    icon: ListChecks,
    title: { vi: "Hướng dẫn từng bước", en: "Step-by-step guides" },
    desc: {
      vi: "Mỗi thao tác là một bước riêng, kèm ảnh chụp màn hình được khoanh đỏ đúng vị trí cần bấm.",
      en: "Every action is its own step, with a screenshot circling exactly where to tap.",
    },
  },
  {
    icon: PlayCircle,
    title: { vi: "Video trực quan", en: "Video walkthroughs" },
    desc: {
      vi: "Xem lại toàn bộ quy trình qua video có đánh số bước và chú thích, dễ làm theo.",
      en: "Watch the whole process in a numbered, annotated video that is easy to follow.",
    },
  },
  {
    icon: MousePointerClick,
    title: { vi: "Dẫn thẳng tới nơi nộp", en: "Straight to the form" },
    desc: {
      vi: "Một cú bấm để chuyển tới đúng trang nộp hồ sơ trên Cổng Dịch vụ công Quốc gia.",
      en: "One tap takes you to the right application page on the National Public Service Portal.",
    },
  },
  {
    icon: ShieldCheck,
    title: { vi: "Bám sát quy định", en: "True to the rules" },
    desc: {
      vi: "Nội dung mô phỏng theo giao diện thực tế của cổng, cập nhật theo quy trình mới nhất.",
      en: "Content mirrors the portal's real interface and follows the latest procedure updates.",
    },
  },
];

export default async function HomePage() {
  let procedures: Awaited<ReturnType<typeof getPublishedProcedures>> = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  try {
    [procedures, categories] = await Promise.all([
      getPublishedProcedures(),
      getCategories(),
    ]);
  } catch (e) {
    console.error("Không tải được dữ liệu trang chủ:", e);
  }

  const cards = procedures as unknown as ProcedureCardData[];
  const catsWithItems = categories.filter((c) => c._count.procedures > 0);
  const featured = cards.slice(0, 6);
  const suggestions = cards.slice(0, 4).map((p) => p.title);

  return (
    <>
      <Hero
        procedureCount={procedures.length}
        categoryCount={catsWithItems.length}
        suggestions={suggestions}
      />

      {/* Điểm nổi bật */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <StaggerItem key={f.title.vi}>
                <div className="group h-full rounded-2xl border border-line bg-parchment/40 p-5 transition hover:-translate-y-1 hover:border-accent-500/40 hover:bg-white hover:shadow-lg sm:p-6">
                  <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-accent-300 shadow-lg shadow-brand-800/20 ring-1 ring-accent-500/50 transition group-hover:scale-105">
                    <f.icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    <T {...f.title} />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                    <T {...f.desc} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Lĩnh vực */}
      <section id="linh-vuc" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow={{ vi: "Lĩnh vực", en: "Categories" }}
          title={{ vi: "Chọn theo lĩnh vực", en: "Browse by category" }}
          desc={{
            vi: "Các thủ tục được sắp xếp theo nhóm để bạn dễ tìm.",
            en: "Procedures are grouped so you can find yours faster.",
          }}
        />
        {catsWithItems.length === 0 ? (
          <EmptyState />
        ) : (
          <StaggerGroup className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {catsWithItems.map((c, i) => (
              <StaggerItem key={c.id} className="h-full">
                <CategoryCard category={c} index={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      {/* Cách sử dụng */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading
            center
            eyebrow={{ vi: "Quy trình thực hiện", en: "How it works" }}
            title={{
              vi: "Ba bước nộp hồ sơ trực tuyến",
              en: "Three steps to submit online",
            }}
            desc={{
              vi: "Trình tự áp dụng chung cho các thủ tục hành chính được cung cấp trực tuyến toàn trình trên Cổng Dịch vụ công Quốc gia.",
              en: "The common sequence for administrative procedures offered end-to-end online on the National Public Service Portal.",
            }}
          />
          <StaggerGroup className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
            {HOW_STEPS.map((s, i) => (
              <StaggerItem key={s.title.vi}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-parchment/50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:p-7">
                  <span className="font-display text-4xl font-bold text-brand-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-3 h-px w-10 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-accent-500" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    <T {...s.title} />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                    <T {...s.desc} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Thủ tục nổi bật */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow={{ vi: "Thủ tục", en: "Procedures" }}
              title={{ vi: "Thủ tục nổi bật", en: "Popular procedures" }}
              desc={{
                vi: "Những hướng dẫn được nhiều người quan tâm.",
                en: "The guides people look up most often.",
              }}
            />
            <Reveal>
              <Link
                href="/thu-tuc"
                className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 hover:underline sm:inline-flex"
              >
                <T vi="Xem tất cả" en="See all" /> <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <StaggerGroup className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {featured.map((p) => (
              <StaggerItem key={p.id} className="h-full">
                <ProcedureCard procedure={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/thu-tuc" className={buttonClass("secondary", "md")}>
              <T vi="Xem tất cả thủ tục" en="See all procedures" />
            </Link>
          </div>
        </section>
      )}

      {/* Chuẩn bị hồ sơ */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow={{ vi: "Trước khi bắt đầu", en: "Before you start" }}
            title={{
              vi: "Chuẩn bị hồ sơ trong 1 phút",
              en: "Get ready in one minute",
            }}
            desc={{
              vi: "Chuẩn bị sẵn 3 thứ này để nộp hồ sơ trơn tru, không gián đoạn.",
              en: "Have these three things ready so your submission goes through without interruption.",
            }}
          />
          <StaggerGroup className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
            {PREP.map((p, i) => (
              <StaggerItem key={p.title.vi}>
                <div className="flex h-full gap-4 rounded-2xl border border-line bg-parchment/50 p-5 transition hover:border-accent-500/40 hover:shadow-md sm:gap-5 sm:p-7">
                  <span className="font-display text-2xl font-bold text-accent-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-ink">
                      <T {...p.title} />
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/55">
                      <T {...p.desc} />
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Hỏi đáp */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading
          center
          eyebrow={{ vi: "Hỏi đáp", en: "FAQ" }}
          title={{ vi: "Thắc mắc thường gặp", en: "Common questions" }}
          desc={{
            vi: "Những câu hỏi phổ biến nhất khi nộp hồ sơ trực tuyến.",
            en: "The questions people ask most when submitting online.",
          }}
        />
        <div className="mt-8 sm:mt-12">
          <FaqAccordion items={FAQ_ITEMS.slice(0, 5)} />
        </div>
        <Reveal className="mt-8 text-center">
          <Link href="/cau-hoi-thuong-gap" className={buttonClass("secondary", "md")}>
            <T vi="Xem tất cả câu hỏi" en="See all questions" />
          </Link>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <Reveal>
          <div className="ring-gold relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-7 text-center text-white shadow-2xl shadow-brand-800/30 sm:p-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.12]">
              <DrumMotif className="h-full w-full text-accent-300" />
            </div>
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-accent-500/20 blur-2xl" />
            <h2 className="relative font-display text-2xl font-bold sm:text-4xl">
              <T vi="Bắt đầu với thủ tục của bạn" en="Start with your procedure" />
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm text-brand-100 sm:text-base">
              <T
                vi="Chọn thủ tục, làm theo hướng dẫn từng bước và nộp hồ sơ ngay tại nhà."
                en="Pick a procedure, follow the steps and submit your application from home."
              />
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/thu-tuc"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-bold text-brand-700 shadow-lg transition hover:bg-brand-50"
              >
                <T vi="Khám phá thủ tục" en="Explore procedures" />
              </Link>
              <Link
                href="/cau-hoi-thuong-gap"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-base font-bold text-white ring-1 ring-white/30 transition hover:bg-white/20"
              >
                <T vi="Câu hỏi thường gặp" en="Frequently asked questions" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center sm:p-16">
      <p className="text-lg font-semibold text-slate-700">
        <T vi="Chưa có dữ liệu" en="No data yet" />
      </p>
      <p className="mt-1 text-sm text-slate-500">
        <T
          vi="Vào trang quản trị để thêm thủ tục và lĩnh vực."
          en="Open the admin dashboard to add procedures and categories."
        />
      </p>
    </div>
  );
}
