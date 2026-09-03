"use client";

import { KeyRound, ExternalLink, Info } from "lucide-react";
import { useTr } from "@/lib/i18n";

// Cổng DVC Quốc gia: chỉ dùng trang chủ (đã kiểm chứng còn sống).
// Nút Đăng nhập nằm ở góc trên bên phải — đúng như bước 1 của mọi hướng dẫn.
const PORTAL_HOME = "https://sso.dancuquocgia.gov.vn/auth?response_type=code&client_id=sso-c12-dvc-web&redirect_uri=https%3A%2F%2Fdichvucong.gov.vn%2Fsso&scope=openid";

/**
 * "Bước 0" — nhắc người dân đăng nhập VNeID một lần trên Cổng Dịch vụ công
 * trước khi làm theo hướng dẫn, để lúc bấm Nộp hồ sơ không phải đăng nhập lại.
 */
export function PortalLoginNotice() {
  const tr = useTr();

  return (
    <div
      data-no-print
      className="rounded-2xl border-2 border-accent-500/40 bg-accent-300/15 p-5 sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-accent-300 shadow-lg shadow-brand-800/20 ring-1 ring-accent-500/50 sm:size-12">
          <KeyRound className="size-6" />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="font-display text-lg font-bold text-ink sm:text-2xl">
            {tr(
              "Nên đăng nhập một lần trước khi bắt đầu",
              "Sign in once before you start",
            )}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/70 sm:text-base">
            {tr(
              "Hãy mở Cổng Dịch vụ công và đăng nhập bằng tài khoản VNeID trước, rồi quay lại trang này xem hướng dẫn. Khi bấm Nộp hồ sơ, bạn sẽ không phải đăng nhập lại từ đầu.",
              "Open the National Public Service Portal and sign in with your VNeID account first, then come back to this guide. That way you will not have to sign in again when you tap Submit.",
            )}
          </p>

          <a
            href={PORTAL_HOME}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-[15px] font-bold text-white shadow-lg shadow-brand-800/20 transition hover:bg-brand-700 active:scale-[.98] sm:w-auto sm:text-base"
          >
            {tr(
              "Mở Cổng Dịch vụ công để đăng nhập",
              "Open the portal to sign in",
            )}
            <ExternalLink className="size-5 shrink-0" />
          </a>

          <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ink/55">
            <Info className="mt-0.5 size-4 shrink-0" />
            <span>
              {tr(
                "Riêng bước chuyển sang hệ thống của ngành Tư pháp, bạn vẫn cần bấm Xác nhận chia sẻ và nhập lại mã passcode 6 số. Đây là quy định bắt buộc về đồng ý chia sẻ thông tin, không phải lỗi.",
                "When the portal hands you over to the Justice sector system, you still have to tap Confirm sharing and re-enter your 6-digit passcode. That is a mandatory data-sharing consent step, not a bug.",
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
