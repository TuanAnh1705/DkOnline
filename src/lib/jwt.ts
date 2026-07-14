import { SignJWT, jwtVerify } from "jose";

// Edge-safe (dùng được trong proxy.ts). KHÔNG import next/headers ở đây.
export interface SessionPayload {
  sub: string; // userId
  email: string;
  name: string;
  role: string;
  [key: string]: unknown;
}

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "insecure-dev-secret-change-me",
);

export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 ngày

export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(
  token: string | undefined | null,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
