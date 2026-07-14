"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thanh tiến trình cuộn mảnh ở đỉnh trang */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500"
    />
  );
}
