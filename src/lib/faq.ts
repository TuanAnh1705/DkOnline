import type { FaqItem } from "@/components/site/faq-accordion";

// Câu hỏi thường gặp — soạn sẵn song ngữ (không dùng dịch máy) để bản tiếng Anh
// vẫn chuẩn thuật ngữ hành chính.
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: {
      vi: "Tôi cần chuẩn bị gì trước khi nộp hồ sơ trực tuyến?",
      en: "What do I need before submitting an application online?",
    },
    a: {
      vi: "Bạn cần: một tài khoản định danh điện tử VNeID mức độ 2 đang hoạt động, điện thoại để nhận mã OTP, bản chụp/scan các giấy tờ cần thiết (giấy chứng sinh, giấy tờ tùy thân…) ở dạng ảnh hoặc PDF rõ nét, và tài khoản ngân hàng hoặc ví điện tử nếu thủ tục có thu phí.",
      en: "You need an active level-2 VNeID digital identity account, a phone to receive OTP codes, clear photos or PDF scans of the required documents (birth certificate, ID papers, etc.), and a bank account or e-wallet if the procedure charges a fee.",
    },
  },
  {
    q: {
      vi: "VNeID mức độ 2 là gì và đăng ký ở đâu?",
      en: "What is a level-2 VNeID account and where do I register?",
    },
    a: {
      vi: "VNeID mức độ 2 là tài khoản định danh điện tử đã được xác thực trực tiếp tại cơ quan Công an. Bạn tải ứng dụng VNeID, đăng ký tài khoản rồi đến Công an xã/phường để kích hoạt mức độ 2. Hầu hết dịch vụ công trực tuyến về hộ tịch đều yêu cầu tài khoản mức độ 2.",
      en: "A level-2 VNeID account is a digital identity verified in person at a police office. Download the VNeID app, register an account, then visit your ward or commune police station to activate level 2. Most online civil status services require level 2.",
    },
  },
  {
    q: {
      vi: "Nộp hồ sơ trực tuyến có mất phí không?",
      en: "Is there a fee for submitting online?",
    },
    a: {
      vi: "Tùy thủ tục. Nhiều thủ tục miễn phí (ví dụ cấp Giấy xác nhận tình trạng hôn nhân). Một số thủ tục có phí bản sao trích lục (thường 8.000đ/bản), thanh toán trực tuyến bằng mã QR qua ngân hàng hoặc ví điện tử ngay trên cổng.",
      en: "It depends on the procedure. Many are free (for example a marital status certificate). Some charge a fee for certified extracts (usually 8,000 VND per copy), payable online by QR code through a bank or e-wallet on the portal.",
    },
  },
  {
    q: {
      vi: "Sau khi nộp, tôi nhận kết quả bằng cách nào?",
      en: "How do I receive the result after submitting?",
    },
    a: {
      vi: "Khi kê khai, bạn được chọn hình thức nhận kết quả: nhận bản giấy có đóng dấu tại Trung tâm phục vụ hành chính công, nhận bản điện tử trực tuyến, hoặc nhận qua dịch vụ bưu chính công ích đến tận nhà.",
      en: "While filling in the form you choose how to receive it: a stamped paper copy at the public administration service centre, an electronic copy online, or delivery to your home by public postal service.",
    },
  },
  {
    q: {
      vi: "Tôi có thể làm thủ tục thay cho người khác không?",
      en: "Can I complete a procedure on someone else's behalf?",
    },
    a: {
      vi: "Có. Ở bước “Thông tin chung”, mục Đối tượng thực hiện, bạn chọn “Làm thủ tục cho người khác” và khai đầy đủ thông tin, quan hệ với người được đăng ký. Một số trường hợp cần văn bản ủy quyền theo quy định.",
      en: "Yes. In the “General information” step, under the applicant field, choose “On behalf of another person” and fill in their details and your relationship to them. Some cases require a formal letter of authorisation.",
    },
  },
  {
    q: {
      vi: "Làm sao để tra cứu tình trạng hồ sơ đã nộp?",
      en: "How do I check the status of a submitted application?",
    },
    a: {
      vi: "Sau khi nộp, hệ thống cấp một mã hồ sơ. Bạn dùng mã này để tra cứu tại mục “Tra cứu hồ sơ” trên Cổng Dịch vụ công, hoặc theo dõi thông báo gửi về tài khoản và điện thoại của bạn.",
      en: "After submitting, the system issues a reference code. Use it under “Application lookup” on the public service portal, or follow the notifications sent to your account and phone.",
    },
  },
  {
    q: {
      vi: "Hình ảnh giấy tờ tải lên cần đạt yêu cầu gì?",
      en: "What are the requirements for uploaded document images?",
    },
    a: {
      vi: "Ảnh/bản scan cần rõ nét, đủ sáng, thấy rõ toàn bộ nội dung và không bị che khuất. Định dạng phổ biến là JPG, PNG hoặc PDF. Bạn có thể ghép nhiều ảnh thành một tệp PDF ngay trên cổng bằng chức năng “Tạo tệp đính kèm từ nhiều hình ảnh”.",
      en: "Photos or scans must be sharp, well lit, fully visible and unobstructed. Common formats are JPG, PNG and PDF. You can merge several photos into one PDF on the portal itself with the “Create an attachment from multiple images” function.",
    },
  },
  {
    q: {
      vi: "Nếu thao tác bị lỗi hoặc không đăng nhập được thì làm sao?",
      en: "What if something fails or I cannot sign in?",
    },
    a: {
      vi: "Bạn kiểm tra lại kết nối mạng, thử đăng nhập lại bằng VNeID, hoặc gọi tổng đài hỗ trợ Cổng Dịch vụ công Quốc gia 18001096. Bạn cũng có thể xem lại video hướng dẫn từng bước trên trang chi tiết của mỗi thủ tục.",
      en: "Check your internet connection, try signing in with VNeID again, or call the National Public Service Portal hotline on 18001096. You can also rewatch the step-by-step video on each procedure's detail page.",
    },
  },
];
