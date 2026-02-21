"use client";

import { motion } from "framer-motion";
import { Wallet, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepBudgetProps {
  budget: string;
  selectedServiceId: string;
  onChange: (val: string) => void;
}

const budgetSuggestions: Record<string, string[]> = {
  general: ["100", "150", "200"],
  maintenance: ["50", "75", "100"],
  furniture: ["75", "100", "150"],
  windows: ["75", "100", "125"],
  renovation: ["150", "200", "300"],
};

export function StepBudget({
  budget,
  selectedServiceId,
  onChange,
}: StepBudgetProps) {
  const suggestions =
    budgetSuggestions[selectedServiceId] || budgetSuggestions.general;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Бюджет
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Укажите желаемую стоимость услуги
        </p>
      </div>

      {/* Поле ввода */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Ваша цена
          </h3>
        </div>
        <div className="relative">
          <input
            type="number"
            value={budget}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Например: 150"
            className={cn(
              "w-full px-4 py-4 rounded-xl border-2 text-2xl font-bold transition-all",
              "bg-white dark:bg-slate-800",
              "border-slate-200 dark:border-slate-700",
              "text-slate-900 dark:text-white",
              "placeholder:text-slate-300 dark:placeholder:text-slate-600",
              "focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/10",
              "focus:outline-none",
            )}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium text-lg">
            Br
          </span>
        </div>
      </div>

      {/* Быстрый выбор */}
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          Рекомендуемые цены:
        </p>
        <div className="flex gap-3">
          {suggestions.map((amount) => (
            <motion.button
              key={amount}
              onClick={() => onChange(amount)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                budget === amount
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600",
              )}
            >
              {amount} Br
            </motion.button>
          ))}
        </div>
      </div>

      {/* Подсказка */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800">
        <Lightbulb className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-cyan-800 dark:text-cyan-200">
          Разумная цена привлечёт больше квалифицированных исполнителей. Слишком
          низкая цена может отпугнуть профессионалов.
        </p>
      </div>
    </div>
  );
}
