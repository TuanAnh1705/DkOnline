import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  // 1) Admin
  const email = process.env.SEED_ADMIN_EMAIL || "admin@huongdan.vn";
  const password = process.env.SEED_ADMIN_PASSWORD || "Admin@12345";
  const name = process.env.SEED_ADMIN_NAME || "Quản trị viên";
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name, passwordHash, role: "ADMIN" },
  });
  console.log(`✓ Admin: ${email} / ${password}`);

  // 2) Danh mục
  const categories = [
    {
      name: "Hộ tịch",
      icon: "ScrollText",
      color: "#2563eb",
      order: 1,
      description: "Khai sinh, kết hôn, khai tử, xác nhận tình trạng hôn nhân…",
    },
    {
      name: "Cư trú & giấy tờ tùy thân",
      icon: "Home",
      color: "#7c3aed",
      order: 2,
      description: "Đăng ký thường trú, tạm trú, căn cước công dân…",
    },
    {
      name: "Bảo hiểm y tế",
      icon: "HeartPulse",
      color: "#059669",
      order: 3,
      description: "Cấp, cấp lại thẻ bảo hiểm y tế…",
    },
  ];
  const catBySlug: Record<string, string> = {};
  for (const c of categories) {
    const slug = slugify(c.name);
    const cat = await prisma.category.upsert({
      where: { slug },
      update: { icon: c.icon, color: c.color, order: c.order, description: c.description },
      create: { ...c, slug },
    });
    catBySlug[slug] = cat.id;
  }
  console.log(`✓ ${categories.length} danh mục`);

  // 3) Thủ tục mẫu (chỉ chữ — ảnh/video thêm sau qua dashboard bằng UploadThing)
  const demoSlug = "dang-ky-ket-hon";
  const exists = await prisma.procedure.findUnique({ where: { slug: demoSlug } });
  if (!exists) {
    const steps = [
      ["Truy cập Cổng Dịch vụ công", "Vào dichvucong.gov.vn và nhấn Đăng nhập ở góc trên bên phải."],
      ["Đăng nhập VNeID", "Nhập số định danh cá nhân và mật khẩu VNeID, sau đó nhấn Đăng nhập."],
      ["Xác thực", "Nhập mã OTP và passcode để xác nhận, đồng ý chia sẻ thông tin."],
      ["Tìm thủ tục", "Gõ từ khóa 'đăng ký kết hôn' và chọn Thủ tục đăng ký kết hôn (mã 1.000894)."],
      ["Chọn cơ quan", "Chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ."],
      ["Thông tin chủ hồ sơ", "Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email, địa chỉ."],
      ["Kê khai thông tin", "Điền đầy đủ thông tin bên nữ và bên nam theo mẫu hộ tịch điện tử."],
      ["Xem trước & xác nhận", "Kiểm tra lại tờ khai, ký số (nếu có) và nhấn Xác nhận."],
      ["Đính kèm hồ sơ", "Tải lên giấy tờ tùy thân, giấy tờ cư trú theo yêu cầu."],
      ["Nhận kết quả & thanh toán", "Chọn nơi nhận kết quả, thanh toán lệ phí bằng mã QR và nộp hồ sơ."],
    ];
    await prisma.procedure.create({
      data: {
        title: "Đăng ký kết hôn",
        slug: demoSlug,
        summary:
          "Hướng dẫn nộp hồ sơ đăng ký kết hôn trực tuyến qua Cổng Dịch vụ công Quốc gia.",
        categoryId: catBySlug["ho-tich"],
        registrationUrl:
          "https://dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh.html",
        status: "PUBLISHED",
        order: 1,
        steps: {
          create: steps.map(([title, content], i) => ({
            order: i,
            title,
            content,
          })),
        },
      },
    });
    console.log("✓ Thủ tục mẫu: Đăng ký kết hôn");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
