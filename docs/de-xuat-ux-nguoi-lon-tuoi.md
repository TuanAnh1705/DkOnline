# Đề xuất UX cho người lớn tuổi / không rành công nghệ

> Ghi ngày 06/08/2026. Đối tượng chính của web là người dân tự nộp hồ sơ tại nhà,
> trong đó nhóm khó nhất là người lớn tuổi, mắt kém, không quen thao tác máy tính.

---

## Bối cảnh: vì sao không có "đăng nhập VNeID ngay trên web này"

Đã cân nhắc và **loại bỏ**. Lý do:

1. **VNeID không cấp quyền cho web tư nhân.** VNeID là hệ thống định danh của C06 –
   Bộ Công an; `dichvucong.gov.vn` chỉ là một bên *sử dụng* nó. Muốn có nút "Đăng nhập
   VNeID" thật thì phải được cấp client_id/secret qua thủ tục kết nối chính thức, chỉ
   dành cho hệ thống thông tin của cơ quan nhà nước hoặc đơn vị đã ký kết nối.
2. **Phiên đăng nhập không chảy sang tên miền khác.** Cookie gắn theo tên miền. Đăng
   nhập trên web này không tạo phiên trên `dichvucong.gov.vn`, và không có API nào để
   bơm phiên sang. Đây là thiết kế bảo mật cố ý.
3. **Ngay cả hệ thống nhà nước cũng không bỏ bước này.** Trong chính ảnh hướng dẫn của
   dự án: đi từ Cổng DVCQG sang Hệ thống giải quyết TTHC Bộ Tư pháp vẫn phải "Xác nhận
   chia sẻ thông tin" + nhập passcode. Đó là yêu cầu về đồng ý chia sẻ dữ liệu cá nhân.

> ⛔ **Tuyệt đối không làm:** form cho người dân nhập số định danh + mật khẩu + OTP
> VNeID trên web này rồi đăng nhập hộ. Đó là thu thập thông tin xác thực của công dân —
> vi phạm pháp luật và cực kỳ rủi ro.

**Cũng đã loại: tài khoản riêng của web** (email/OTP để lưu tiến độ). Lý do: người lớn
tuổi phải tạo thêm một tài khoản nữa là mất luôn tác dụng — rào cản mới còn lớn hơn vấn
đề cần giải quyết.

---

## Đã làm — tối ưu bàn giao sang Cổng DVC

- Nút **"Nộp hồ sơ"** mở tab mới (`target="_blank"`), giữ nguyên trang hướng dẫn để
  người dân vừa đọc vừa thao tác.
- Thêm khối **"bước 0"** trên đầu mọi trang thủ tục:
  `src/components/site/portal-login-notice.tsx`
  - Nút lớn "Mở Cổng Dịch vụ công để đăng nhập" → `https://dichvucong.gov.vn`
    (chỉ trỏ trang chủ, **không** đoán đường dẫn `/dang-nhap` — xem mục Bài học bên dưới)
  - Giải thích: đăng nhập trước rồi quay lại, lúc bấm Nộp hồ sơ đỡ phải đăng nhập lại
  - Nói trước cho người dân biết bước sang hệ thống Tư pháp **vẫn** phải nhập passcode,
    để họ không tưởng mình làm sai

---

## Đã triển khai (29/08/2026)

Cả 6 đề xuất bên dưới đã được làm, theo đúng thứ tự khuyến nghị 3→1→4→2→6→5.
Ghi chú các quyết định đã chốt lúc làm:

- **TTS không có giọng Việt:** nút loa vẫn hiện, làm mờ (`disabled`) + tooltip
  "Máy này chưa có giọng đọc tiếng Việt" thay vì ẩn hẳn — đã xác nhận đúng hành vi
  này bằng test tự động (Chrome headless không có giọng vi-VN nên nút tự mờ).
- **Bản in:** không in khối "bước 0" (nút đăng nhập Cổng DVC), header, footer, thanh
  điều hướng bước, nút loa — chỉ giữ ảnh + mô tả từng bước (`@media print` +
  `[data-no-print]` trong `globals.css`).
- File chính: `src/components/site/procedure-steps.tsx` (gộp tính năng 1+2, 1
  IntersectionObserver duy nhất), `step-nav-bar.tsx`, `image-lightbox.tsx`,
  `font-size-control.tsx`, `step-tts-button.tsx` + `src/lib/tts.ts`,
  `src/lib/lenis-singleton.ts` (để nhảy bước/mở lightbox không đánh nhau với cuộn
  mượt Lenis).

## 6 đề xuất tiếp theo

### 1. Thanh điều hướng bước cố định ở đáy màn hình
Thanh nhỏ luôn hiện khi đang xem hướng dẫn: `‹ Bước trước · Bước 7/18 · Bước tiếp ›`,
bấm là nhảy đúng bước.

- **Vì sao:** thủ tục có 17–23 bước, mỗi bước một ảnh lớn. Người lớn tuổi cuộn tay rất
  dễ lạc, không biết đang ở bước mấy, hay cuộn quá rồi phải mò ngược.
- **Công sức:** trung bình. Cần theo dõi bước nào đang trong khung nhìn (IntersectionObserver).
- **Rủi ro:** thấp. Cần chú ý không che mất nút trên điện thoại màn hình nhỏ.

### 2. Ghi nhớ bước đang xem dở
Quay lại tab hướng dẫn thì trang tự cuộn về đúng bước đang xem. Lưu trong trình duyệt
(`localStorage`), **không cần tài khoản**.

- **Vì sao:** luồng thực tế là nhảy qua nhảy lại giữa 2 tab (hướng dẫn ↔ cổng DVC). Mỗi
  lần quay về mà phải cuộn tìm lại từ đầu là rất mệt.
- **Công sức:** thấp, nếu làm sau mục 1 thì gần như dùng chung logic.
- **Rủi ro:** thấp. Nên có nút "Xem lại từ đầu" để thoát trạng thái đã lưu.

### 3. Phóng to ảnh khi bấm vào
Bấm ảnh chụp màn hình → mở toàn màn hình, zoom/kéo được.

- **Vì sao:** ảnh gốc 1920px bị thu nhỏ trong khung trang; chữ trên form của cổng vốn đã
  nhỏ. Mắt kém gần như không đọc nổi vùng khoanh đỏ.
- **Công sức:** thấp.
- **Rủi ro:** rất thấp. **Đây là món rẻ nhất mà tác động lớn nhất.**

### 4. Nút chỉnh cỡ chữ (A / A+ / A++)
Hàng nút nhỏ ở đầu trang, phóng to chữ toàn site, nhớ lựa chọn cho lần sau.

- **Vì sao:** người lớn tuổi rất hay dùng nếu thấy có. Nhiều người không biết dùng
  Ctrl + "+" của trình duyệt.
- **Công sức:** thấp (đổi biến cỡ chữ gốc, không phải sửa từng chỗ).
- **Rủi ro:** thấp, nhưng phải kiểm tra bố cục không vỡ ở mức A++.

### 5. Đọc to nội dung bước (text-to-speech)
Nút hình loa ở mỗi bước, dùng giọng đọc sẵn có của trình duyệt
(`SpeechSynthesis`) — không tốn phí dịch vụ.

- **Vì sao:** hữu ích cho người mắt kém hoặc ngại đọc chữ.
- **Công sức:** thấp–trung bình.
- **Rủi ro:** **chất lượng giọng tiếng Việt phụ thuộc máy người dùng** — máy cũ có thể
  không có giọng Việt, đọc ra rất khó nghe hoặc không đọc được. Nên thử trên máy thật
  trước khi quyết định giữ.
- **Bug đã gặp + sửa (29/08/2026):** trên Windows/Chrome, `getVoices()` trả về danh
  sách giọng mạng ("Google ...") gần như ngay lập tức, còn giọng cục bộ của hệ điều
  hành (vd "Microsoft An - Vietnamese") nạp **muộn hơn** qua một sự kiện
  `voiceschanged` riêng. Code cũ chốt kết quả ngay khi thấy danh sách không rỗng nên
  bỏ lỡ giọng Việt cục bộ → nút bị tắt oan dù máy có sẵn giọng, im lặng khi bấm. Đã
  sửa trong `src/lib/tts.ts`: chờ tới khi thấy giọng "vi" hoặc poll tối đa ~2.5s.

### 5b. Dịch nội dung hướng dẫn Việt ↔ Anh (bổ sung 29/08/2026)
1 nút "View in English" / "Xem bằng tiếng Việt" ở đầu trang thủ tục, dịch tiêu đề +
mô tả + toàn bộ nội dung từng bước bằng API miễn phí MyMemory (không cần API key).

- **Vì sao:** người nước ngoài/Việt kiều không rành tiếng Việt cần đọc hiểu hướng dẫn.
- **Giới hạn đã biết:** MyMemory miễn phí nên chất lượng dịch máy chỉ ở mức chấp
  nhận được (không tinh chỉnh thuật ngữ hành chính), giới hạn ~500 ký tự/lần gọi
  (đã tự cắt câu dài), và ~5000 từ/ngày cho khách ẩn danh. Kết quả dịch được cache
  trong bộ nhớ phiên nên bấm qua lại VI↔EN không gọi mạng lại, nhưng dịch xong không
  lưu vào DB — tải lại trang phải dịch lại từ đầu.
- File: `src/lib/translate.ts`, `src/components/site/procedure-content.tsx` (gộp
  toàn bộ nội dung trang thủ tục vào 1 client component để chia sẻ state ngôn ngữ).

### 6. In hướng dẫn ra giấy
Nút "In hướng dẫn" xuất bản rút gọn: ảnh + mô tả từng bước, bỏ menu/nút/hiệu ứng.

- **Vì sao:** nhiều người lớn tuổi thích cầm tờ giấy đối chiếu hơn là nhìn màn hình, hoặc
  con cháu in hộ để ông bà tự làm.
- **Công sức:** thấp (CSS `@media print`).
- **Rủi ro:** thấp. Cần canh cho ảnh không bị cắt ngang trang.

---

## Thứ tự khuyến nghị

**3 → 1 → 4** trước: rẻ, không rủi ro, hiệu quả thấy ngay.
Sau đó **2** (đi kèm tự nhiên với 1), rồi **6**.
**5** để cuối vì phụ thuộc chất lượng giọng đọc của máy người dùng.

---

## Bài học phải nhớ khi làm link ra cổng DVC

- **Chỉ dùng đường dẫn đã kiểm chứng.** Route
  `/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=...` đã chết (06/08/2026 thử
  ra "trang không tồn tại") dù công cụ tìm kiếm còn index.
- **Không thể verify bằng curl/WebFetch.** `dichvucong.gov.vn` chặn bot bằng F5 TSPD:
  *mọi* URL — kể cả URL sai — đều trả HTTP 200 kèm cùng một trang JS challenge. Muốn
  chắc chắn thì phải nhờ người thật bấm thử.
- Các route đang dùng và đã xác nhận:
  - `https://dichvucong.gov.vn` (trang chủ)
  - `https://dichvucong.gov.vn/tim-kiem-thu-tuc-hanh-chinh?keyword=<tên thủ tục>`
  - `https://lienthong.dichvucong.gov.vn/#/ke-khai/2.000986` (riêng thủ tục liên thông)
