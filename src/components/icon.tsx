import {
  FileText,
  Heart,
  Baby,
  ScrollText,
  Home,
  ShieldCheck,
  Landmark,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Users,
  Building2,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";

// Bộ icon cho danh mục (chọn từ danh sách, không sinh bằng AI)
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  FileText,
  Heart,
  Baby,
  ScrollText,
  Home,
  ShieldCheck,
  Landmark,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Users,
  Building2,
  FileCheck2,
};

export const CATEGORY_ICON_NAMES = Object.keys(CATEGORY_ICONS);

export function CategoryIcon({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const Icon = (name && CATEGORY_ICONS[name]) || FileText;
  return <Icon className={className} />;
}
