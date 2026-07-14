"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Landmark, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Đăng nhập thất bại");
        return;
      }
      router.replace(next || "/dashboard");
      router.refresh();
    } catch {
      setError("Không kết nối được máy chủ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Panel thương hiệu */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 lg:block">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-10" />
        <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <Landmark className="size-6" />
            </span>
            <span className="text-lg font-extrabold">Cẩm nang hồ sơ</span>
          </Link>
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">
              Trang quản trị
              <br /> hướng dẫn thủ tục
            </h2>
            <p className="mt-4 max-w-sm text-brand-100">
              Đăng tải hồ sơ hướng dẫn gồm hình ảnh, video và các bước, quản lý
              và phân loại tất cả tại một nơi.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm text-brand-100">
              <ShieldCheck className="size-5" />
              Bảo mật bằng phiên đăng nhập JWT
            </div>
          </div>
          <p className="text-xs text-brand-200/80">
            © {new Date().getFullYear()} Cẩm nang hồ sơ trực tuyến
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-slate-50 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <div className="mb-8 lg:hidden">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white">
              <Landmark className="size-6" />
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Đăng nhập quản trị
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Nhập thông tin tài khoản để tiếp tục.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="email" required>
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@huongdan.vn"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" required>
                Mật khẩu
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">
                {error}
              </p>
            )}

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Đăng nhập
            </Button>
          </form>

          <Link
            href="/"
            className="mt-6 block text-center text-sm text-slate-500 hover:text-brand-600"
          >
            ← Về trang chủ
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
