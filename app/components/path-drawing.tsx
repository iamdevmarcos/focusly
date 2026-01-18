"use client";

import { motion } from "framer-motion";

const characters = "フォーカスリー".split("");

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const child = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
    },
  },
};

export default function PathDrawing() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        width: "100%",
        height: "100%",
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: "clamp(1rem, 3vw, 1.5rem)",
        fontWeight: 700,
        letterSpacing: "0.02em",
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{
            display: "inline-block",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
