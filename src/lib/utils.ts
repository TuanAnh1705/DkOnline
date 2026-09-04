// Ghép className có điều kiện (đủ dùng, không cần thư viện ngoài)
export function cn(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}

// Dấu tổ hợp Unicode U+0300..U+036F — dựng regex từ mã ký tự để source sạch (ASCII)
const COMBINING_MARKS = new RegExp(
  "[" + String.fromCharCode(0x300) + "-" + String.fromCharCode(0x36f) + "]",
  "g",
);

// Sinh link tìm kiếm thủ tục trên Cổng Dịch vụ công quốc gia từ tên thủ tục —
// dùng khi người đăng không tự nhập "Link đăng ký hồ sơ". Bỏ dấu câu, gộp
// khoảng trắng thừa rồi mã hoá thành ?keyword=..., đúng dạng link mẫu
// (vd: "chứng thực chữ ký" -> .../tim-kiem-thu-tuc-hanh-chinh?keyword=ch%E1%BB%A9ng...).
// Chỉ dùng route /tim-kiem-thu-tuc-hanh-chinh vì đây là route còn kiểm chứng hoạt động
// (xem tools/TIENDO.md) — không suy ra link chi tiết thủ tục vì mỗi thủ tục có mã riêng.
export function buildRegistrationUrl(title: string): string {
  const clean = title
    .replace(/[^\p{L}\p{N} ]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  return `https://dichvucong.gov.vn/tim-kiem-thu-tuc-hanh-chinh?keyword=${encodeURIComponent(clean)}`;
}

// Chuyển tiếng Việt có dấu -> slug không dấu
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
