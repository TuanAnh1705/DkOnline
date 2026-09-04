import "server-only";

/**
 * Giới hạn số lần thử trong bộ nhớ tiến trình — đủ để làm chậm brute-force vào
 * /api/auth/login (nơi duy nhất kiểm mật khẩu thật trong hệ thống). Không thay thế
 * được một dịch vụ rate-limit phân tán (Redis/Upstash…) nếu chạy nhiều instance,
 * nhưng không cần thêm hạ tầng ngoài cho quy mô hiện tại của app.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

/** Dọn định kỳ để Map không phình vô hạn trên tiến trình chạy lâu. */
setInterval(
  () => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  },
  10 * 60 * 1000,
).unref?.();

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
