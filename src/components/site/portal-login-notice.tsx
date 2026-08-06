import { KeyRound, ExternalLink, Info } from "lucide-react";

// Cổng DVC Quốc gia: chỉ dùng trang chủ (đã kiểm chứng còn sống).
// Nút Đăng nhập nằm ở góc trên bên phải — đúng như bước 1 của mọi hướng dẫn.
const PORTAL_HOME = "https://sso.dancuquocgia.gov.vn/auth?response_type=code&client_id=sso-c12-dvc-web&redirect_uri=https%3A%2F%2Fdichvucong.gov.vn%2Fsso&scope=openid";

/**
 * "Bước 0" — nhắc người dân đăng nhập VNeID một lần trên Cổng Dịch vụ công
 * trước khi làm theo hướng dẫn, để lúc bấm Nộp hồ sơ không phải đăng nhập lại.
 */
export function PortalLoginNotice() {
  return (
    <div className="rounded-2xl border-2 border-accent-500/40 bg-accent-300/15 p-6 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-accent-300 shadow-lg shadow-brand-800/20 ring-1 ring-accent-500/50">
          <KeyRound className="size-6" />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
            Nên đăng nhập một lần trước khi bắt đầu
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink/70">
            Hãy mở Cổng Dịch vụ công và đăng nhập bằng tài khoản VNeID trước,
            rồi quay lại trang này xem hướng dẫn. Khi bấm{" "}
            <strong className="font-semibold text-ink">Nộp hồ sơ</strong>, bạn sẽ
            không phải đăng nhập lại từ đầu.
          </p>

          <a
            href={PORTAL_HOME}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-base font-bold text-white shadow-lg shadow-brand-800/20 transition hover:bg-brand-700 active:scale-[.98]"
          >
            Mở Cổng Dịch vụ công để đăng nhập
            <ExternalLink className="size-5" />
          </a>

          <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ink/55">
            <Info className="mt-0.5 size-4 shrink-0" />
            <span>
              Riêng bước chuyển sang hệ thống của ngành Tư pháp, bạn vẫn cần bấm{" "}
              <em className="not-italic font-medium text-ink/75">
                Xác nhận chia sẻ
              </em>{" "}
              và nhập lại mã passcode 6 số. Đây là quy định bắt buộc về đồng ý
              chia sẻ thông tin, không phải lỗi.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
