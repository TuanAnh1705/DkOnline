import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifyToken } from "@/lib/jwt";

// Next.js 16: Middleware đã đổi tên thành Proxy. Dùng cho kiểm tra phiên "lạc quan"
// (optimistic check) — chặn nhanh ở biên, còn kiểm tra đầy đủ vẫn ở Server Component/API.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifyToken(token);

  // Đã đăng nhập mà vào /login -> đưa thẳng vào dashboard
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Vào khu vực dashboard mà chưa đăng nhập -> về trang login
  if (pathname.startsWith("/dashboard") && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
