import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lớp bảo vệ thứ hai (ngoài proxy) — kiểm tra phiên đầy đủ ở server
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <DashboardShell user={{ name: session.name, email: session.email }}>
      {children}
    </DashboardShell>
  );
}
