"use client";

import { motion } from "framer-motion";
import { Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  icon: LucideIcon;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Линия фона */}
        <div className="absolute left-0 right-0 top-1/2 h-1 -z-10 rounded-full bg-slate-200 dark:bg-slate-700" />

        {/* Прогресс линия */}
        <div
          className="absolute left-0 top-1/2 h-1 -z-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
          style={{
            width: `${Math.max(0, (currentStep / (steps.length - 1)) * 100)}%`,
          }}
        />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <motion.div
              key={step.id}
              initial={false}
              animate={{ scale: isCurrent ? 1.1 : 1 }}
              className={cn(
                "flex flex-col items-center gap-2 p-2 rounded-full shadow-sm",
                "bg-white dark:bg-slate-800",
                isCurrent && "ring-4 ring-cyan-100 dark:ring-cyan-900/30",
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
