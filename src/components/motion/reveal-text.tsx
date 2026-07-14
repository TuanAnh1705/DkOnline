"use client";

import { motion, type Variants } from "framer-motion";
import * as React from "react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};
const word: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/** Tiêu đề hiện ra bằng cách từng từ trượt lên từ dưới (mask reveal) */
export function RevealText({
  text,
  as = "h2",
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Tag = as;
  const words = text.split(" ");
  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="block"
    >
      <Tag className={className}>
        {words.map((w, i) => (
          <span
            key={i}
            className="mr-[0.26em] inline-block overflow-hidden pb-[0.12em] align-bottom [clip-path:inset(0_0_-0.15em_0)]"
          >
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.span>
  );
}
