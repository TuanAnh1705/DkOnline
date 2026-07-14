import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { buttonClass } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Về Cẩm nang hồ sơ trực tuyến — nền tảng hướng dẫn nộp hồ sơ dịch vụ công từng bước bằng hình ảnh và video.",
};

const VALUES = [
  {
    title: "Trực quan bằng hình ảnh",
    desc: "Mỗi bước có ảnh chụp màn hình thực tế, nhìn là làm theo được ngay.",
  },
  {
    title: "Video hướng dẫn",
    desc: "Xem lại toàn bộ quy trình qua video để nắm chắc trước khi thao tác.",
  },
  {
    title: "Làm mọi lúc, mọi nơi",
    desc: "Thao tác trên máy tính hay điện thoại, không phải xếp hàng chờ đợi.",
  },
  {
    title: "Chính xác, cập nhật",
    desc: "Nội dung bám sát quy trình thực tế trên Cổng Dịch vụ công.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Về chúng tôi"
        title="Giúp mọi người dân tự nộp hồ sơ trực tuyến"
        desc="Cẩm nang hồ sơ trực tuyến biến những thủ tục hành chính tưởng chừng phức tạp thành các bước đơn giản, ai cũng có thể tự làm tại nhà."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/thu-tuc" className={buttonClass("primary", "lg")}>
            Bắt đầu ngay
          </Link>
          <Link href="/cau-hoi-thuong-gap" className={buttonClass("secondary", "lg")}>
            Câu hỏi thường gặp
          </Link>
        </div>
      </PageHero>

      {/* Sứ mệnh */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Sứ mệnh"
              title="Không ai bị bỏ lại phía sau chuyển đổi số"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 leading-relaxed text-slate-600">
                Dịch vụ công trực tuyến giúp tiết kiệm thời gian và công sức,
                nhưng không phải ai cũng quen thao tác. Chúng tôi ghi lại tỉ mỉ
                từng màn hình, từng nút bấm — để người lần đầu làm cũng có thể
                hoàn thành hồ sơ một cách tự tin.
              </p>
              <p className="mt-3 leading-relaxed text-slate-600">
                Toàn bộ hướng dẫn được xây dựng từ quy trình thực tế trên Cổng
                Dịch vụ công Quốc gia và hệ thống của các cơ quan liên quan.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <StatBox value="6+" label="Thủ tục hướng dẫn" />
              <StatBox value="120+" label="Bước minh hoạ" />
              <StatBox value="100%" label="Trực tuyến" />
              <StatBox value="~10'" label="Mỗi hồ sơ" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Giá trị */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            center
            eyebrow="Vì sao chọn chúng tôi"
            title="Đơn giản — Trực quan — Đáng tin"
          />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="text-sm font-black tracking-widest text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-3 h-px w-8 bg-slate-200 transition-all group-hover:w-14 group-hover:bg-brand-400" />
                  <h3 className="mt-4 font-bold text-slate-900">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    {v.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-10 text-center text-white shadow-2xl shadow-brand-700/30 sm:p-14">
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
            <h2 className="relative text-3xl font-extrabold sm:text-4xl">
              Sẵn sàng tự làm hồ sơ của bạn?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-brand-100">
              Chọn thủ tục và làm theo hướng dẫn từng bước ngay hôm nay.
            </p>
            <div className="relative mt-7 flex justify-center">
              <Link
                href="/thu-tuc"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-brand-700 shadow-lg transition hover:bg-brand-50"
              >
                Khám phá thủ tục
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <p className="text-3xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}
