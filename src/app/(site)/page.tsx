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
import type { ProcedureCardData } from "@/types";

export const revalidate = 120;

const HOW_STEPS = [
  { title: "Chọn thủ tục", desc: "Tìm đúng thủ tục bạn cần trong danh sách theo từng lĩnh vực." },
  { title: "Xem hướng dẫn", desc: "Làm theo các bước bằng hình ảnh, mô tả và video trực quan." },
  { title: "Nộp hồ sơ", desc: "Bấm nút để chuyển thẳng tới trang đăng ký hồ sơ trực tuyến." },
];

const PREP = [
  { title: "Tài khoản VNeID", desc: "Định danh điện tử mức độ 2 đang hoạt động và điện thoại nhận mã OTP." },
  { title: "Giấy tờ cần thiết", desc: "Ảnh hoặc bản scan rõ nét các giấy tờ (giấy chứng sinh, giấy tờ tùy thân…)." },
  { title: "Phương thức thanh toán", desc: "Tài khoản ngân hàng hoặc ví điện tử nếu thủ tục có thu phí bản sao." },
];

const FEATURES = [
  {
    icon: ListChecks,
    title: "Hướng dẫn từng bước",
    desc: "Mỗi thao tác là một bước riêng, kèm ảnh chụp màn hình được khoanh đỏ đúng vị trí cần bấm.",
  },
  {
    icon: PlayCircle,
    title: "Video trực quan",
    desc: "Xem lại toàn bộ quy trình qua video có đánh số bước và chú thích, dễ làm theo.",
  },
  {
    icon: MousePointerClick,
    title: "Dẫn thẳng tới nơi nộp",
    desc: "Một cú bấm để chuyển tới đúng trang nộp hồ sơ trên Cổng Dịch vụ công Quốc gia.",
  },
  {
    icon: ShieldCheck,
    title: "Bám sát quy định",
    desc: "Nội dung mô phỏng theo giao diện thực tế của cổng, cập nhật theo quy trình mới nhất.",
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
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <StaggerItem key={f.title}>
                <div className="group h-full rounded-2xl border border-line bg-parchment/40 p-6 transition hover:-translate-y-1 hover:border-accent-500/40 hover:bg-white hover:shadow-lg">
                  <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-accent-300 shadow-lg shadow-brand-800/20 ring-1 ring-accent-500/50 transition group-hover:scale-105">
                    <f.icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                    {f.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Lĩnh vực */}
      <section id="linh-vuc" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Lĩnh vực"
          title="Chọn theo lĩnh vực"
          desc="Các thủ tục được sắp xếp theo nhóm để bạn dễ tìm."
        />
        {catsWithItems.length === 0 ? (
          <EmptyState />
        ) : (
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading center eyebrow="3 bước đơn giản" title="Làm theo là xong" />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-3">
            {HOW_STEPS.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-parchment/50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                  <span className="font-display text-4xl font-bold text-brand-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-3 h-px w-10 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-accent-500" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Thủ tục nổi bật */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Thủ tục"
              title="Thủ tục nổi bật"
              desc="Những hướng dẫn được nhiều người quan tâm."
            />
            <Reveal>
              <Link
                href="/thu-tuc"
                className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 hover:underline sm:inline-flex"
              >
                Xem tất cả <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <StaggerItem key={p.id} className="h-full">
                <ProcedureCard procedure={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/thu-tuc" className={buttonClass("secondary", "md")}>
              Xem tất cả thủ tục
            </Link>
          </div>
        </section>
      )}

      {/* Chuẩn bị hồ sơ */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="Trước khi bắt đầu"
            title="Chuẩn bị hồ sơ trong 1 phút"
            desc="Chuẩn bị sẵn 3 thứ này để nộp hồ sơ trơn tru, không gián đoạn."
          />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-3">
            {PREP.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="flex h-full gap-5 rounded-2xl border border-line bg-parchment/50 p-7 transition hover:border-accent-500/40 hover:shadow-md">
                  <span className="font-display text-2xl font-bold text-accent-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/55">{p.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Hỏi đáp */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <SectionHeading
          center
          eyebrow="Hỏi đáp"
          title="Thắc mắc thường gặp"
          desc="Những câu hỏi phổ biến nhất khi nộp hồ sơ trực tuyến."
        />
        <div className="mt-12">
          <FaqAccordion items={FAQ_ITEMS.slice(0, 5)} />
        </div>
        <Reveal className="mt-8 text-center">
          <Link href="/cau-hoi-thuong-gap" className={buttonClass("secondary", "md")}>
            Xem tất cả câu hỏi
          </Link>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <Reveal>
          <div className="ring-gold relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-10 text-center text-white shadow-2xl shadow-brand-800/30 sm:p-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.12]">
              <DrumMotif className="h-full w-full text-accent-300" />
            </div>
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-accent-500/20 blur-2xl" />
            <h2 className="relative font-display text-3xl font-bold sm:text-4xl">
              Bắt đầu với thủ tục của bạn
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-brand-100">
              Chọn thủ tục, làm theo hướng dẫn từng bước và nộp hồ sơ ngay tại nhà.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/thu-tuc"
                className="inline-flex items-center rounded-xl bg-white px-6 py-3 text-base font-bold text-brand-700 shadow-lg transition hover:bg-brand-50"
              >
                Khám phá thủ tục
              </Link>
              <Link
                href="/cau-hoi-thuong-gap"
                className="inline-flex items-center rounded-xl bg-white/10 px-6 py-3 text-base font-bold text-white ring-1 ring-white/30 transition hover:bg-white/20"
              >
                Câu hỏi thường gặp
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
    <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-16 text-center">
      <p className="text-lg font-semibold text-slate-700">Chưa có dữ liệu</p>
      <p className="mt-1 text-sm text-slate-500">
        Vào trang quản trị để thêm thủ tục và lĩnh vực.
      </p>
    </div>
  );
}
