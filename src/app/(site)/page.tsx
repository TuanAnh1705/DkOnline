import Link from "next/link";
import { getPublishedProcedures, getCategories } from "@/lib/queries";
import { Hero } from "@/components/site/hero";
import { ProcedureCard } from "@/components/site/procedure-card";
import { CategoryCard } from "@/components/site/category-card";
import { SectionHeading } from "@/components/site/section-heading";
import { FaqAccordion } from "@/components/site/faq-accordion";
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
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading center eyebrow="3 bước đơn giản" title="Làm theo là xong" />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-3">
            {HOW_STEPS.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                  <span className="text-4xl font-black text-brand-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-3 h-px w-10 bg-slate-200 transition-all duration-500 group-hover:w-16 group-hover:bg-brand-400" />
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{s.desc}</p>
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
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="Trước khi bắt đầu"
            title="Chuẩn bị hồ sơ trong 1 phút"
            desc="Chuẩn bị sẵn 3 thứ này để nộp hồ sơ trơn tru, không gián đoạn."
          />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-3">
            {PREP.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="flex h-full gap-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-7">
                  <span className="text-2xl font-black text-accent-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{p.desc}</p>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-10 text-center text-white shadow-2xl shadow-brand-700/30 sm:p-16">
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-accent-500/20 blur-2xl" />
            <h2 className="relative text-3xl font-extrabold sm:text-4xl">
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
