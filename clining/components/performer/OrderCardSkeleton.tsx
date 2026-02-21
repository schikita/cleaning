"use client";

import { motion } from "framer-motion";

export function OrderCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3 animate-pulse" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 animate-pulse" />
        </div>
        <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse" />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          <div className="space-y-1">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20 animate-pulse" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-12 animate-pulse" />
          </div>
        </div>
        <div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
      </div>
    </motion.div>
  );
}
