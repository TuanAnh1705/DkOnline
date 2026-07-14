import type { Metadata } from "next";
import { LoginForm } from "@/components/dashboard/login-form";

export const metadata: Metadata = {
  title: "Đăng nhập quản trị",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <LoginForm next={next ?? "/dashboard"} />;
}
