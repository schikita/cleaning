"use client";

import { motion } from "framer-motion";
import { Home, Bath, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepDetailsProps {
  rooms: string;
  bathrooms: string;
  area: string;
  description: string;
  onChange: (field: string, value: string) => void;
}

const roomOptions = ["1", "2", "3", "4", "5+"];
const bathroomOptions = ["1", "2", "3+"];

export function StepDetails({
  rooms,
  bathrooms,
  area,
  description,
  onChange,
}: StepDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Детали помещения
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Расскажите о вашем помещении для точного расчёта стоимости
        </p>
      </div>

      {/* Количество комнат */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Home className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Количество комнат
          </h3>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {roomOptions.map((num) => (
            <motion.button
              key={num}
              onClick={() => onChange("rooms", num)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "py-3 rounded-xl font-medium transition-all",
                rooms === num
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600",
              )}
            >
              {num}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Санузлы */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Bath className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Санузлы
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {bathroomOptions.map((num) => (
            <motion.button
              key={num}
              onClick={() => onChange("bathrooms", num)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "py-3 rounded-xl font-medium transition-all",
                bathrooms === num
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600",
              )}
            >
              {num}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Площадь */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Maximize className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Площадь помещения
          </h3>
        </div>
        <div className="relative">
          <input
            type="number"
            value={area}
            onChange={(e) => onChange("area", e.target.value)}
            placeholder="Например: 45"
            className={cn(
              "w-full px-4 py-3 rounded-xl border-2 text-lg font-medium transition-all",
              "bg-white dark:bg-slate-800",
              "border-slate-200 dark:border-slate-700",
              "text-slate-900 dark:text-white",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/10",
              "focus:outline-none",
            )}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium">
            м²
          </span>
        </div>
      </div>

      {/* Описание */}
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
          Дополнительные пожелания
        </h3>
        <textarea
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Опишите особенности помещения, что требует особого внимания..."
          rows={4}
          className={cn(
            "w-full px-4 py-3 rounded-xl border-2 resize-none transition-all",
            "bg-white dark:bg-slate-800",
            "border-slate-200 dark:border-slate-700",
            "text-slate-900 dark:text-white",
            "placeholder:text-slate-400 dark:placeholder:text-slate-500",
            "focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/10",
            "focus:outline-none",
          )}
        />
      </div>
    </div>
  );
}
