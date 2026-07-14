import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export const stepInputSchema = z.object({
  title: z.string().max(200).optional().nullable(),
  content: z.string().min(1, "Nội dung bước không được để trống"),
  imageUrl: z.string().url().optional().nullable().or(z.literal("")),
});

export const procedureInputSchema = z.object({
  title: z.string().min(1, "Tên thủ tục không được để trống").max(255),
  summary: z.string().max(2000).optional().nullable(),
  categoryId: z.string().optional().nullable(),
  thumbnailUrl: z.string().url().optional().nullable().or(z.literal("")),
  videoUrl: z.string().url().optional().nullable().or(z.literal("")),
  registrationUrl: z.string().url("Link đăng ký phải là URL hợp lệ").optional().nullable().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  steps: z.array(stepInputSchema).min(1, "Cần ít nhất 1 bước hướng dẫn"),
});

export const categoryInputSchema = z.object({
  name: z.string().min(1, "Tên danh mục không được để trống").max(120),
  description: z.string().max(1000).optional().nullable(),
  icon: z.string().max(60).optional().nullable(),
  color: z.string().max(20).optional().nullable(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ProcedureInput = z.infer<typeof procedureInputSchema>;
export type StepInput = z.infer<typeof stepInputSchema>;
export type CategoryInput = z.infer<typeof categoryInputSchema>;
