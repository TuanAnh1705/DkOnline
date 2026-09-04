import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, Database, ExternalLink, Lock, MailQuestion, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { GoldDivider } from "@/components/site/ornament";
import { Reveal } from "@/components/motion/reveal";
import { T, type Bi } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description:
    "Trang cẩm nang hồ sơ trực tuyến thu thập và bảo vệ dữ liệu người dùng như thế nào — không bao giờ hỏi mật khẩu hay mã OTP VNeID.",
};

const LAST_UPDATED: Bi = { vi: "Cập nhật lần cuối: 04/09/2026", en: "Last updated: 4 Sep 2026" };

function PolicySection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof ShieldCheck;
  title: Bi;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="scroll-mt-24">
      <div className="flex items-start gap-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
            <T {...title} />
          </h2>
          <div className="mt-3 space-y-3 leading-relaxed text-slate-600">{children}</div>
        </div>
      </div>
    </Reveal>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow={{ vi: "Chính sách bảo mật", en: "Privacy Policy" }}
        title={{ vi: "Chúng tôi bảo vệ thông tin của bạn ra sao", en: "How we protect your information" }}
        desc={{
          vi: "Nói ngắn gọn: trang này không bao giờ hỏi mật khẩu hay mã OTP VNeID của bạn, và gần như không thu thập gì để có thể làm lộ.",
          en: "In short: this site never asks for your VNeID password or OTP, and collects almost nothing that could ever leak.",
        }}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
          <T {...LAST_UPDATED} />
        </p>

        <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
          <PolicySection icon={ShieldCheck} title={{ vi: "Phạm vi áp dụng", en: "Scope" }}>
            <p>
              <T
                vi="“Cẩm nang hướng dẫn nộp hồ sơ trực tuyến” là một trang hướng dẫn độc lập, không phải hệ thống của cơ quan nhà nước và không thay thế Cổng Dịch vụ công Quốc gia (dichvucong.gov.vn) hay ứng dụng VNeID. Chính sách này áp dụng cho những gì diễn ra trên chính trang cẩm nang — không áp dụng cho các trang bạn được dẫn tới, ví dụ Cổng Dịch vụ công."
                en="“Online Application Filing Guide” is an independent guide site — it is not a government system and does not replace the National Public Service Portal (dichvucong.gov.vn) or the VNeID app. This policy covers only what happens on this guide itself, not the sites it links you to, such as the portal."
              />
            </p>
          </PolicySection>

          <PolicySection icon={Lock} title={{ vi: "Những gì chúng tôi không bao giờ hỏi", en: "What we never ask for" }}>
            <p>
              <T
                vi="Trang không có bất kỳ ô nhập nào cho số định danh cá nhân, mật khẩu VNeID, mã OTP, số thẻ ngân hàng hay mã CVV. Mọi bước đăng nhập và thanh toán thật đều diễn ra trên chính Cổng Dịch vụ công hoặc ứng dụng ngân hàng/ví điện tử của bạn, sau khi trang điều hướng bạn sang bằng liên kết mở tab mới."
                en="There is no field anywhere on this site for your national ID number, VNeID password, OTP code, card number, or CVV. All real sign-in and payment happens on the official portal or your own banking/e-wallet app, after this site opens a new tab to guide you there."
              />
            </p>
          </PolicySection>

          <PolicySection icon={Database} title={{ vi: "Những gì chúng tôi có lưu", en: "What we do store" }}>
            <p>
              <T
                vi="Lựa chọn ngôn ngữ (Tiếng Việt/English) và cỡ chữ (A/A+/A++) được lưu bằng localStorage ngay trong trình duyệt của bạn — không gửi lên máy chủ, không gắn với tên hay bất kỳ định danh nào. Khi bạn dùng nút “View in English” trên một trang thủ tục, nội dung được gửi tới máy chủ của trang chỉ để dịch máy VI↔EN rồi trả kết quả về, có cache tạm để tránh dịch lại — không lưu lâu dài và không gắn với danh tính người dùng."
                en="Your language choice (Vietnamese/English) and text size (A/A+/A++) are saved in your own browser's local storage — never sent to a server, never tied to a name or any identifier. When you use “View in English” on a procedure page, the text is sent to this site's own server only to be machine-translated VI↔EN and returned, with a short-lived cache to avoid re-translating — not stored long-term or linked to you."
              />
            </p>
          </PolicySection>

          <PolicySection icon={Cookie} title={{ vi: "Cookie", en: "Cookies" }}>
            <p>
              <T
                vi="Trang chỉ đặt một cookie phiên đăng nhập (`session`), dùng riêng cho khu vực quản trị nội dung `/dashboard` của đội ngũ biên tập — cookie này được đánh dấu httpOnly (JavaScript không đọc được) và chỉ gửi qua kết nối mã hoá. Khách truy cập bình thường xem hướng dẫn, hỏi đáp hay trang giới thiệu sẽ không có cookie này."
                en="The site sets exactly one session cookie (`session`), used only for the content team's `/dashboard` admin area. It is marked httpOnly (unreadable by JavaScript) and only ever sent over an encrypted connection. Ordinary visitors reading guides, FAQs, or the About page never receive this cookie."
              />
            </p>
          </PolicySection>

          <PolicySection icon={ShieldCheck} title={{ vi: "Cách chúng tôi bảo vệ dữ liệu", en: "How we protect data" }}>
            <p>
              <T
                vi="Toàn trang phục vụ qua kết nối HTTPS mã hoá, kèm các lớp phòng vệ trình duyệt tiêu chuẩn (chống nhúng trang vào iframe lạ, chống dò loại nội dung, giới hạn nguồn tài nguyên được tải). Khu vực quản trị yêu cầu mật khẩu được mã hoá một chiều, có giới hạn số lần thử đăng nhập để chống dò mật khẩu."
                en="The whole site is served over encrypted HTTPS, with standard browser-level defences (blocking the page from being embedded in a foreign iframe, blocking content-type sniffing, restricting which resource origins may load). The admin area requires a one-way-hashed password and limits repeated login attempts to resist password guessing."
              />
            </p>
          </PolicySection>

          <PolicySection icon={ExternalLink} title={{ vi: "Liên kết ra ngoài", en: "External links" }}>
            <p>
              <T
                vi="Trang có liên kết tới Cổng Dịch vụ công Quốc gia, VNeID và các hệ thống liên thông khác. Các trang đó có chính sách bảo mật riêng, không do trang cẩm nang này kiểm soát — bạn nên đọc chính sách của chính họ trước khi cung cấp thông tin ở đó."
                en="This site links to the National Public Service Portal, VNeID, and other interconnected systems. Those sites have their own privacy policies, outside this guide's control — please read their policies before providing information there."
              />
            </p>
          </PolicySection>

          <PolicySection icon={MailQuestion} title={{ vi: "Thắc mắc về quyền riêng tư", en: "Privacy questions" }}>
            <p>
              <T
                vi="Nếu có câu hỏi về chính sách này, hãy ghé trang Liên hệ."
                en="If you have questions about this policy, visit the Contact page."
              />{" "}
              <Link href="/lien-he" className="font-semibold text-brand-700 hover:underline">
                <T vi="Đến trang Liên hệ →" en="Go to Contact →" />
              </Link>
            </p>
          </PolicySection>
        </div>

        <GoldDivider className="mt-14 sm:mt-16" />

        <p className="mt-8 text-center text-sm text-ink/50">
          <T
            vi="Chính sách này có thể được cập nhật khi trang bổ sung tính năng mới; phiên bản mới nhất luôn hiển thị tại đây."
            en="This policy may be updated as the site adds new features; the latest version always appears here."
          />
        </p>
      </div>
    </>
  );
}
