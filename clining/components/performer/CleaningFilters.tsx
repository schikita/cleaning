"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Filters {
  city: string;
  serviceType: string;
  priceRange: [number, number];
  date: string;
  urgent: boolean;
}

interface CleaningFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const belarusCities = [
  "Все города",
  "Минск",
  "Гомель",
  "Могилев",
  "Витебск",
  "Гродно",
  "Брест",
  "Бобруйск",
];

const serviceTypes = [
  { id: "all", label: "Все услуги", icon: "🧹" },
  { id: "regular", label: "Поддерживающая", icon: "✨" },
  { id: "deep", label: "Генеральная", icon: "🫧" },
  { id: "repair", label: "После ремонта", icon: "🔨" },
  { id: "windows", label: "Мытье окон", icon: "🪟" },
  { id: "carpet", label: "Химчистка", icon: "🛋️" },
];

export function CleaningFilters({ filters, onChange }: CleaningFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const activeCount = [
    filters.city !== "Все города",
    filters.serviceType !== "all",
    filters.priceRange[1] < 2000,
    filters.date !== "",
    filters.urgent,
  ].filter(Boolean).length;

  const FiltersContent = () => (
    <div className="p-6 space-y-6">
      {/* Мобильный заголовок */}
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Фильтры
        </h2>
        <button
          onClick={() => setMobileOpen(false)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
        >
          <svg
            className="w-5 h-5 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Город */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Город
        </label>
        <select
          value={filters.city}
          onChange={(e) => update("city", e.target.value)}
          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500"
        >
          {belarusCities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Тип уборки */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Тип уборки
        </label>
        <div className="space-y-1">
          {serviceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => update("serviceType", type.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                filters.serviceType === type.id
                  ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 font-medium"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Бюджет */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Бюджет
          </span>
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">
            до {filters.priceRange[1]} BYN
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="2000"
          step="50"
          value={filters.priceRange[1]}
          onChange={(e) => update("priceRange", [50, parseInt(e.target.value)])}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>50 BYN</span>
          <span>2000 BYN</span>
        </div>
      </div>

      {/* Дата */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Когда нужно
        </label>
        <input
          type="date"
          value={filters.date}
          onChange={(e) => update("date", e.target.value)}
          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Срочно */}
      <button
        onClick={() => update("urgent", !filters.urgent)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border-2 text-sm transition-colors ${
          filters.urgent
            ? "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400"
            : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
        }`}
      >
        <span className="font-medium">Срочный заказ</span>
        <div
          className={`w-10 h-5 rounded-full relative transition-colors ${filters.urgent ? "bg-red-500" : "bg-slate-300 dark:bg-slate-600"}`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${filters.urgent ? "left-5" : "left-0.5"}`}
          />
        </div>
      </button>

      {/* Сброс */}
      {activeCount > 0 && (
        <button
          onClick={() =>
            onChange({
              city: "Все города",
              serviceType: "all",
              priceRange: [50, 2000],
              date: "",
              urgent: false,
            })
          }
          className="w-full py-2 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          Сбросить фильтры ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Мобильная кнопка */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-cyan-500 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {activeCount}
          </span>
        )}
      </button>

      {/* Мобильный оверлей */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Сайдбар - Десктоп: всегда виден, Мобильный: анимированный */}
      <aside className="hidden lg:block w-80 h-[calc(100vh-4rem)] sticky top-16 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto">
        <FiltersContent />
      </aside>

      {/* Мобильный сайдбар */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed lg:hidden top-0 left-0 z-50 w-80 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto"
          >
            <FiltersContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
