import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, BookOpenCheck, Gavel, Link2, RefreshCcw, ShieldAlert } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { GoldDivider } from "@/components/site/ornament";
import { Reveal } from "@/components/motion/reveal";
import { T, type Bi } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description:
    "Điều khoản sử dụng nội dung hướng dẫn trên Cẩm nang hướng dẫn nộp hồ sơ trực tuyến — nội dung tham khảo, không thay thế văn bản pháp luật.",
};

const LAST_UPDATED: Bi = { vi: "Cập nhật lần cuối: 04/09/2026", en: "Last updated: 4 Sep 2026" };

function TermSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Gavel;
  title: Bi;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
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

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow={{ vi: "Điều khoản sử dụng", en: "Terms of Use" }}
        title={{ vi: "Vui lòng đọc trước khi sử dụng", en: "Please read before using this site" }}
        desc={{
          vi: "Vài quy tắc ngắn gọn để việc sử dụng cẩm nang này công bằng và an toàn cho tất cả mọi người.",
          en: "A short set of rules to keep using this guide fair and safe for everyone.",
        }}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
          <T {...LAST_UPDATED} />
        </p>

        <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
          <TermSection icon={BookOpenCheck} title={{ vi: "Chấp nhận điều khoản", en: "Acceptance of terms" }}>
            <p>
              <T
                vi="Khi truy cập và sử dụng trang này, bạn đồng ý với các điều khoản dưới đây. Nếu không đồng ý, vui lòng ngừng sử dụng trang."
                en="By accessing and using this site, you agree to the terms below. If you do not agree, please stop using the site."
              />
            </p>
          </TermSection>

          <TermSection icon={AlertTriangle} title={{ vi: "Tính chất nội dung", en: "Nature of the content" }}>
            <p>
              <T
                vi="Toàn bộ hướng dẫn, hình ảnh và video trên trang mang tính chất tham khảo, giúp minh hoạ quy trình nộp hồ sơ dịch vụ công trực tuyến. Nội dung không phải văn bản pháp luật và không thay thế thông tin, biểu mẫu hay hướng dẫn chính thức từ Cổng Dịch vụ công Quốc gia hay cơ quan nhà nước có thẩm quyền. Quy trình thực tế trên cổng có thể thay đổi mà trang chưa kịp cập nhật — luôn ưu tiên thông tin hiển thị trực tiếp trên dichvucong.gov.vn."
                en="All guides, screenshots and videos on this site are for reference, to illustrate the online public-service filing process. They are not legal documents and do not replace the official information, forms, or instructions from the National Public Service Portal or the relevant government agency. The real process on the portal can change before this guide is updated — always defer to what dichvucong.gov.vn shows directly."
              />
            </p>
          </TermSection>

          <TermSection icon={ShieldAlert} title={{ vi: "Sử dụng hợp lệ", en: "Acceptable use" }}>
            <p>
              <T
                vi="Bạn đồng ý không sử dụng trang này để: mạo danh Cổng Dịch vụ công hay bất kỳ cơ quan nhà nước nào; thu thập trái phép thông tin của người khác; hoặc thực hiện các hành vi gây hại tới hệ thống (dò quét, tấn công, khai thác lỗ hổng…). Mọi nỗ lực như vậy có thể bị từ chối truy cập và xử lý theo quy định pháp luật hiện hành."
                en="You agree not to use this site to: impersonate the public service portal or any government agency; unlawfully collect other people's information; or attempt to harm the system (scanning, attacking, exploiting vulnerabilities…). Any such attempt may result in access being denied and handled under applicable law."
              />
            </p>
          </TermSection>

          <TermSection icon={Link2} title={{ vi: "Liên kết tới bên thứ ba", en: "Third-party links" }}>
            <p>
              <T
                vi="Trang dẫn liên kết tới Cổng Dịch vụ công Quốc gia, VNeID và các hệ thống liên thông khác để bạn hoàn tất thủ tục thật. Trang không chịu trách nhiệm về nội dung, tính sẵn sàng hay chính sách của các hệ thống đó."
                en="This site links to the National Public Service Portal, VNeID, and other interconnected systems so you can complete the real procedure. This site is not responsible for the content, availability, or policies of those systems."
              />
            </p>
          </TermSection>

          <TermSection icon={Gavel} title={{ vi: "Giới hạn trách nhiệm", en: "Limitation of liability" }}>
            <p>
              <T
                vi="Nội dung được cung cấp “nguyên trạng”, trên cơ sở nỗ lực hết sức để chính xác và cập nhật, nhưng không có bảo đảm nào về tính đầy đủ hay không có sai sót. Trang không chịu trách nhiệm cho thiệt hại phát sinh từ việc dựa vào nội dung hướng dẫn thay vì thông tin chính thức."
                en="Content is provided “as is”, on a best-effort basis for accuracy and currency, with no guarantee of completeness or absence of error. This site is not liable for damages arising from relying on this guide instead of official information."
              />
            </p>
          </TermSection>

          <TermSection icon={RefreshCcw} title={{ vi: "Thay đổi điều khoản", en: "Changes to these terms" }}>
            <p>
              <T
                vi="Điều khoản có thể được cập nhật khi trang bổ sung tính năng mới; phiên bản mới nhất luôn hiển thị tại đây. Nếu có thắc mắc, vui lòng ghé trang Liên hệ."
                en="These terms may be updated as the site adds new features; the latest version always appears here. If you have questions, please visit the Contact page."
              />{" "}
              <Link href="/lien-he" className="font-semibold text-brand-700 hover:underline">
                <T vi="Đến trang Liên hệ →" en="Go to Contact →" />
              </Link>
            </p>
          </TermSection>
        </div>

        <GoldDivider className="mt-14 sm:mt-16" />

        <p className="mt-8 text-center text-sm text-ink/50">
          <T
            vi="Xem thêm cách trang xử lý dữ liệu tại trang Chính sách bảo mật."
            en="See how the site handles data on the Privacy Policy page."
          />{" "}
          <Link href="/chinh-sach-bao-mat" className="font-semibold text-brand-700 hover:underline">
            <T vi="Chính sách bảo mật →" en="Privacy Policy →" />
          </Link>
        </p>
      </div>
    </>
  );
}
