"use client";

import { MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepLocationProps {
  address: string;
  onChange: (val: string) => void;
}

export function StepLocation({ address, onChange }: StepLocationProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Адрес помещения
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Укажите адрес, где нужно провести уборку
        </p>
      </div>

      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          value={address}
          onChange={(e) => onChange(e.target.value)}
          placeholder="г. Минск, ул. Независимости, 10, кв. 15"
          className={cn(
            "w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg transition-all",
            "bg-white dark:bg-slate-800",
            "border-slate-200 dark:border-slate-700",
            "text-slate-900 dark:text-white",
            "placeholder:text-slate-400 dark:placeholder:text-slate-500",
            "focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/10",
            "focus:outline-none",
          )}
        />
      </div>

      <button
        type="button"
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all",
          "border-slate-200 dark:border-slate-700",
          "text-slate-600 dark:text-slate-400",
          "hover:border-cyan-300 dark:hover:border-cyan-700",
          "hover:bg-cyan-50 dark:hover:bg-cyan-950/20",
          "hover:text-cyan-600 dark:hover:text-cyan-400",
        )}
      >
        <Navigation className="h-4 w-4" />
        Определить моё местоположение
      </button>

      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong className="dark:text-amber-100">Важно:</strong> Точный адрес
          поможет клинерам рассчитать время на дорогу и прибыть вовремя.
        </p>
      </div>
    </div>
  );
}
