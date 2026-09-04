// Dữ liệu import: caption từng bước (ghép với ảnh sort theo tên trong thư mục).
// Số caption nên bằng số ảnh trong thư mục.

export interface StepSpec {
  title?: string;
  content: string;
  imgIndex?: number; // 1-based: dùng ảnh sort thứ mấy (khi thứ tự file ≠ luồng)
}

export interface ProcedureSpec {
  key: string; // khoá lọc khi chạy (vd: "dkKetHon")
  slug: string;
  title: string;
  summary?: string;
  categorySlug?: string;
  categoryName?: string;
  dir: string;
  imagesDir?: string; // thư mục con chứa ảnh (vd "annotated"); mặc định lấy ngay trong dir
  video?: string; // tên file video, nằm trong dir
  registrationUrl?: string;
  order?: number;
  steps: StepSpec[];
}

// Link mở thủ tục trên Cổng DVC Quốc gia.
// CHỈ dùng 2 route đã kiểm chứng là còn sống: trang tìm kiếm TTHC và trang DVC liên thông.
// KHÔNG dùng route cũ `/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=...`
// — đã thử và cổng báo trang không tồn tại.
// `search(kw)` mở trang kết quả tìm kiếm; từ khoá lấy đúng chuỗi đã gõ trong ảnh hướng dẫn
// nên thủ tục cần tìm nằm ngay đầu danh sách, bấm vào là ra trang chi tiết có khối
// "Chọn cơ quan thực hiện" ở cột bên phải.
// Bỏ mọi dấu câu (dấu phẩy…) và gộp khoảng trắng thừa, để URL sinh ra chỉ gồm
// chữ + %20 đúng như link mẫu, không lẫn %2C.
const search = (kw: string) => {
  const clean = kw
    .replace(/[^\p{L}\p{N} ]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  return `https://dichvucong.gov.vn/tim-kiem-thu-tuc-hanh-chinh?keyword=${encodeURIComponent(clean)}`;
};
// Cổng riêng của dịch vụ công liên thông (không dùng route tìm kiếm như các thủ tục khác).
const LIEN_THONG = "https://lienthong.dichvucong.gov.vn/#/ke-khai/2.000986";
// Trang danh sách dịch vụ liên thông (không deep-link vào mã ke-khai cụ thể vì
// hệ thống đang bảo trì lúc viết spec này nên không kiểm chứng được mã — trang gốc
// vẫn đúng là nơi hiển thị 2 ô dịch vụ liên thông như trong ảnh hướng dẫn).
const LIEN_THONG_PORTAL = "https://lienthong.dichvucong.gov.vn/";

// Các bước đăng nhập đầu luồng lặp lại y hệt ở mọi thủ tục hộ tịch.
const DANG_NHAP: StepSpec[] = [
  {
    title: "Truy cập Cổng Dịch vụ công",
    content:
      "Vào địa chỉ dichvucong.gov.vn và nhấn nút Đăng nhập ở góc trên bên phải màn hình.",
  },
  {
    title: "Đăng nhập bằng VNeID",
    content:
      "Nhập số định danh cá nhân (số căn cước công dân) và mật khẩu tài khoản VNeID, sau đó nhấn Đăng nhập.",
  },
  {
    title: "Nhập mã xác nhận",
    content:
      "Nhập mã xác nhận gồm 6 chữ số được gửi về điện thoại hoặc ứng dụng VNeID, rồi nhấn Xác nhận.",
  },
  {
    title: "Xác nhận chia sẻ thông tin",
    content:
      "Tích chọn ô đồng ý và nhấn Xác nhận chia sẻ để cho phép đăng nhập vào Cổng Dịch vụ công Quốc gia.",
  },
  {
    title: "Nhập passcode",
    content:
      "Nhập mã passcode 6 số của tài khoản định danh điện tử rồi nhấn Xác nhận để hoàn tất đăng nhập.",
  },
];

// Bước chuyển từ Cổng DVCQG sang Hệ thống giải quyết TTHC ngành Tư pháp.
const CHIA_SE_TU_PHAP: StepSpec[] = [
  {
    title: "Chia sẻ với hệ thống Tư pháp",
    content:
      "Tích chọn đồng ý và nhấn Xác nhận chia sẻ để đăng nhập Hệ thống giải quyết thủ tục hành chính Bộ Tư pháp.",
  },
  {
    title: "Nhập passcode lần hai",
    content:
      "Nhập lại mã passcode 6 số của tài khoản định danh điện tử rồi nhấn Xác nhận.",
  },
];

export const PROCEDURES: ProcedureSpec[] = [
  {
    key: "dkKetHon",
    slug: "dang-ky-ket-hon",
    title: "Đăng ký kết hôn",
    summary:
      "Hướng dẫn nộp hồ sơ đăng ký kết hôn trực tuyến trên Cổng Dịch vụ công Quốc gia, từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/dkKetHon",
    imagesDir: "annotated",
    video: "HuongDan_DangKyKetHon.mp4",
    registrationUrl: search("đăng ký kết hôn"),
    order: 1,
    steps: [
      ...DANG_NHAP,
      { title: "Tìm thủ tục đăng ký kết hôn", content: "Gõ từ khoá 'đăng ký kết hôn' vào ô tìm kiếm và chọn Thủ tục đăng ký kết hôn (mã 1.000894) trong danh sách gợi ý." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến (nếu đổi cơ quan thì nhấn Đồng ý ở cột bên phải)." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết, rồi nhấn Bước tiếp theo." },
      { title: "Bước 2 – Kê khai thông tin bên nữ", content: "Điền mẫu hộ tịch điện tử phần I: họ tên, ngày sinh, dân tộc, số định danh, giấy tờ tùy thân, nơi cư trú, kết hôn lần thứ mấy và tình trạng hôn nhân của bên nữ." },
      { title: "Kê khai thông tin bên nam", content: "Điền tiếp phần II với thông tin của bên nam theo đúng các mục như bên nữ, sau đó nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai vừa kê khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp Tờ khai.pdf. Nhấn Chọn tệp đính kèm để tải lên giấy tờ tùy thân và giấy tờ chứng minh nơi cư trú (nếu cần), rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả & lệ phí", content: "Chọn hình thức nhận kết quả (bản giấy có đóng dấu, trực tuyến hoặc bưu chính công ích), nhập số lượng phiếu sao trích lục (40.000đ), rồi nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "dkiKhaiSinh",
    slug: "dang-ky-khai-sinh",
    title: "Đăng ký khai sinh",
    summary:
      "Hướng dẫn nộp hồ sơ đăng ký khai sinh trực tuyến trên Cổng Dịch vụ công Quốc gia, từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/dkiKhaiSinh",
    video: "HuongDan_DangKyKhaiSinh.mp4",
    registrationUrl: search("đăng ký khai sinh"),
    order: 2,
    steps: [
      { imgIndex: 10, title: "Đăng nhập VNeID", content: "Truy cập dichvucong.gov.vn và đăng nhập bằng tài khoản VNeID: nhập số định danh cá nhân và mật khẩu, rồi nhấn Đăng nhập." },
      { imgIndex: 9, title: "Nhập mã xác nhận", content: "Nhập mã OTP gồm 6 chữ số được gửi về điện thoại hoặc ứng dụng VNeID, rồi nhấn Xác nhận." },
      { imgIndex: 13, title: "Xác nhận chia sẻ thông tin", content: "Tích chọn đồng ý và nhấn Xác nhận chia sẻ để đăng nhập vào Cổng Dịch vụ công Quốc gia." },
      { imgIndex: 18, title: "Tìm thủ tục đăng ký khai sinh", content: "Gõ 'đăng ký khai sinh' vào ô tìm kiếm và chọn Thủ tục đăng ký khai sinh (mã 1.001193)." },
      { imgIndex: 19, title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { imgIndex: 7, title: "Nộp trực tuyến", content: "Kiểm tra cơ quan thực hiện rồi nhấn Nộp trực tuyến, sau đó nhấn Đồng ý." },
      { imgIndex: 14, title: "Chia sẻ với hệ thống Tư pháp", content: "Nhấn Xác nhận chia sẻ để đăng nhập Hệ thống giải quyết thủ tục hành chính Bộ Tư pháp." },
      { imgIndex: 8, title: "Xác nhận thông tin chung", content: "Chọn cấp thực hiện, tỉnh thành, thủ tục, cơ quan, đơn vị tiếp nhận và đối tượng thực hiện, rồi nhấn Xác nhận." },
      { imgIndex: 11, title: "Bước 1 – Thông tin chủ hồ sơ", content: "Kiểm tra thông tin định danh đã điền sẵn của người yêu cầu đăng ký khai sinh." },
      { imgIndex: 5, title: "Bổ sung thông tin liên hệ", content: "Nhập ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết." },
      { imgIndex: 1, title: "Lưu thông tin & tiếp tục", content: "Có thể chọn lưu thông tin vào hồ sơ cá nhân cho lần sau, rồi nhấn Bước tiếp theo." },
      { imgIndex: 15, title: "Bước 2 – Kê khai người yêu cầu", content: "Điền mẫu hộ tịch điện tử: thông tin người yêu cầu đăng ký và quan hệ với trẻ (cha/mẹ)." },
      { imgIndex: 16, title: "Kê khai thông tin của trẻ", content: "Điền họ tên, ngày sinh, giới tính, dân tộc… của trẻ được khai sinh, rồi nhấn Xem trước." },
      { imgIndex: 12, title: "Xem tờ khai điện tử", content: "Kiểm tra lại nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { imgIndex: 17, title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp PDF. Nhấn Chọn tệp đính kèm để tải lên giấy chứng sinh và giấy tờ liên quan." },
      { imgIndex: 3, title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới." },
      { imgIndex: 2, title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví và Chọn." },
      { imgIndex: 20, title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ (ví dụ giấy chứng sinh) đã được đính kèm vào hồ sơ. Kiểm tra lại rồi chuyển bước tiếp theo." },
      { imgIndex: 4, title: "Bước 4 – Thông tin nhận kết quả", content: "Chọn nơi nhận kết quả và hình thức nhận: bản giấy có đóng dấu, trực tuyến hoặc qua bưu chính công ích." },
      { imgIndex: 6, title: "Nộp hồ sơ", content: "Kiểm tra phí, lệ phí (ví dụ 80.000đ cho bản sao trích lục), rồi nhấn Gửi hồ sơ." },
    ],
  },

  {
    key: "dkiLaiKhaiSinh",
    slug: "dang-ky-lai-khai-sinh",
    title: "Đăng ký lại khai sinh",
    summary:
      "Hướng dẫn nộp hồ sơ đăng ký lại khai sinh trực tuyến trên Cổng Dịch vụ công Quốc gia, từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/dkiLaiKhaiSinh",
    imagesDir: "annotated",
    video: "HuongDan_DangKyLaiKhaiSinh.mp4",
    registrationUrl: search("đăng ký lại khai sinh"),
    order: 3,
    steps: [
      ...DANG_NHAP,
      { title: "Tìm thủ tục đăng ký lại khai sinh", content: "Gõ 'đăng ký lại khai sinh' vào ô tìm kiếm và chọn Thủ tục đăng ký lại khai sinh (mã 1.004884) trong danh sách gợi ý." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến (nếu đổi cơ quan thì nhấn Đồng ý ở cột bên phải)." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết của người yêu cầu, rồi nhấn Bước tiếp theo." },
      { title: "Xác nhận lưu thông tin", content: "Nhấn Đồng ý ở hộp thoại Lưu dữ liệu vào hồ sơ cá nhân để lần sau không phải nhập lại." },
      { title: "Bước 2 – Kê khai người yêu cầu", content: "Điền mẫu hộ tịch điện tử phần I và II: thông tin người yêu cầu, quan hệ với người được khai sinh, loại đăng ký (Đăng ký lại) và cơ quan đăng ký hộ tịch trước đây." },
      { title: "Kê khai cha, mẹ & số bản sao", content: "Điền tiếp thông tin người mẹ (phần III) và người cha (phần IV), tích Đề nghị cấp bản sao và nhập số lượng, rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp Tờ khai.pdf. Nhấn Chọn tệp đính kèm ở dòng giấy tờ tương ứng để tải bản sao Giấy khai sinh hoặc giấy tờ thay thế." },
      { title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới vào ví." },
      { title: "Chọn cách tải lên", content: "Chọn Tải lên từ thiết bị nếu đã có sẵn tệp, hoặc Tạo tệp đính kèm từ nhiều hình ảnh để ghép nhiều ảnh chụp thành một tệp PDF." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví & Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả & lệ phí", content: "Chọn hình thức nhận kết quả, nhập số lượng phiếu sao trích lục (40.000đ), rồi nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "dkKhaiTu",
    slug: "dang-ky-khai-tu",
    title: "Đăng ký khai tử",
    summary:
      "Hướng dẫn nộp hồ sơ đăng ký khai tử trực tuyến trên Cổng Dịch vụ công Quốc gia, từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/dkKhaiTu",
    imagesDir: "annotated",
    video: "HuongDan_DangKyKhaiTu.mp4",
    registrationUrl: search("đăng ký khai tử"),
    order: 4,
    steps: [
      { title: "Truy cập Cổng Dịch vụ công", content: "Vào địa chỉ dichvucong.gov.vn và nhấn nút Đăng nhập ở góc trên bên phải màn hình." },
      { title: "Nhập mã xác nhận đăng nhập", content: "Sau khi nhập số định danh và mật khẩu VNeID, nhập mã xác nhận 6 chữ số gửi về điện thoại hoặc ứng dụng VNeID rồi nhấn Xác nhận." },
      { title: "Xác nhận chia sẻ thông tin", content: "Tích chọn ô đồng ý và nhấn Xác nhận chia sẻ để cho phép đăng nhập vào Cổng Dịch vụ công Quốc gia." },
      { title: "Nhập passcode", content: "Nhập mã passcode 6 số của tài khoản định danh điện tử rồi nhấn Xác nhận để hoàn tất đăng nhập." },
      { title: "Tìm thủ tục đăng ký khai tử", content: "Gõ 'đăng ký khai tử' vào ô tìm kiếm và chọn đúng mục Thủ tục đăng ký khai tử (mã 1.000656) — lưu ý không chọn nhầm các thủ tục khai tử có yếu tố nước ngoài hoặc đăng ký lại khai tử." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, chọn Tỉnh/Thành phố và Phường/Xã ở khối bên phải rồi nhấn Nộp trực tuyến (hoặc nhấn Đồng ý sau khi đổi cơ quan)." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận; chọn Đối tượng thực hiện là Làm thủ tục cho người khác, rồi nhấn Xác nhận." },
      { title: "Bước 2 – Kê khai người yêu cầu", content: "Điền mẫu hộ tịch điện tử phần I: thông tin người đi đăng ký khai tử, nơi cư trú và quan hệ với người được khai tử (con, cháu nội…). Phần II khai thông tin người chết và loại đăng ký." },
      { title: "Kê khai nguyên nhân chết & bản sao", content: "Điền nơi cư trú cuối cùng, ngày chết, nơi chết, nguyên nhân chết, giấy báo tử; tích Đề nghị cấp bản sao và nhập số lượng, rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp Tờ khai.pdf. Nhấn Chọn tệp đính kèm để tải lên Giấy báo tử hoặc giấy tờ chứng minh sự kiện chết." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu vừa chọn, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví & Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách, ghi chú nếu cần rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả & lệ phí", content: "Chọn nơi và hình thức nhận kết quả, nhập số lượng phiếu sao trích lục (40.000đ), rồi nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "xnTinhTrangHonNhan",
    slug: "cap-giay-xac-nhan-tinh-trang-hon-nhan",
    title: "Cấp giấy xác nhận tình trạng hôn nhân",
    summary:
      "Hướng dẫn nộp hồ sơ cấp Giấy xác nhận tình trạng hôn nhân trực tuyến trên Cổng Dịch vụ công Quốc gia (thủ tục miễn phí).",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/xnTinhTrangHonNhan",
    imagesDir: "annotated",
    video: "HuongDan_CapGiayXacNhanTinhTrangHonNhan.mp4",
    registrationUrl: search("xác nhận tình trạng hôn nhân"),
    order: 5,
    steps: [
      ...DANG_NHAP,
      { title: "Tìm thủ tục", content: "Gõ 'xác nhận tình trạng hôn nhân' vào ô tìm kiếm và chọn Thủ tục cấp Giấy xác nhận tình trạng hôn nhân (mã 1.004873)." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến (nếu đổi cơ quan thì nhấn Đồng ý ở cột bên phải)." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết." },
      { title: "Xác nhận lưu thông tin", content: "Nhấn Đồng ý ở hộp thoại Lưu dữ liệu vào hồ sơ cá nhân để lần sau không phải nhập lại." },
      { title: "Kiểm tra & tiếp tục", content: "Xem lại toàn bộ thông tin chủ hồ sơ một lần nữa rồi nhấn Bước tiếp theo." },
      { title: "Bước 2 – Kê khai người yêu cầu", content: "Điền mẫu điện tử tương tác phần I: họ tên, ngày sinh, số định danh, giấy tờ tùy thân, nơi cư trú và quan hệ với người được cấp giấy." },
      { title: "Kê khai người được cấp giấy", content: "Điền tiếp phần II: loại đăng ký, họ tên, ngày sinh, giới tính, dân tộc, quốc tịch và giấy tờ tùy thân của người được cấp giấy, rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp Tờ khai.pdf. Nhấn Chọn tệp đính kèm ở dòng tương ứng để tải lên giấy tờ chứng minh (nếu thuộc trường hợp phải nộp)." },
      { title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới vào ví." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả (miễn phí)", content: "Chọn hình thức nhận kết quả và số lượng phiếu sao trích lục. Thủ tục này miễn phí, tổng số tiền cần thanh toán là 0đ — nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "lienThong",
    slug: "lien-thong-khai-sinh-thuong-tru-bhyt-duoi-6-tuoi",
    title: "Liên thông: Khai sinh – Thường trú – Cấp thẻ BHYT cho trẻ dưới 6 tuổi",
    summary:
      "Hướng dẫn nộp hồ sơ dịch vụ công liên thông: đăng ký khai sinh, đăng ký thường trú và cấp thẻ bảo hiểm y tế cho trẻ em dưới 6 tuổi.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/lienThongKhaiSinh,CapLaiBHYTDuoi6Tuoi",
    video: "HuongDan_LienThongKhaiSinh_BHYT.mp4",
    registrationUrl: LIEN_THONG,
    order: 6,
    steps: [
      { imgIndex: 7, title: "Truy cập Cổng Dịch vụ công", content: "Đăng nhập dichvucong.gov.vn, sau đó chọn ô 'Dịch vụ công liên thông: Khai sinh, Khai tử'." },
      { imgIndex: 9, title: "Chọn dịch vụ liên thông", content: "Tại trang Dịch vụ công liên thông, chọn 'Liên thông đăng ký khai sinh, đăng ký thường trú, cấp thẻ bảo hiểm y tế cho trẻ em dưới 6 tuổi'." },
      { imgIndex: 6, title: "Bước 1 – Lựa chọn cơ quan", content: "Chọn loại khai sinh, tỉnh/thành phố, phường/xã và cơ quan thực hiện đăng ký khai sinh." },
      { imgIndex: 2, title: "Chọn cơ quan thường trú & BHYT", content: "Chọn tiếp cơ quan đăng ký thường trú và cơ quan cấp thẻ BHYT, rồi nhấn Chuyển bước tiếp theo." },
      { imgIndex: 4, title: "Bước 2 – Kê khai người yêu cầu", content: "Điền thông tin người yêu cầu (cha/mẹ của trẻ); có thể nhấn Xác thực với CSDLQG về dân cư." },
      { imgIndex: 5, title: "Kê khai thường trú & BHYT", content: "Điền thông tin đăng ký thường trú, chủ hộ và thông tin cấp thẻ BHYT (nơi khám chữa bệnh ban đầu)." },
      { imgIndex: 8, title: "Bước 3 – Xem lại tờ khai", content: "Kiểm tra lại nội dung các tờ khai: đăng ký khai sinh, thay đổi thông tin cư trú (CT01) và BHXH/BHYT (TK1-TS)." },
      { imgIndex: 1, title: "Kiểm tra & chọn bản sao", content: "Xem kỹ tờ khai, chọn đề nghị cấp bản sao cùng số lượng, rồi nhấn Chuyển bước tiếp theo." },
      { imgIndex: 11, title: "Bước 4 – Đính kèm hồ sơ", content: "Đính kèm bản chụp giấy chứng sinh và tờ khai thay đổi thông tin cư trú (CT01), rồi nhấn Chuyển bước tiếp theo." },
      { imgIndex: 3, title: "Bước 5 – Chọn hình thức nhận kết quả", content: "Chọn hình thức nhận kết quả khai sinh, thường trú và thẻ BHYT, nhập mã kiểm tra rồi nhấn Hoàn thành." },
      { imgIndex: 10, title: "Bước 6 – Hoàn thành", content: "Màn hình báo Kê khai thông tin thành công và hiển thị số hồ sơ. Ghi lại số hồ sơ và ngày hẹn trả để theo dõi kết quả." },
    ],
  },

  {
    key: "dkiNhanChaMeCon",
    slug: "dang-ky-nhan-cha-me-con",
    title: "Đăng ký nhận cha, mẹ, con",
    summary:
      "Hướng dẫn nộp hồ sơ đăng ký nhận cha, mẹ, con trực tuyến trên Cổng Dịch vụ công Quốc gia (thủ tục miễn phí), từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/dkiNhanChaMeCon",
    imagesDir: "annotated",
    video: "HuongDan_DangKyNhanChaMeCon.mp4",
    registrationUrl: search("đăng ký nhận cha mẹ con"),
    order: 7,
    steps: [
      ...DANG_NHAP,
      { title: "Tìm thủ tục đăng ký nhận cha, mẹ, con", content: "Gõ 'đăng ký nhận cha, mẹ, con' vào ô tìm kiếm và chọn đúng mục Thủ tục đăng ký nhận cha, mẹ, con (mã 1.001022) — không chọn nhầm thủ tục kết hợp đăng ký khai sinh hoặc có yếu tố nước ngoài." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến (nếu đổi cơ quan thì nhấn Đồng ý ở cột bên phải)." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết, rồi nhấn Bước tiếp theo." },
      { title: "Bước 2 – Kê khai người yêu cầu", content: "Điền mẫu hộ tịch điện tử phần I: họ tên, số định danh, giấy tờ tùy thân, nơi cư trú, số điện thoại; tích quan hệ với người được nhận (Cha/Mẹ/Con), chọn Loại đăng ký và Loại xác nhận (ví dụ Cha nhận con)." },
      { title: "Kê khai thông tin cha/mẹ", content: "Điền tiếp phần II: họ tên, ngày sinh, giới tính, dân tộc, quốc tịch, số định danh, giấy tờ tùy thân và nơi cư trú của người cha/mẹ, rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp Tờ khai.pdf. Nhấn Chọn tệp đính kèm để tải lên văn bản của cơ quan y tế/giám định xác nhận quan hệ cha con, mẹ con (ví dụ kết quả ADN)." },
      { title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới vào ví." },
      { title: "Chọn cách tải lên", content: "Chọn Tải lên từ thiết bị nếu đã có sẵn tệp, hoặc Tạo tệp đính kèm từ nhiều hình ảnh để ghép nhiều ảnh chụp thành một tệp PDF." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu (ví dụ ADN), thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví & Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả (miễn phí)", content: "Chọn hình thức nhận kết quả và số lượng phiếu sao trích lục. Thủ tục này miễn phí, tổng số tiền cần thanh toán là 0đ — nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "capBsTrichLuc",
    slug: "cap-ban-sao-trich-luc-ho-tich",
    title: "Cấp bản sao Trích lục hộ tịch, bản sao Giấy khai sinh",
    summary:
      "Hướng dẫn xin cấp bản sao Trích lục hộ tịch / bản sao Giấy khai sinh trực tuyến trên Cổng Dịch vụ công Quốc gia, từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/capBsTrichLucHoTichBsGKS",
    imagesDir: "annotated",
    video: "HuongDan_CapBanSaoTrichLucHoTich.mp4",
    registrationUrl: search("cấp bản sao trích lục hộ tịch"),
    order: 8,
    steps: [
      ...DANG_NHAP,
      { title: "Tìm thủ tục cấp bản sao trích lục", content: "Gõ 'cấp bản sao trích lục' vào ô tìm kiếm và chọn Cấp bản sao Trích lục hộ tịch, bản sao Giấy khai sinh (mã 2.000635)." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến (nếu đổi cơ quan thì nhấn Đồng ý ở cột bên phải)." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết, rồi nhấn Bước tiếp theo." },
      { title: "Bước 2 – Kê khai người yêu cầu", content: "Điền mẫu điện tử tương tác phần I: họ tên, số định danh cá nhân, giấy tờ tùy thân, ngày và cơ quan cấp, loại cư trú và nơi cư trú của người yêu cầu." },
      { title: "Chọn quan hệ & xem trước", content: "Tích chọn quan hệ với người được cấp bản sao (bản thân, vợ/chồng, con đẻ, cha/mẹ…), điền phần II về giấy tờ hộ tịch đã đăng ký, rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp Tờ khai.pdf. Nhấn Chọn tệp đính kèm để tải lên văn bản ủy quyền hoặc giấy tờ tùy thân nếu thuộc trường hợp phải nộp, rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả & lệ phí", content: "Chọn nơi và hình thức nhận kết quả, nhập số lượng phiếu sao trích lục (8.000đ/bản), rồi nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ và số tiền cần thanh toán khi nhận kết quả. Nhấn Hồ sơ của tôi để theo dõi tiến độ." },
    ],
  },

  {
    key: "dkiGiamHo",
    slug: "dang-ky-giam-ho",
    title: "Đăng ký giám hộ",
    summary:
      "Hướng dẫn nộp hồ sơ đăng ký giám hộ trực tuyến trên Cổng Dịch vụ công Quốc gia (thủ tục miễn phí), từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/dkiGiamHo",
    imagesDir: "annotated",
    video: "HuongDan_DangKyGiamHo.mp4",
    registrationUrl: search("đăng ký giám hộ"),
    order: 9,
    steps: [
      ...DANG_NHAP,
      { title: "Tìm thủ tục đăng ký giám hộ", content: "Gõ 'đăng ký giám hộ' vào ô tìm kiếm và chọn đúng mục Thủ tục đăng ký giám hộ (mã 1.004837) — không chọn nhầm thủ tục có yếu tố nước ngoài." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết, rồi nhấn Bước tiếp theo." },
      { title: "Bước 2 – Kê khai thông tin", content: "Điền mẫu hộ tịch điện tử: thông tin định danh, nơi cư trú của người giám hộ (phần II) và thông tin của người được giám hộ (phần III)." },
      { title: "Kê khai lý do giám hộ", content: "Điền lý do đăng ký giám hộ (căn cứ quyết định của Toà án hoặc quy định pháp luật), kiểm tra lại rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp Tờ khai.pdf. Nhấn Chọn tệp đính kèm ở từng dòng để tải lên văn bản cử người giám hộ hoặc giấy tờ chứng minh điều kiện giám hộ, rồi nhấn Bước tiếp theo." },
      { title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới vào ví." },
      { title: "Chọn cách tải lên", content: "Chọn Tải lên từ thiết bị nếu đã có sẵn tệp, hoặc Tạo tệp đính kèm từ nhiều hình ảnh để ghép nhiều ảnh chụp thành một tệp PDF." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví & Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả (miễn phí)", content: "Chọn hình thức nhận kết quả. Thủ tục này miễn phí, tổng số tiền cần thanh toán là 0đ — nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "giamSatViecGiamHo",
    slug: "dang-ky-giam-sat-viec-giam-ho",
    title: "Đăng ký giám sát việc giám hộ",
    summary:
      "Hướng dẫn nộp hồ sơ đăng ký giám sát việc giám hộ trực tuyến trên Cổng Dịch vụ công Quốc gia (thủ tục miễn phí), từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/giamSatViecGiamHo",
    imagesDir: "annotated",
    video: "HuongDan_DangKyGiamSatViecGiamHo.mp4",
    registrationUrl: search("đăng ký giám sát việc giám hộ"),
    order: 10,
    steps: [
      ...DANG_NHAP,
      { title: "Tìm thủ tục đăng ký giám sát việc giám hộ", content: "Gõ 'đăng ký giám sát việc giám hộ' vào ô tìm kiếm và chọn Thủ tục đăng ký giám sát việc giám hộ (mã 3.000323)." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết, rồi nhấn Bước tiếp theo." },
      { title: "Bước 2 – Kê khai thông tin", content: "Điền mẫu hộ tịch điện tử: thông tin người yêu cầu đăng ký (phần I) và thông tin người giám sát việc giám hộ (phần II)." },
      { title: "Kê khai thông tin (tiếp)", content: "Điền tiếp nơi cư trú, giấy tờ tuỳ thân của người giám sát việc giám hộ, kiểm tra lại rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp Tờ khai.pdf. Nhấn Chọn tệp đính kèm ở từng dòng để tải lên văn bản thoả thuận cử người giám sát hoặc văn bản ủy quyền, rồi nhấn Bước tiếp theo." },
      { title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới vào ví." },
      { title: "Chọn cách tải lên", content: "Chọn Tải lên từ thiết bị nếu đã có sẵn tệp, hoặc Tạo tệp đính kèm từ nhiều hình ảnh để ghép nhiều ảnh chụp thành một tệp PDF." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví & Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả (miễn phí)", content: "Chọn hình thức nhận kết quả. Thủ tục này miễn phí, tổng số tiền cần thanh toán là 0đ — nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "chamDutGiamHo",
    slug: "dang-ky-cham-dut-giam-ho",
    title: "Đăng ký chấm dứt giám hộ",
    summary:
      "Hướng dẫn nộp hồ sơ đăng ký chấm dứt giám hộ trực tuyến trên Cổng Dịch vụ công Quốc gia (thủ tục miễn phí), từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/chamDutGiamHo",
    imagesDir: "annotated",
    video: "HuongDan_DangKyChamDutGiamHo.mp4",
    registrationUrl: search("chấm dứt giám hộ"),
    order: 11,
    steps: [
      ...DANG_NHAP,
      { title: "Tìm thủ tục đăng ký chấm dứt giám hộ", content: "Gõ 'chấm dứt giám hộ' vào ô tìm kiếm và chọn đúng mục Thủ tục đăng ký chấm dứt giám hộ (mã 1.004845) — không chọn nhầm thủ tục có yếu tố nước ngoài." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết, rồi nhấn Bước tiếp theo." },
      { title: "Bước 2 – Kê khai thông tin", content: "Điền mẫu hộ tịch điện tử: thông tin người yêu cầu đăng ký (phần I) và thông tin người giám hộ hiện tại (phần II)." },
      { title: "Kê khai lý do chấm dứt giám hộ", content: "Điền thông tin người được giám hộ (phần III) và lý do chấm dứt giám hộ, kiểm tra lại rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp Tờ khai.pdf. Nhấn Chọn tệp đính kèm ở từng dòng để tải lên giấy tờ làm căn cứ chấm dứt giám hộ hoặc văn bản ủy quyền, rồi nhấn Bước tiếp theo." },
      { title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới vào ví." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví & Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả (miễn phí)", content: "Chọn hình thức nhận kết quả. Thủ tục này miễn phí, tổng số tiền cần thanh toán là 0đ — nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "chamDutGiamSatGiamHo",
    slug: "dang-ky-cham-dut-giam-sat-viec-giam-ho",
    title: "Đăng ký chấm dứt giám sát việc giám hộ",
    summary:
      "Hướng dẫn nộp hồ sơ đăng ký chấm dứt giám sát việc giám hộ trực tuyến trên Cổng Dịch vụ công Quốc gia (thủ tục miễn phí), từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/chamDutGiamSatGiamHo",
    imagesDir: "annotated",
    video: "HuongDan_DangKyChamDutGiamSatViecGiamHo.mp4",
    registrationUrl: search("chấm dứt giám sát việc giám hộ"),
    order: 12,
    steps: [
      ...DANG_NHAP,
      { title: "Tìm thủ tục đăng ký chấm dứt giám sát việc giám hộ", content: "Gõ 'chấm dứt giám sát việc giám hộ' vào ô tìm kiếm và chọn Thủ tục đăng ký chấm dứt giám sát việc giám hộ (mã 3.000322)." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến để chuyển sang Hệ thống giải quyết thủ tục hành chính Bộ Tư pháp." },
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết, rồi nhấn Bước tiếp theo." },
      { title: "Bước 2 – Kê khai thông tin", content: "Điền mẫu hộ tịch điện tử: thông tin người yêu cầu đăng ký (phần I) và thông tin người giám sát việc giám hộ (phần II)." },
      { title: "Kê khai nội dung đăng ký", content: "Điền nội dung đăng ký chấm dứt giám sát việc giám hộ, kiểm tra lại toàn bộ thông tin rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp Tờ khai.pdf. Nhấn Chọn tệp đính kèm ở từng dòng để tải lên giấy tờ làm căn cứ chấm dứt giám sát hoặc văn bản ủy quyền, rồi nhấn Bước tiếp theo." },
      { title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới vào ví." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví & Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả (miễn phí)", content: "Chọn hình thức nhận kết quả. Thủ tục này miễn phí, tổng số tiền cần thanh toán là 0đ — nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "dkNuoiConNuoi",
    slug: "dang-ky-nuoi-con-nuoi-trong-nuoc",
    title: "Đăng ký việc nuôi con nuôi trong nước",
    summary:
      "Hướng dẫn nộp hồ sơ đăng ký việc nuôi con nuôi trong nước trực tuyến trên Cổng Dịch vụ công Quốc gia, từng bước bằng hình ảnh và video.",
    categorySlug: "con-nuoi",
    categoryName: "Con nuôi",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/dkNuoiConNuoi(nuoiConNuoi)",
    imagesDir: "annotated",
    video: "HuongDan_DangKyNuoiConNuoiTrongNuoc.mp4",
    registrationUrl: search("nuôi con nuôi trong nước"),
    order: 13,
    steps: [
      ...DANG_NHAP,
      { title: "Tìm thủ tục đăng ký nuôi con nuôi", content: "Gõ 'nuôi con nuôi' vào ô tìm kiếm và chọn đúng mục Đăng ký việc nuôi con nuôi trong nước (mã 2.001263) — không chọn nhầm các thủ tục có yếu tố nước ngoài hoặc đăng ký lại." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết, rồi nhấn Bước tiếp theo." },
      { title: "Bước 2 – Kê khai thông tin", content: "Điền mẫu hộ tịch điện tử: thông tin người yêu cầu đăng ký (phần I) và thông tin con nuôi (phần II) — họ tên, ngày sinh, giấy khai sinh, nơi cư trú, nơi sinh của trẻ." },
      { title: "Kê khai thông tin cha, mẹ nuôi", content: "Điền tiếp thông tin cha, mẹ nuôi (phần IV) và thông tin về việc đăng ký nuôi con nuôi (phần V), rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động. Nhấn Chọn tệp đính kèm ở từng dòng để tải lên giấy khám sức khoẻ, văn bản xác nhận hoàn cảnh gia đình và tình trạng hôn nhân của người nhận con nuôi, rồi nhấn Bước tiếp theo." },
      { title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới vào ví." },
      { title: "Chọn cách tải lên", content: "Chọn Tải lên từ thiết bị nếu đã có sẵn tệp, hoặc Tạo tệp đính kèm từ nhiều hình ảnh để ghép nhiều ảnh chụp thành một tệp PDF." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví & Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Các giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả & lệ phí", content: "Chọn hình thức nhận kết quả trực tuyến. Kiểm tra lệ phí đăng ký (400.000đ) — số tiền này sẽ thanh toán sau khi nhận kết quả hồ sơ, rồi nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "thayDoiCaiChinhBoSungHoTich",
    slug: "thay-doi-cai-chinh-bo-sung-thong-tin-ho-tich",
    title: "Thay đổi, cải chính, bổ sung thông tin hộ tịch, xác định lại dân tộc",
    summary:
      "Hướng dẫn nộp hồ sơ thay đổi, cải chính, bổ sung thông tin hộ tịch, xác định lại dân tộc trực tuyến trên Cổng Dịch vụ công Quốc gia (thủ tục miễn phí), từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/thayDoiCaiChinhBoSungHoTich",
    imagesDir: "annotated",
    video: "HuongDan_ThayDoiCaiChinhBoSungHoTich.mp4",
    registrationUrl: search("thay đổi cải chính bổ sung thông tin hộ tịch"),
    order: 14,
    steps: [
      ...DANG_NHAP,
      { title: "Tìm thủ tục", content: "Gõ 'thay đổi, cải chính, bổ sung thông tin hộ tịch' vào ô tìm kiếm và chọn đúng mục Thủ tục thay đổi, cải chính, bổ sung thông tin hộ tịch, xác định lại dân tộc (mã 1.004859) — không chọn nhầm thủ tục có yếu tố nước ngoài." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Ở trang Danh sách dịch vụ công, kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết, rồi nhấn Bước tiếp theo." },
      { title: "Bước 2 – Kê khai thông tin", content: "Điền mẫu hộ tịch điện tử: thông tin người yêu cầu đăng ký (phần I) và thông tin người có nội dung thay đổi, cải chính (phần II)." },
      { title: "Kê khai nội dung đề nghị thay đổi", content: "Điền nội dung đề nghị thay đổi, cải chính hộ tịch và lý do thay đổi (phần III), kiểm tra lại rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp Tờ khai.pdf. Nhấn Chọn tệp đính kèm ở từng dòng để tải lên giấy tờ hộ tịch đã đăng ký và giấy tờ liên quan đến nội dung thay đổi, cải chính, rồi nhấn Bước tiếp theo." },
      { title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới vào ví." },
      { title: "Chọn cách tải lên", content: "Chọn Tải lên từ thiết bị nếu đã có sẵn tệp, hoặc Tạo tệp đính kèm từ nhiều hình ảnh để ghép nhiều ảnh chụp thành một tệp PDF." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví & Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả (miễn phí)", content: "Chọn hình thức nhận kết quả. Thủ tục này miễn phí, tổng số tiền cần thanh toán là 0đ — nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "ChungThucSaoYBanChinhGiayTo",
    slug: "chung-thuc-ban-sao-tu-ban-chinh-giay-to",
    title: "Chứng thực bản sao từ bản chính giấy tờ",
    summary:
      "Hướng dẫn nộp hồ sơ chứng thực bản sao từ bản chính giấy tờ, văn bản trực tuyến trên Cổng Dịch vụ công Quốc gia, từng bước bằng hình ảnh và video.",
    categorySlug: "chung-thuc",
    categoryName: "Chứng thực",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/ChungThucSaoYBanChinhGiayTo(chungThuc)",
    imagesDir: "annotated",
    video: "HuongDan_ChungThucBanSaoTuBanChinh.mp4",
    registrationUrl: search("chứng thực bản sao từ bản chính"),
    order: 15,
    steps: [
      { title: "Đăng nhập bằng VNeID", content: "Vào địa chỉ dichvucong.gov.vn, nhấn Đăng nhập rồi nhập số định danh cá nhân và mật khẩu tài khoản VNeID, sau đó nhấn Đăng nhập." },
      { title: "Nhập mã xác nhận", content: "Mở ứng dụng VNeID để lấy mã xác nhận gồm 6 chữ số rồi nhập vào ô tương ứng." },
      { title: "Xác nhận chia sẻ thông tin", content: "Tích chọn ô đồng ý và nhấn Xác nhận chia sẻ để cho phép đăng nhập vào Cổng Dịch vụ công Quốc gia." },
      { title: "Nhập passcode", content: "Nhập mã passcode 6 số của tài khoản định danh điện tử rồi nhấn Xác nhận để hoàn tất đăng nhập." },
      { title: "Tìm thủ tục chứng thực bản sao", content: "Gõ 'chứng thực bản sao từ bản chính' vào ô tìm kiếm và chọn Chứng thực bản sao từ bản chính giấy tờ, văn bản do cơ quan, tổ chức có thẩm quyền của Việt Nam cấp hoặc chứng nhận (mã 2.000815)." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến để chuyển sang Hệ thống giải quyết thủ tục hành chính Bộ Tư pháp." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết, rồi nhấn Bước tiếp theo." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Nhấn Chọn tệp đính kèm để tải lên bản chính giấy tờ, văn bản làm cơ sở chứng thực và bản sao cần chứng thực, chọn loại chứng thực (điện tử & giấy), rồi nhấn Bước tiếp theo." },
      { title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới vào ví." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví & Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả", content: "Chọn hình thức nhận kết quả trực tuyến. Phí và lệ phí sẽ do cán bộ tiếp nhận xác định và liên hệ sau, rồi nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "chungThucChuKyTrongCacGIayToVanBan",
    slug: "chung-thuc-chu-ky-trong-cac-giay-to-van-ban",
    title: "Chứng thực chữ ký trong các giấy tờ, văn bản",
    summary:
      "Hướng dẫn nộp hồ sơ chứng thực chữ ký trong các giấy tờ, văn bản trực tuyến trên Cổng Dịch vụ công Quốc gia, từng bước bằng hình ảnh và video.",
    categorySlug: "chung-thuc",
    categoryName: "Chứng thực",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/chungThucChuKyTrongCacGIayToVanBan(chungThuc)",
    imagesDir: "annotated",
    video: "HuongDan_ChungThucChuKy.mp4",
    registrationUrl: search("chứng thực chữ ký"),
    order: 16,
    steps: [
      { title: "Đăng nhập bằng VNeID", content: "Vào địa chỉ dichvucong.gov.vn, nhấn Đăng nhập rồi nhập số định danh cá nhân và mật khẩu tài khoản VNeID, sau đó nhấn Đăng nhập." },
      { title: "Nhập mã xác nhận", content: "Mở ứng dụng VNeID để lấy mã xác nhận gồm 6 chữ số rồi nhập vào ô tương ứng." },
      { title: "Xác nhận chia sẻ thông tin", content: "Tích chọn ô đồng ý và nhấn Xác nhận chia sẻ để cho phép đăng nhập vào Cổng Dịch vụ công Quốc gia." },
      { title: "Nhập passcode", content: "Nhập mã passcode 6 số của tài khoản định danh điện tử rồi nhấn Xác nhận để hoàn tất đăng nhập." },
      { title: "Tìm thủ tục chứng thực chữ ký", content: "Gõ 'chứng thực chữ ký' vào ô tìm kiếm và chọn đúng mục Thủ tục Chứng thực chữ ký trong các giấy tờ, văn bản (mã 1.001590) — không chọn nhầm các thủ tục chứng thực chữ ký người dịch hoặc người giám hộ." },
      { title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, tại khối Chọn cơ quan thực hiện bên phải, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Kiểm tra lại cơ quan thực hiện rồi nhấn Nộp trực tuyến để chuyển sang Hệ thống giải quyết thủ tục hành chính Bộ Tư pháp." },
      ...CHIA_SE_TU_PHAP,
      { title: "Xác nhận thông tin chung", content: "Kiểm tra Cấp thực hiện, Tỉnh thành, Thủ tục hành chính, Cơ quan thực hiện, Đơn vị tiếp nhận và Đối tượng thực hiện, rồi nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Thông tin định danh được điền sẵn. Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết, rồi nhấn Bước tiếp theo." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Nhấn Chọn tệp đính kèm để tải lên giấy tờ, văn bản mà mình sẽ yêu cầu chứng thực chữ ký và giấy tờ tuỳ thân, chọn loại chứng thực (điện tử & giấy), rồi nhấn Bước tiếp theo." },
      { title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ mới vào ví." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví & Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại danh sách rồi nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả", content: "Chọn hình thức nhận kết quả trực tuyến. Phí và lệ phí sẽ do cán bộ tiếp nhận xác định và liên hệ sau, rồi nhấn Gửi hồ sơ." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công kèm mã hồ sơ. Ghi lại mã này và nhấn Hồ sơ của tôi để theo dõi tiến độ xử lý." },
    ],
  },

  {
    key: "LienThongDangKiKhaiTu",
    slug: "lien-thong-dang-ky-khai-tu-xoa-thuong-tru-tro-cap-mai-tang",
    title: "Liên thông: Khai tử – Xóa thường trú – Trợ cấp mai táng, tử tuất",
    summary:
      "Hướng dẫn nộp hồ sơ dịch vụ công liên thông: đăng ký khai tử, xóa đăng ký thường trú và hưởng chế độ mai táng phí, tử tuất trên Cổng Dịch vụ công liên thông.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "/Users/tuananhtran/CodeProject/NopHsOnline/LienThongDangKiKhaiTu",
    imagesDir: "annotated",
    video: "HuongDan_LienThongDangKyKhaiTu.mp4",
    registrationUrl: LIEN_THONG_PORTAL,
    order: 17,
    steps: [
      { title: "Truy cập Cổng Dịch vụ công", content: "Vào địa chỉ dichvucong.gov.vn và nhấn nút Đăng nhập ở góc trên bên phải màn hình để đăng nhập bằng tài khoản định danh điện tử VNeID." },
      { title: "Nhập mã xác nhận đăng nhập", content: "Sau khi nhập số định danh cá nhân và mật khẩu VNeID, mở ứng dụng VNeID để lấy mã xác nhận gồm sáu chữ số rồi nhập vào các ô hiển thị." },
      { title: "Xác nhận chia sẻ thông tin", content: "Tích chọn ô đồng ý rồi nhấn Xác nhận chia sẻ để cho phép Hệ thống định danh và xác thực điện tử chia sẻ dữ liệu với Cổng Dịch vụ công quốc gia." },
      { title: "Vào Dịch vụ công liên thông", content: "Sau khi đăng nhập thành công, tại trang chủ Cổng Dịch vụ công quốc gia, nhấn ô Dịch vụ công liên thông: Khai sinh, Khai tử." },
      { title: "Chọn thủ tục liên thông khai tử", content: "Tại trang Dịch vụ công liên thông, chọn ô Thủ tục liên thông về đăng ký khai tử, xóa đăng ký thường trú, hưởng chế độ tử tuất (trợ cấp tuất và trợ cấp mai táng)/hỗ trợ chi phí mai táng/hưởng mai táng phí." },
      { title: "Bước 1 – Chọn đối tượng hưởng trợ cấp", content: "Chọn tỉnh thành, phường xã cho cơ quan đăng ký khai tử, cơ quan xóa đăng ký thường trú, sau đó chọn đúng nhóm đối tượng hưởng trợ cấp mai táng phí, tử tuất trong danh sách sổ xuống." },
      { title: "Xác nhận cơ quan thực hiện", content: "Kiểm tra lại cơ quan thực hiện đăng ký khai tử, xóa đăng ký thường trú và giải quyết chế độ mai táng phí, tử tuất, rồi nhấn Chuyển bước tiếp theo." },
      { title: "Bước 2 – Kê khai thông tin người yêu cầu", content: "Hệ thống tự điền thông tin người yêu cầu từ tài khoản định danh điện tử; có thể nhấn Xác thực với CSDLQG về dân cư để cập nhật, sau đó điền quan hệ với người chết, số điện thoại và email." },
      { title: "Kê khai quê quán & hình thức nhận trợ cấp", content: "Cuộn xuống điền quê quán của người nhận mai táng phí, chọn hình thức nhận trợ cấp và nơi nhận tiền mặt, rồi nhấn Chuyển bước tiếp theo." },
      { title: "Bước 3 – Xem lại các tờ khai chi tiết", content: "Kiểm tra lại nội dung ba tờ khai được tạo tự động: Tờ khai đăng ký khai tử, Tờ khai thay đổi thông tin cư trú (CT01) và Tờ khai đề nghị hỗ trợ chi phí mai táng, rồi nhấn Chuyển bước tiếp theo." },
      { title: "Bước 4 – Đính kèm thành phần hồ sơ", content: "Nhấn Chọn tệp tin ở từng dòng để tải lên bản chụp Giấy báo tử hoặc giấy tờ, chứng cứ chứng minh sự kiện chết, rồi nhấn Chuyển bước tiếp theo." },
      { title: "Bước 5 – Hoàn thành và nộp hồ sơ", content: "Kiểm tra hình thức và nơi nhận tiền trợ cấp mai táng phí, nhập mã kiểm tra rồi nhấn Hoàn thành để nộp hồ sơ." },
    ],
  },
];
