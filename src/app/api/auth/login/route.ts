import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { signToken } from "@/lib/jwt";
import { setSessionCookie } from "@/lib/session";
import { loginSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

// Chống brute-force vào chỗ kiểm mật khẩu thật duy nhất của hệ thống.
const LOGIN_LIMIT = { limit: 8, windowMs: 5 * 60 * 1000 };

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }
  const { email, password } = parsed.data;

  // Giới hạn theo IP+email để không khoá nhầm nhiều người dùng chung mạng (NAT, wifi
  // công cộng) khi chỉ một tài khoản bị dò mật khẩu.
  const rateLimitKey = `${getClientIp(req)}:${email.toLowerCase()}`;
  const { allowed, retryAfterMs } = checkRateLimit(rateLimitKey, LOGIN_LIMIT);
  if (!allowed) {
    return NextResponse.json(
      { error: "Bạn thử đăng nhập quá nhiều lần. Vui lòng thử lại sau ít phút." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } },
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json(
      { error: "Email hoặc mật khẩu không đúng" },
      { status: 401 },
    );
  }

  const token = await signToken({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
  await setSessionCookie(token);

  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
}
