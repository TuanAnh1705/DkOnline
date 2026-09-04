"use client";

import dynamic from "next/dynamic";

// `ssr: false` chỉ được phép bên trong Client Component ở Next 16 App Router —
// wrapper này tồn tại chỉ để làm biên client cho việc code-split gsap/Lenis.
export const SmoothScrollLoader = dynamic(
  () => import("@/components/site/smooth-scroll").then((m) => m.SmoothScroll),
  { ssr: false },
);
