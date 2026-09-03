import type Lenis from "lenis";

// Instance Lenis duy nhất của site, đăng ký bởi <SmoothScroll/>.
// Các nơi khác cần cuộn mượt (nhảy bước, mở modal) đọc qua getLenis()
// thay vì tự new Lenis — tránh 2 instance đánh nhau.
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
