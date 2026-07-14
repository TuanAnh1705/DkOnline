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
  video?: string;
  registrationUrl?: string;
  order?: number;
  steps: StepSpec[];
}

// Link đăng ký từng thủ tục trên Cổng DVC Quốc gia (theo mã thủ tục)
const dvc = (code: string) =>
  `https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=${code}`;
const LIEN_THONG = "https://lienthong.dichvucong.gov.vn/";

export const PROCEDURES: ProcedureSpec[] = [
  {
    key: "dkKetHon",
    slug: "dang-ky-ket-hon",
    title: "Đăng ký kết hôn",
    summary:
      "Hướng dẫn nộp hồ sơ đăng ký kết hôn trực tuyến trên Cổng Dịch vụ công Quốc gia, từng bước bằng hình ảnh và video.",
    categorySlug: "ho-tich",
    categoryName: "Hộ tịch",
    dir: "D:/NopHsOnline/dkKetHon",
    video: "HuongDan_DangKyKetHon.mp4",
    registrationUrl: dvc("1.000894"),
    order: 1,
    steps: [
      { title: "Truy cập Cổng Dịch vụ công", content: "Vào địa chỉ dichvucong.gov.vn và nhấn nút Đăng nhập ở góc trên bên phải màn hình." },
      { title: "Đăng nhập bằng VNeID", content: "Nhập số định danh cá nhân (số căn cước công dân) và mật khẩu tài khoản VNeID, sau đó nhấn Đăng nhập." },
      { title: "Nhập mã xác nhận", content: "Nhập mã OTP gồm 6 chữ số được gửi về điện thoại hoặc ứng dụng VNeID, rồi nhấn Xác nhận." },
      { title: "Xác nhận chia sẻ thông tin", content: "Tích chọn ô đồng ý và nhấn Xác nhận chia sẻ để cho phép đăng nhập vào Cổng Dịch vụ công Quốc gia." },
      { title: "Nhập passcode", content: "Nhập mã passcode 6 số của tài khoản định danh điện tử để hoàn tất xác thực." },
      { title: "Tìm thủ tục đăng ký kết hôn", content: "Gõ từ khoá 'đăng ký kết hôn' vào ô tìm kiếm và chọn Thủ tục đăng ký kết hôn (mã 1.000894)." },
      { title: "Chọn cơ quan thực hiện", content: "Chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú ở khung bên phải, rồi nhấn Nộp hồ sơ." },
      { title: "Nộp trực tuyến", content: "Kiểm tra cơ quan thực hiện, nhấn Nộp trực tuyến và nhấn Đồng ý để chuyển sang hệ thống ngành Tư pháp." },
      { title: "Xác nhận thông tin chung", content: "Chọn cấp thực hiện, tỉnh thành, thủ tục, cơ quan và đơn vị tiếp nhận, sau đó nhấn Xác nhận." },
      { title: "Bước 1 – Thông tin chủ hồ sơ", content: "Bổ sung ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ, rồi nhấn Bước tiếp theo." },
      { title: "Bước 2 – Kê khai thông tin bên nữ", content: "Điền đầy đủ họ tên, ngày sinh, số định danh, giấy tờ tuỳ thân, nơi cư trú và tình trạng hôn nhân của bên nữ." },
      { title: "Kê khai thông tin bên nam", content: "Điền thông tin bên nam tương tự, chọn loại đăng ký và số lượng bản sao mong muốn, rồi nhấn Xem trước." },
      { title: "Xem tờ khai điện tử", content: "Kiểm tra lại toàn bộ thông tin trên tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp PDF. Nhấn Chọn tệp đính kèm để tải lên các giấy tờ còn lại." },
      { title: "Danh sách tài liệu điện tử", content: "Trong ví giấy tờ, nếu chưa có tài liệu, nhấn Tải lên từ thiết bị để thêm giấy tờ mới." },
      { title: "Chọn cách tải lên", content: "Chọn Tải lên từ thiết bị với tệp có sẵn, hoặc Tạo tệp đính kèm từ nhiều hình ảnh để ghép nhiều ảnh thành một tệp PDF." },
      { title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví và Chọn." },
      { title: "Hoàn tất đính kèm hồ sơ", content: "Giấy tờ đã được đính kèm vào hồ sơ. Kiểm tra lại danh sách và nhấn Bước tiếp theo." },
      { title: "Bước 4 – Nhận kết quả & lệ phí", content: "Chọn nơi và hình thức nhận kết quả. Kiểm tra phí, lệ phí rồi nhấn Thanh toán." },
      { title: "Thanh toán trực tuyến", content: "Kiểm tra thông tin, tích đồng ý với điều khoản và nhấn Thanh toán & Nộp hồ sơ." },
      { title: "Chọn phương thức thanh toán", content: "Tại Cổng thanh toán tập trung, chọn hình thức Thanh toán bằng mã QR." },
      { title: "Chọn đơn vị thanh toán", content: "Chọn ngân hàng hoặc ví điện tử bạn dùng (VNPAY, MoMo, BIDV…) rồi nhấn Tiếp tục thanh toán." },
      { title: "Quét mã QR thanh toán", content: "Mở ứng dụng ngân hàng, quét mã QR trên màn hình và xác nhận thanh toán khi mã còn hiệu lực." },
      { title: "Nộp hồ sơ thành công", content: "Màn hình báo Thanh toán thành công nghĩa là hồ sơ đã được nộp. Chờ cơ quan xử lý và nhận kết quả theo lịch hẹn." },
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
    dir: "D:/NopHsOnline/dkiKhaiSinh",
    video: "HuongDan_DangKyKhaiSinh.mp4",
    registrationUrl: dvc("1.001193"),
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
    dir: "D:/NopHsOnline/dkiLaiKhaiSinh",
    video: "HuongDan_DangKyLaiKhaiSinh.mp4",
    registrationUrl: dvc("1.004884"),
    order: 3,
    steps: [
      { imgIndex: 16, title: "Tìm thủ tục đăng ký lại khai sinh", content: "Sau khi đăng nhập, gõ 'đăng ký lại khai sinh' vào ô tìm kiếm và chọn Thủ tục đăng ký lại khai sinh (mã 1.004884)." },
      { imgIndex: 15, title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { imgIndex: 11, title: "Nộp trực tuyến", content: "Kiểm tra cơ quan thực hiện rồi nhấn Nộp trực tuyến, sau đó nhấn Đồng ý." },
      { imgIndex: 9, title: "Xác nhận thông tin chung", content: "Chọn cấp thực hiện, tỉnh thành, thủ tục, cơ quan, đơn vị tiếp nhận và đối tượng thực hiện, rồi nhấn Xác nhận." },
      { imgIndex: 5, title: "Bước 1 – Thông tin chủ hồ sơ", content: "Kiểm tra thông tin định danh đã điền sẵn của người yêu cầu." },
      { imgIndex: 6, title: "Bổ sung thông tin liên hệ", content: "Nhập ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết." },
      { imgIndex: 10, title: "Kiểm tra và tiếp tục", content: "Xem lại thông tin, có thể tích lưu vào hồ sơ cá nhân cho lần sau, rồi nhấn Bước tiếp theo." },
      { imgIndex: 3, title: "Xác nhận lưu thông tin", content: "Nhấn Đồng ý ở hộp thoại lưu dữ liệu vào hồ sơ cá nhân để tiếp tục." },
      { imgIndex: 13, title: "Bước 2 – Kê khai thông tin", content: "Điền mẫu hộ tịch điện tử: thông tin người yêu cầu và người được đăng ký lại khai sinh." },
      { imgIndex: 14, title: "Kê khai cha/mẹ & bản sao", content: "Điền thông tin cha, mẹ của người được khai sinh, chọn số lượng bản sao cần cấp, rồi nhấn Xem trước." },
      { imgIndex: 12, title: "Xem tờ khai điện tử", content: "Kiểm tra lại nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { imgIndex: 18, title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp PDF. Nhấn Chọn tệp đính kèm để tải lên bản sao giấy khai sinh và giấy tờ liên quan." },
      { imgIndex: 4, title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ." },
      { imgIndex: 1, title: "Chọn cách tải lên", content: "Chọn Tải lên từ thiết bị với tệp có sẵn, hoặc Tạo tệp đính kèm từ nhiều hình ảnh." },
      { imgIndex: 2, title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví và Chọn." },
      { imgIndex: 19, title: "Hoàn tất đính kèm", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ." },
      { imgIndex: 17, title: "Kiểm tra hồ sơ & tiếp tục", content: "Kiểm tra lại danh sách thành phần hồ sơ, ghi chú nếu cần rồi nhấn Bước tiếp theo." },
      { imgIndex: 7, title: "Bước 4 – Nhận kết quả & lệ phí", content: "Chọn nơi và hình thức nhận kết quả. Kiểm tra phí (ví dụ 40.000đ cho bản sao) rồi nhấn Thanh toán." },
      { imgIndex: 8, title: "Thanh toán trực tuyến", content: "Kiểm tra thông tin, tích đồng ý điều khoản và nhấn Thanh toán & Nộp hồ sơ." },
      { imgIndex: 20, title: "Quét mã QR thanh toán", content: "Tại Cổng thanh toán tập trung, quét mã QR bằng ứng dụng ngân hàng để thanh toán và hoàn tất nộp hồ sơ." },
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
    dir: "D:/NopHsOnline/dkKhaiTu",
    video: "HuongDan_DangKyKhaiTu.mp4",
    registrationUrl: dvc("1.000656"),
    order: 4,
    steps: [
      { imgIndex: 24, title: "Tìm thủ tục đăng ký khai tử", content: "Sau khi đăng nhập, gõ 'đăng ký khai tử' vào ô tìm kiếm và chọn Thủ tục đăng ký khai tử (mã 1.000656)." },
      { imgIndex: 22, title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { imgIndex: 15, title: "Nộp trực tuyến", content: "Kiểm tra cơ quan thực hiện rồi nhấn Nộp trực tuyến, sau đó nhấn Đồng ý." },
      { imgIndex: 14, title: "Nhập mã xác nhận đăng nhập", content: "Khi chuyển sang hệ thống Tư pháp, nhập mã OTP gửi về điện thoại hoặc ứng dụng VNeID rồi nhấn Xác nhận." },
      { imgIndex: 7, title: "Nhập passcode", content: "Nhập mã passcode 6 số của tài khoản định danh điện tử để xác thực." },
      { imgIndex: 18, title: "Xác nhận chia sẻ thông tin", content: "Tích chọn đồng ý để chia sẻ thông tin với Hệ thống giải quyết thủ tục hành chính Bộ Tư pháp." },
      { imgIndex: 20, title: "Đồng ý chia sẻ để tiếp tục", content: "Nhấn Xác nhận chia sẻ để hoàn tất đăng nhập vào hệ thống Tư pháp." },
      { imgIndex: 12, title: "Xác nhận thông tin chung", content: "Chọn cấp thực hiện, tỉnh thành, thủ tục, cơ quan, đơn vị tiếp nhận và đối tượng thực hiện, rồi nhấn Xác nhận." },
      { imgIndex: 2, title: "Bước 1 – Thông tin chủ hồ sơ", content: "Kiểm tra thông tin định danh của người đi đăng ký khai tử (người yêu cầu)." },
      { imgIndex: 11, title: "Bổ sung thông tin liên hệ", content: "Nhập ngày cấp, nơi cấp giấy tờ, số điện thoại, email và địa chỉ chi tiết." },
      { imgIndex: 13, title: "Kiểm tra và tiếp tục", content: "Xem lại thông tin, có thể tích lưu vào hồ sơ cá nhân cho lần sau, rồi nhấn Bước tiếp theo." },
      { imgIndex: 5, title: "Xác nhận lưu thông tin", content: "Nhấn Đồng ý ở hộp thoại lưu dữ liệu vào hồ sơ cá nhân để tiếp tục." },
      { imgIndex: 17, title: "Bước 2 – Kê khai người yêu cầu", content: "Điền mẫu hộ tịch điện tử: thông tin người yêu cầu và quan hệ với người đã mất." },
      { imgIndex: 25, title: "Kê khai thông tin người chết", content: "Điền nguyên nhân chết, giấy báo tử và số lượng bản sao cần cấp, rồi nhấn Xem trước." },
      { imgIndex: 16, title: "Xem tờ khai điện tử", content: "Kiểm tra lại nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { imgIndex: 26, title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp PDF. Nhấn Chọn tệp đính kèm để tải lên giấy báo tử và giấy tờ liên quan." },
      { imgIndex: 3, title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ." },
      { imgIndex: 1, title: "Chọn cách tải lên", content: "Chọn Tải lên từ thiết bị với tệp có sẵn, hoặc Tạo tệp đính kèm từ nhiều hình ảnh." },
      { imgIndex: 4, title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví và Chọn." },
      { imgIndex: 23, title: "Hoàn tất đính kèm", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ. Kiểm tra lại rồi nhấn Bước tiếp theo." },
      { imgIndex: 9, title: "Bước 4 – Nhận kết quả & lệ phí", content: "Chọn nơi và hình thức nhận kết quả. Kiểm tra phí (ví dụ 40.000đ cho bản sao) rồi nhấn Thanh toán." },
      { imgIndex: 8, title: "Thanh toán trực tuyến", content: "Kiểm tra thông tin, tích đồng ý điều khoản và nhấn Thanh toán & Nộp hồ sơ." },
      { imgIndex: 10, title: "Chọn phương thức thanh toán", content: "Tại Cổng thanh toán tập trung, chọn hình thức Thanh toán bằng mã QR." },
      { imgIndex: 19, title: "Chọn đơn vị thanh toán", content: "Chọn ngân hàng hoặc ví điện tử bạn dùng (VNPAY, MoMo, BIDV…) rồi nhấn Tiếp tục thanh toán." },
      { imgIndex: 21, title: "Quét mã QR thanh toán", content: "Mở ứng dụng ngân hàng, quét mã QR trên màn hình và xác nhận thanh toán khi mã còn hiệu lực." },
      { imgIndex: 6, title: "Nộp hồ sơ thành công", content: "Màn hình báo Thanh toán và gửi hồ sơ thành công nghĩa là hồ sơ đã được nộp. Chờ cơ quan xử lý và nhận kết quả." },
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
    dir: "D:/NopHsOnline/xnTinhTrangHonNhan",
    video: "HuongDan_CapGiayXacNhanTinhTrangHonNhan.mp4",
    registrationUrl: dvc("1.004873"),
    order: 5,
    steps: [
      { imgIndex: 22, title: "Truy cập Cổng Dịch vụ công", content: "Vào dichvucong.gov.vn và nhấn nút Đăng nhập ở góc trên bên phải." },
      { imgIndex: 10, title: "Đăng nhập VNeID", content: "Nhập số định danh cá nhân và mật khẩu tài khoản VNeID, rồi nhấn Đăng nhập." },
      { imgIndex: 14, title: "Xác nhận chia sẻ thông tin", content: "Tích chọn đồng ý và nhấn Xác nhận chia sẻ để đăng nhập vào Cổng Dịch vụ công Quốc gia." },
      { imgIndex: 24, title: "Vào trang chủ", content: "Sau khi đăng nhập thành công, bạn quay lại trang chủ để tìm thủ tục cần làm." },
      { imgIndex: 20, title: "Tìm thủ tục", content: "Gõ 'xác nhận tình trạng hôn nhân' vào ô tìm kiếm và chọn Thủ tục cấp Giấy xác nhận tình trạng hôn nhân (mã 1.004873)." },
      { imgIndex: 19, title: "Chọn cơ quan thực hiện", content: "Ở trang chi tiết thủ tục, chọn Tỉnh/Thành phố và Phường/Xã nơi cư trú, rồi nhấn Nộp hồ sơ." },
      { imgIndex: 13, title: "Nộp trực tuyến", content: "Kiểm tra cơ quan thực hiện rồi nhấn Nộp trực tuyến, sau đó nhấn Đồng ý." },
      { imgIndex: 8, title: "Nhập mã xác nhận đăng nhập", content: "Khi chuyển sang hệ thống Tư pháp, nhập mã OTP gửi về điện thoại hoặc ứng dụng VNeID rồi nhấn Xác nhận." },
      { imgIndex: 12, title: "Chia sẻ với hệ thống Tư pháp", content: "Nhấn Xác nhận chia sẻ để đăng nhập Hệ thống giải quyết thủ tục hành chính Bộ Tư pháp." },
      { imgIndex: 7, title: "Xác nhận thông tin chung", content: "Chọn cấp thực hiện, tỉnh thành, thủ tục, cơ quan, đơn vị tiếp nhận và đối tượng thực hiện, rồi nhấn Xác nhận." },
      { imgIndex: 11, title: "Bước 1 – Thông tin chủ hồ sơ", content: "Kiểm tra thông tin định danh đã điền sẵn của người yêu cầu." },
      { imgIndex: 9, title: "Bổ sung thông tin & tiếp tục", content: "Nhập ngày cấp, nơi cấp giấy tờ, số điện thoại, email, địa chỉ; có thể tích lưu vào hồ sơ cá nhân rồi nhấn Bước tiếp theo." },
      { imgIndex: 3, title: "Xác nhận lưu thông tin", content: "Nhấn Đồng ý ở hộp thoại lưu dữ liệu vào hồ sơ cá nhân để tiếp tục." },
      { imgIndex: 15, title: "Bước 2 – Kê khai người yêu cầu", content: "Điền mẫu điện tử tương tác: thông tin người yêu cầu cấp giấy xác nhận tình trạng hôn nhân." },
      { imgIndex: 17, title: "Kê khai người được cấp", content: "Điền thông tin người được cấp giấy và tình trạng hôn nhân, rồi nhấn Xem trước." },
      { imgIndex: 16, title: "Xem tờ khai điện tử", content: "Kiểm tra lại nội dung tờ khai, có thể thực hiện Ký số, sau đó nhấn Xác nhận." },
      { imgIndex: 21, title: "Bước 3 – Thành phần hồ sơ", content: "Tờ khai được tạo tự động thành tệp PDF. Nhấn Chọn tệp đính kèm để tải lên giấy tờ liên quan (nếu có)." },
      { imgIndex: 1, title: "Mở ví tài liệu điện tử", content: "Trong Danh sách tài liệu điện tử, nhấn Tải lên từ thiết bị để thêm giấy tờ." },
      { imgIndex: 2, title: "Chọn cách tải lên", content: "Chọn Tải lên từ thiết bị với tệp có sẵn, hoặc Tạo tệp đính kèm từ nhiều hình ảnh." },
      { imgIndex: 4, title: "Đặt tên & ký số tài liệu", content: "Đặt tên cho tài liệu, thực hiện Ký số cá nhân nếu cần, rồi nhấn Thêm vào ví và Chọn." },
      { imgIndex: 18, title: "Hoàn tất đính kèm", content: "Giấy tờ đã được đính kèm vào đúng thành phần hồ sơ." },
      { imgIndex: 23, title: "Kiểm tra hồ sơ & tiếp tục", content: "Kiểm tra lại danh sách thành phần hồ sơ, ghi chú nếu cần rồi nhấn Bước tiếp theo." },
      { imgIndex: 5, title: "Bước 4 – Nhận kết quả (miễn phí)", content: "Chọn nơi và hình thức nhận kết quả. Thủ tục này miễn phí (0đ). Nhấn Gửi hồ sơ." },
      { imgIndex: 6, title: "Nộp hồ sơ thành công", content: "Màn hình báo Gửi hồ sơ thành công nghĩa là hồ sơ đã được nộp. Chờ cơ quan xử lý và nhận kết quả theo lịch hẹn." },
    ],
  },

  {
    key: "lienThong",
    slug: "lien-thong-khai-sinh-thuong-tru-bhyt-duoi-6-tuoi",
    title: "Liên thông: Khai sinh – Thường trú – Cấp thẻ BHYT cho trẻ dưới 6 tuổi",
    summary:
      "Hướng dẫn nộp hồ sơ dịch vụ công liên thông: đăng ký khai sinh, đăng ký thường trú và cấp thẻ bảo hiểm y tế cho trẻ em dưới 6 tuổi.",
    categorySlug: "bao-hiem-y-te",
    categoryName: "Bảo hiểm y tế",
    dir: "D:/NopHsOnline/lienThongKhaiSinh,CapLaiBHYTDuoi6Tuoi",
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
];
