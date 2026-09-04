import type { Metadata } from "next";
import Link from "next/link";
import {
  Eye,
  Globe2,
  Lock,
  MapPinned,
  ShieldCheck,
  Type as TypeIcon,
  UserRound,
  Volume2,
} from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { GoldDivider } from "@/components/site/ornament";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { buttonClass } from "@/components/ui/button";
import { T, type Bi } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Về Cẩm nang hướng dẫn nộp hồ sơ trực tuyến — nền tảng hướng dẫn nộp hồ sơ dịch vụ công từng bước bằng hình ảnh và video.",
};

const PROCESS_STEPS: { title: Bi; desc: Bi }[] = [
  {
    title: { vi: "Chọn thủ tục", en: "Pick a procedure" },
    desc: {
      vi: "Tìm theo tên hoặc theo lĩnh vực — hộ tịch, cư trú, và nhiều nhóm thủ tục khác.",
      en: "Search by name or browse by category — civil status, residence, and more.",
    },
  },
  {
    title: { vi: "Xem hướng dẫn từng bước", en: "Follow the step-by-step guide" },
    desc: {
      vi: "Đọc từng bước kèm ảnh chụp màn hình thật, hoặc bật video xem trọn quy trình.",
      en: "Read every step with real screenshots, or play the video to see the whole flow.",
    },
  },
  {
    title: { vi: "Chuẩn bị & nộp trên Cổng DVC", en: "Prepare & submit on the portal" },
    desc: {
      vi: "Bấm “Nộp hồ sơ” để mở Cổng Dịch vụ công ở tab mới, vừa đọc vừa thao tác theo.",
      en: "Click “Submit” to open the public service portal in a new tab, and follow along as you go.",
    },
  },
  {
    title: { vi: "Theo dõi & nhận kết quả", en: "Track & receive your result" },
    desc: {
      vi: "Dùng mã hồ sơ để tra cứu tiến độ, chọn nhận bản điện tử, bản giấy hoặc qua bưu điện.",
      en: "Use your reference code to track progress, and choose an electronic, paper, or postal result.",
    },
  },
];

const AUDIENCES: { icon: typeof UserRound; title: Bi; desc: Bi }[] = [
  {
    icon: TypeIcon,
    title: { vi: "Người lớn tuổi, mắt kém", en: "Older adults, weaker eyesight" },
    desc: {
      vi: "Nút chỉnh cỡ chữ A / A+ / A++ và phóng to ảnh khi bấm vào, xem rõ từng chi tiết trên form.",
      en: "Text-size buttons (A / A+ / A++) and tap-to-zoom screenshots make every form detail legible.",
    },
  },
  {
    icon: Volume2,
    title: { vi: "Người ngại đọc chữ dài", en: "People who prefer listening" },
    desc: {
      vi: "Nút loa đọc to nội dung từng bước bằng giọng đọc có sẵn trên trình duyệt, không cần cài thêm gì.",
      en: "A speaker button reads each step aloud using your browser's built-in voice — nothing to install.",
    },
  },
  {
    icon: Globe2,
    title: { vi: "Người nước ngoài, Việt kiều", en: "Foreigners & overseas Vietnamese" },
    desc: {
      vi: "Nút “View in English” dịch toàn bộ tiêu đề, mô tả và các bước sang tiếng Anh chỉ trong một chạm.",
      en: "A “View in English” toggle translates the title, summary, and every step in one tap.",
    },
  },
  {
    icon: MapPinned,
    title: { vi: "Người bận rộn, ở xa trung tâm", en: "Busy people, far from an office" },
    desc: {
      vi: "Làm toàn bộ tại nhà trên điện thoại hay máy tính, hoặc in hướng dẫn ra giấy để đối chiếu dần.",
      en: "Do it all from home on a phone or computer, or print the guide to follow along on paper.",
    },
  },
];

const SECURITY_POINTS: { icon: typeof ShieldCheck; title: Bi; desc: Bi }[] = [
  {
    icon: Lock,
    title: { vi: "Không hỏi mật khẩu, không hỏi OTP", en: "Never asks for passwords or OTPs" },
    desc: {
      vi: "Trang không có chỗ nào để nhập số định danh, mật khẩu hay mã OTP VNeID — đăng nhập thật luôn diễn ra trên chính Cổng Dịch vụ công.",
      en: "There is nowhere to enter your ID number, VNeID password or OTP — real sign-in always happens on the official portal itself.",
    },
  },
  {
    icon: Eye,
    title: { vi: "Không theo dõi danh tính", en: "No identity tracking" },
    desc: {
      vi: "Ngôn ngữ và cỡ chữ bạn chọn chỉ lưu trong trình duyệt của bạn, không gửi lên máy chủ, không gắn với tên hay số điện thoại.",
      en: "Your language and text-size choices stay in your own browser — never sent to a server or tied to a name or phone number.",
    },
  },
  {
    icon: ShieldCheck,
    title: { vi: "Kết nối và dữ liệu được bảo vệ", en: "Protected connection & data" },
    desc: {
      vi: "Trang dùng kết nối mã hoá và các lớp phòng vệ tiêu chuẩn cho trình duyệt. Chi tiết đầy đủ ở trang Chính sách bảo mật.",
      en: "The site uses an encrypted connection and standard browser-level defences. Full details are on the Privacy Policy page.",
    },
  },
];

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
          vi: "Cẩm nang hướng dẫn nộp hồ sơ trực tuyến biến những thủ tục hành chính tưởng chừng phức tạp thành các bước đơn giản, ai cũng có thể tự làm tại nhà.",
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

      {/* Quy trình hoạt động */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading
          center
          eyebrow={{ vi: "Cách hoạt động", en: "How it works" }}
          title={{ vi: "Bốn bước, làm xong tại nhà", en: "Four steps, done from home" }}
          desc={{
            vi: "Từ lúc mở trang đến lúc có kết quả trong tay, tất cả chỉ qua bốn bước.",
            en: "From opening this page to holding your result, it only takes four steps.",
          }}
        />
        <StaggerGroup className="relative mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block" />
          {PROCESS_STEPS.map((step, i) => (
            <StaggerItem key={step.title.vi} className="relative">
              <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 font-display text-lg font-bold text-white shadow-lg shadow-brand-700/25 ring-4 ring-cream">
                {i + 1}
              </div>
              <h3 className="mt-4 font-bold text-slate-900">
                <T {...step.title} />
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                <T {...step.desc} />
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Dành cho ai */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading
            center
            eyebrow={{ vi: "Dành cho ai", en: "Built for" }}
            title={{
              vi: "Thiết kế cho cả người ngại công nghệ nhất",
              en: "Designed for even the least tech-savvy visitor",
            }}
            desc={{
              vi: "Mỗi tính năng dưới đây đều có thật trên trang thủ tục — không phải lời hứa suông.",
              en: "Every feature below is real and live on procedure pages — not just a promise.",
            }}
          />
          <StaggerGroup className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {AUDIENCES.map((aud) => (
              <StaggerItem key={aud.title.vi}>
                <div className="group h-full rounded-2xl border border-slate-200/80 bg-parchment/40 p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-lg sm:p-6">
                  <div className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                    <aud.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900">
                    <T {...aud.title} />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    <T {...aud.desc} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Cam kết bảo mật */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow={{ vi: "Cam kết", en: "Our commitment" }}
              title={{
                vi: "Bảo mật & minh bạch, không thoả hiệp",
                en: "Security & transparency, no compromise" ,
              }}
            />
            <Reveal delay={0.15}>
              <p className="mt-5 leading-relaxed text-slate-600">
                <T
                  vi="Trang cẩm nang này chỉ hướng dẫn — mọi thao tác đăng nhập, nộp hồ sơ và thanh toán thật đều diễn ra trên chính Cổng Dịch vụ công. Ranh giới đó được giữ nghiêm ngặt trong cách trang được xây dựng."
                  en="This guide only guides — every real sign-in, submission and payment happens on the official portal itself. That boundary is enforced in how the site is built, not just promised."
                />
              </p>
              <Link
                href="/chinh-sach-bao-mat"
                className={buttonClass("secondary", "md") + " mt-6"}
              >
                <ShieldCheck className="size-4" />
                <T vi="Xem chính sách bảo mật" en="Read the privacy policy" />
              </Link>
            </Reveal>
          </div>
          <StaggerGroup className="grid gap-4 sm:grid-cols-1">
            {SECURITY_POINTS.map((point) => (
              <StaggerItem key={point.title.vi}>
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-700 ring-1 ring-accent-500/25">
                    <point.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      <T {...point.title} />
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      <T {...point.desc} />
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <GoldDivider />

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
