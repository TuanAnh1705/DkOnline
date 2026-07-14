// Kiểu dữ liệu view dùng chung cho FE (tách khỏi Prisma include phức tạp)

export type ProcedureStatus = "DRAFT" | "PUBLISHED";

export interface CategoryLite {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  icon: string | null;
}

export interface ProcedureCardData {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  registrationUrl: string | null;
  status: ProcedureStatus;
  category: CategoryLite | null;
  _count: { steps: number };
  createdAt?: string | Date;
}

export interface StepData {
  id: string;
  order: number;
  title: string | null;
  content: string;
  imageUrl: string | null;
}

export interface ProcedureDetailData {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  registrationUrl: string | null;
  status: ProcedureStatus;
  category: CategoryLite | null;
  steps: StepData[];
}
