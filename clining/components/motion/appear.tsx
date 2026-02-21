"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

export function Appear(props: ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...props}
    />
  );
}
