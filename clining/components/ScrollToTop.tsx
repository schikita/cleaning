"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
  showAfter?: number;
  className?: string;
}

export function ScrollToTop({ showAfter = 300, className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number;
    const toggleVisibility = () => {
      rafId = requestAnimationFrame(() => {
        setIsVisible(window.scrollY > showAfter);
      });
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      cancelAnimationFrame(rafId);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "w-14 h-14 rounded-2xl",
            "bg-gradient-to-br from-cyan-500 to-blue-600",
            "text-white shadow-lg shadow-cyan-500/30",
            "flex items-center justify-center",
            "hover:shadow-xl hover:shadow-cyan-500/40",
            "transition-shadow duration-300",
            "border-2 border-white/20",
            className,
          )}
          aria-label="Наверх"
        >
          <ArrowUp className="h-6 w-6" />
          <span className="absolute inset-0 rounded-2xl bg-white/20 animate-ping" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
