# Cẩm nang nộp hồ sơ trực tuyến

Website hướng dẫn nộp hồ sơ dịch vụ công trực tuyến + **dashboard quản trị** để đăng tải
thủ tục (hình ảnh, video, các bước hướng dẫn) và dẫn tới link đăng ký hồ sơ tương ứng.

## Công nghệ

- **Next.js 16** (App Router, React 19, Turbopack) — `proxy.ts` gác đăng nhập (thay `middleware`)
- **Prisma 6** + **MySQL / TiDB Cloud** (`relationMode = "prisma"`)
- **JWT** (`jose`) trong cookie httpOnly — không dùng dịch vụ ngoài
- **UploadThing** — upload ảnh/video, lưu URL vào DB
- **Tailwind CSS 4**, **Framer Motion** + **GSAP** (hiệu ứng), **Lucide React** (icon)

## Cài đặt

```bash
npm install                 # tự chạy prisma generate
cp .env.example .env        # rồi điền giá trị (xem bên dưới)
npm run db:push             # tạo bảng trong TiDB/MySQL
npm run db:seed             # tạo admin + danh mục + 1 thủ tục mẫu
npm run dev                 # http://localhost:3000
```

## Biến môi trường (`.env`)

| Biến | Ý nghĩa |
|---|---|
| `DATABASE_URL` | Chuỗi kết nối TiDB Cloud: `mysql://<user>.root:<pass>@gateway01.<region>.prod.aws.tidbcloud.com:4000/<db>?sslaccept=strict` |
| `JWT_SECRET` | Chuỗi bí mật ký JWT (`node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"`) |
| `UPLOADTHING_TOKEN` | Token từ uploadthing.com → API Keys |
| `SEED_ADMIN_*` | Email / mật khẩu / tên admin để seed |

> TiDB Cloud không tự tạo database — hãy tạo `huongdan` (hoặc tên bạn muốn) trong Console trước khi `db:push`.

## Đường dẫn chính

| Route | Mô tả |
|---|---|
| `/` | Trang người dùng: danh sách thủ tục theo lĩnh vực |
| `/thu-tuc/[slug]` | Chi tiết: các bước (ảnh + chữ) → video → nút đăng ký |
| `/login` | Đăng nhập quản trị |
| `/dashboard` | Bảng quản trị (được `proxy.ts` bảo vệ) |
| `/dashboard/procedures/[id]` | Xem/sửa/xoá chi tiết thủ tục |

## Luồng dữ liệu

- Trang người dùng & dashboard **đọc trực tiếp Prisma trong Server Component** (không qua HTTP → tải nhanh).
- Ghi dữ liệu qua **Route Handler** (`/api/*`) có kiểm tra JWT; ảnh/video đẩy lên UploadThing, chỉ lưu URL.
- Trang chủ dùng ISR (`revalidate = 120`), tự làm mới sau khi thêm/sửa nhờ `revalidatePath`.

## Lệnh hữu ích

```bash
npm run build         # build production (Turbopack)
npm run db:studio     # Prisma Studio xem dữ liệu
npx tsc --noEmit      # typecheck
```
