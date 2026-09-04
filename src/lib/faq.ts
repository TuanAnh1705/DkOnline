import type { Bi } from "@/lib/i18n";
import type { FaqItem } from "@/components/site/faq-accordion";

export interface FaqCategory {
  slug: string;
  label: Bi;
  /** Tên icon lucide-react, ánh xạ trong faq-explorer.tsx */
  icon: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  { slug: "chuan-bi", label: { vi: "Chuẩn bị & VNeID", en: "Getting ready & VNeID" }, icon: "IdCard" },
  { slug: "phi", label: { vi: "Phí & thanh toán", en: "Fees & payment" }, icon: "Wallet" },
  { slug: "ho-so", label: { vi: "Hồ sơ & giấy tờ", en: "Documents & paperwork" }, icon: "FileText" },
  { slug: "nop-theo-doi", label: { vi: "Nộp & theo dõi hồ sơ", en: "Submitting & tracking" }, icon: "Send" },
  { slug: "ket-qua", label: { vi: "Nhận kết quả", en: "Receiving results" }, icon: "PackageCheck" },
  { slug: "bao-mat", label: { vi: "Bảo mật & hỗ trợ", en: "Security & support" }, icon: "ShieldCheck" },
];

// Câu hỏi thường gặp — soạn sẵn song ngữ (không dùng dịch máy) để bản tiếng Anh
// vẫn chuẩn thuật ngữ hành chính.
export const FAQ_ITEMS: FaqItem[] = [
  // ── Chuẩn bị & VNeID ─────────────────────────────────────────
  {
    category: "chuan-bi",
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
    category: "chuan-bi",
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
    category: "chuan-bi",
    q: {
      vi: "Tôi có bắt buộc phải có VNeID mới xem được hướng dẫn trên trang này không?",
      en: "Do I need VNeID just to read the guides on this site?",
    },
    a: {
      vi: "Không. Mọi hướng dẫn, hình ảnh và video trên trang này xem tự do, không cần đăng nhập gì cả. Bạn chỉ cần VNeID mức độ 2 ở bước cuối, khi thực sự bấm “Nộp hồ sơ” để sang Cổng Dịch vụ công.",
      en: "No. Every guide, screenshot and video on this site is free to browse without signing in to anything. You only need VNeID level 2 at the very last step, when you actually click “Submit” to go to the public service portal.",
    },
  },
  {
    category: "chuan-bi",
    q: {
      vi: "Trang này có phải là Cổng Dịch vụ công, có đăng nhập VNeID được ngay ở đây không?",
      en: "Is this site the official public service portal — can I log in with VNeID right here?",
    },
    a: {
      vi: "Không. Đây là trang cẩm nang hướng dẫn độc lập, không phải hệ thống nhà nước và không có chức năng đăng nhập VNeID. Trang cố tình không hỏi số định danh, mật khẩu hay mã OTP VNeID của bạn — mọi thao tác đăng nhập thật sự đều thực hiện trên chính dichvucong.gov.vn sau khi bạn được điều hướng sang.",
      en: "No. This is an independent guide, not a government system, and it has no VNeID login feature. It deliberately never asks for your ID number, VNeID password or OTP — all real sign-in happens on dichvucong.gov.vn itself after you are guided there.",
    },
  },

  // ── Phí & thanh toán ─────────────────────────────────────────
  {
    category: "phi",
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
    category: "phi",
    q: {
      vi: "Thanh toán trực tuyến trên Cổng Dịch vụ công có an toàn không?",
      en: "Is paying online on the public service portal safe?",
    },
    a: {
      vi: "Việc thanh toán diễn ra ngay trên cổng chính thức dichvucong.gov.vn, qua cổng thanh toán của ngân hàng/ví điện tử — trang cẩm nang này không xử lý, không lưu và không bao giờ hỏi số thẻ hay mật khẩu ngân hàng của bạn.",
      en: "Payment happens directly on the official dichvucong.gov.vn portal, through your bank's or e-wallet's own payment gateway — this guide site never processes, stores, or asks for your card number or banking password.",
    },
  },
  {
    category: "phi",
    q: {
      vi: "Đã thanh toán nhưng hồ sơ bị từ chối thì phí có được hoàn không?",
      en: "If my application is rejected after I paid, do I get a refund?",
    },
    a: {
      vi: "Chính sách hoàn phí do cơ quan tiếp nhận quy định theo từng trường hợp. Bạn nên giữ lại biên lai/mã giao dịch và liên hệ tổng đài 18001096 hoặc bộ phận tiếp nhận hồ sơ để được hướng dẫn hoàn phí nếu có.",
      en: "Refund policy is decided case by case by the receiving agency. Keep your receipt or transaction code and contact the 18001096 hotline or the receiving office to ask about a refund if one applies.",
    },
  },
  {
    category: "phi",
    q: {
      vi: "Nhận kết quả tại nhà qua bưu điện có phải trả thêm phí không?",
      en: "Does home delivery by post cost extra?",
    },
    a: {
      vi: "Có. Dịch vụ bưu chính công ích thu thêm phí vận chuyển, mức phí tùy khoảng cách và đơn vị bưu chính, hiển thị rõ trước khi bạn xác nhận hình thức nhận kết quả.",
      en: "Yes. Public postal delivery adds a shipping fee, priced by distance and carrier — the exact amount is shown before you confirm this delivery option.",
    },
  },

  // ── Hồ sơ & giấy tờ ──────────────────────────────────────────
  {
    category: "ho-so",
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
    category: "ho-so",
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
    category: "ho-so",
    q: {
      vi: "Không có máy scan, chỉ có điện thoại thì làm sao nộp giấy tờ?",
      en: "I don't have a scanner, only a phone — how do I submit documents?",
    },
    a: {
      vi: "Chụp ảnh giấy tờ bằng điện thoại ở nơi đủ sáng, đặt thẳng góc, chụp trọn khung. Nếu một giấy tờ có nhiều trang, dùng chức năng “Tạo tệp đính kèm từ nhiều hình ảnh” trên cổng để gộp thành một PDF trước khi tải lên.",
      en: "Take clear phone photos in good light, holding the camera straight-on and capturing the whole page. If a document has several pages, use the portal's “Create an attachment from multiple images” function to merge them into one PDF before uploading.",
    },
  },
  {
    category: "ho-so",
    q: {
      vi: "Giấy tờ bằng tiếng nước ngoài có cần dịch công chứng không?",
      en: "Do foreign-language documents need a certified translation?",
    },
    a: {
      vi: "Thông thường có. Giấy tờ hộ tịch do cơ quan nước ngoài cấp cần được hợp pháp hóa lãnh sự và dịch thuật công chứng sang tiếng Việt trước khi nộp, trừ khi thủ tục ghi rõ ngoại lệ. Nếu chưa chắc, gọi hotline 18001096 để được xác nhận cho đúng trường hợp của bạn.",
      en: "Usually yes. Civil-status documents issued abroad generally need consular legalisation and a certified Vietnamese translation before submission, unless the specific procedure states otherwise. If unsure, call the 18001096 hotline to confirm for your case.",
    },
  },

  // ── Nộp & theo dõi hồ sơ ─────────────────────────────────────
  {
    category: "nop-theo-doi",
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
    category: "nop-theo-doi",
    q: {
      vi: "Có thể nộp hồ sơ ngoài giờ hành chính, cuối tuần không?",
      en: "Can I submit outside office hours or on weekends?",
    },
    a: {
      vi: "Có, việc nộp trực tuyến hoạt động 24/7. Tuy nhiên hồ sơ chỉ được cán bộ tiếp nhận và xử lý trong giờ hành chính các ngày làm việc, nên hồ sơ nộp cuối tuần thường được xử lý vào ngày làm việc kế tiếp.",
      en: "Yes, online submission is available 24/7. Processing staff, however, only pick up and handle applications during office hours on working days, so a weekend submission is usually processed on the next working day.",
    },
  },
  {
    category: "nop-theo-doi",
    q: {
      vi: "Lỡ nộp sai thông tin sau khi đã gửi thì sửa thế nào?",
      en: "I submitted with a mistake — how do I correct it?",
    },
    a: {
      vi: "Liên hệ ngay bộ phận tiếp nhận qua thông tin ghi trong biên nhận hồ sơ, hoặc gọi tổng đài 18001096 để được hướng dẫn nộp bổ sung/đính chính theo đúng quy trình của thủ tục đó — không tự ý nộp lại một hồ sơ mới nếu chưa được hướng dẫn.",
      en: "Contact the receiving office right away using the details on your submission receipt, or call the 18001096 hotline for guidance on submitting a correction — don't just resubmit a brand-new application without guidance for that specific procedure.",
    },
  },
  {
    category: "nop-theo-doi",
    q: {
      vi: "Nếu thao tác bị lỗi hoặc không đăng nhập được thì làm sao?",
      en: "What if something fails or I cannot sign in?",
    },
    a: {
      vi: "Bạn kiểm tra lại kết nối mạng, thử đăng nhập lại bằng VNeID, hoặc gọi tổng đài hỗ trợ Cổng Dịch vụ công Quốc gia 18001096. Bạn cũng có thể xem lại video hướng dẫn từng bước trên trang chi tiết của mỗi thủ tục.",
      en: "Check your internet connection, try signing in with VNeID again, or call the National Public Service Portal hotline on 18001096. You can also rewatch the step-by-step video on each procedure's detail page.",
    },
  },

  // ── Nhận kết quả ─────────────────────────────────────────────
  {
    category: "ket-qua",
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
    category: "ket-qua",
    q: {
      vi: "Mất bao lâu để có kết quả?",
      en: "How long does it take to get the result?",
    },
    a: {
      vi: "Thời hạn xử lý khác nhau tùy thủ tục, thường từ trong ngày đến vài ngày làm việc. Thời hạn cụ thể được ghi rõ trong phần hướng dẫn của từng thủ tục trên trang này và trên chính Cổng Dịch vụ công.",
      en: "Processing time varies by procedure, typically from same-day to a few working days. The exact timeframe is stated in each procedure's guide on this site and on the portal itself.",
    },
  },
  {
    category: "ket-qua",
    q: {
      vi: "Nhận kết quả bản điện tử rồi có cần xin thêm bản giấy không?",
      en: "If I get an electronic result, do I still need a paper copy?",
    },
    a: {
      vi: "Bản điện tử có chữ ký số thường có giá trị pháp lý tương đương bản giấy. Tuy vậy một số nơi tiếp nhận (ngân hàng, trường học, cơ quan nước ngoài…) vẫn quen dùng bản giấy có dấu đỏ, nên bạn nên hỏi trước nơi sẽ sử dụng giấy tờ đó.",
      en: "A digitally signed electronic copy usually has the same legal value as a paper one. Some receiving parties (banks, schools, foreign agencies…) still expect a red-stamped paper copy, so it's worth checking with them first.",
    },
  },
  {
    category: "ket-qua",
    q: {
      vi: "Bưu điện giao kết quả tận nhà mất bao lâu?",
      en: "How long does postal home delivery take?",
    },
    a: {
      vi: "Thường từ 2–5 ngày làm việc tùy khoảng cách địa lý và đơn vị bưu chính phụ trách khu vực của bạn, có thể tra cứu tiến độ vận chuyển bằng mã vận đơn được cung cấp.",
      en: "Usually 2–5 working days depending on distance and the postal provider covering your area; you can track delivery progress with the tracking code provided.",
    },
  },

  // ── Bảo mật & hỗ trợ ─────────────────────────────────────────
  {
    category: "bao-mat",
    q: {
      vi: "Trang này có lưu mật khẩu hay mã OTP VNeID của tôi không?",
      en: "Does this site store my VNeID password or OTP?",
    },
    a: {
      vi: "Không, không bao giờ. Trang cẩm nang này không có bất kỳ ô nhập nào cho số định danh, mật khẩu hay mã OTP VNeID — việc đăng nhập thật diễn ra hoàn toàn trên dichvucong.gov.vn. Xem chi tiết tại trang Chính sách bảo mật.",
      en: "Never. This guide has no field for your ID number, VNeID password or OTP anywhere — real sign-in happens entirely on dichvucong.gov.vn. See the Privacy Policy page for details.",
    },
  },
  {
    category: "bao-mat",
    q: {
      vi: "Trang có theo dõi hay lưu lại thông tin cá nhân của tôi không?",
      en: "Does the site track or store my personal information?",
    },
    a: {
      vi: "Trang chỉ lưu tùy chọn hiển thị (ngôn ngữ, cỡ chữ) trong bộ nhớ trình duyệt của chính bạn (localStorage), không gửi lên máy chủ và không gắn với danh tính. Chi tiết ở trang Chính sách bảo mật.",
      en: "The site only saves your display preferences (language, text size) in your own browser's local storage — nothing is sent to a server or tied to your identity. See the Privacy Policy page for details.",
    },
  },
  {
    category: "bao-mat",
    q: {
      vi: "Làm sao phân biệt cổng dịch vụ công thật với trang giả mạo lừa đảo?",
      en: "How do I tell the real portal apart from a scam look-alike?",
    },
    a: {
      vi: "Chỉ tin tưởng thao tác trên tên miền chính thức dichvucong.gov.vn. Cổng thật không bao giờ gọi điện/nhắn tin yêu cầu bạn đọc mã OTP hay chuyển tiền trước để “giữ chỗ” hồ sơ. Nếu nghi ngờ, gọi thẳng tổng đài 18001096 để xác minh.",
      en: "Only trust the official dichvucong.gov.vn domain. The real portal never calls or texts asking you to read out an OTP or pay in advance to “reserve” a slot. If in doubt, call the 18001096 hotline directly to verify.",
    },
  },
  {
    category: "bao-mat",
    q: {
      vi: "Câu hỏi của tôi chưa có trong danh sách, liên hệ ai?",
      en: "My question isn't listed here — who do I contact?",
    },
    a: {
      vi: "Gọi tổng đài Cổng Dịch vụ công Quốc gia 18001096, hoặc gửi câu hỏi qua trang Liên hệ của cẩm nang này để được hỗ trợ thêm.",
      en: "Call the National Public Service Portal hotline on 18001096, or send a question through this guide's Contact page for further help.",
    },
  },
];
