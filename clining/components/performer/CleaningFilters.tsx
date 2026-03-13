"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutGrid,
  Sparkles,
  Droplets,
  Hammer,
  PanelTop,
  Sofa,
  type LucideIcon,
} from "lucide-react";
import { DatePickerDropdown } from "@/components/ui/date-picker";

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

const PRICE_MIN = 50;
const PRICE_MAX = 2000;
const PRICE_STEP = 50;

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

const serviceTypes: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "Все услуги", icon: LayoutGrid },
  { id: "regular", label: "Поддерживающая", icon: Sparkles },
  { id: "deep", label: "Генеральная", icon: Droplets },
  { id: "repair", label: "После ремонта", icon: Hammer },
  { id: "windows", label: "Мытье окон", icon: PanelTop },
  { id: "carpet", label: "Химчистка", icon: Sofa },
];

export function CleaningFilters({ filters, onChange }: CleaningFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const activeCount = [
    filters.city !== "Все города",
    filters.serviceType !== "all",
    filters.priceRange[0] > PRICE_MIN || filters.priceRange[1] < PRICE_MAX,
    filters.date !== "",
    filters.urgent,
  ].filter(Boolean).length;

  const setPriceRange = (min: number, max: number) => {
    const clampedMin = Math.max(PRICE_MIN, Math.min(PRICE_MAX, min));
    const clampedMax = Math.max(PRICE_MIN, Math.min(PRICE_MAX, max));
    const finalMin = Math.min(clampedMin, clampedMax);
    const finalMax = Math.max(clampedMin, clampedMax);
    update("priceRange", [finalMin, finalMax]);
  };

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
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${filters.serviceType === type.id
                  ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 font-medium"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
            >
              <type.icon className="h-4 w-4 shrink-0" aria-hidden />
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Бюджет */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Бюджет, BYN
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">от</span>
            <input
              type="number"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={filters.priceRange[0]}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!Number.isNaN(val)) setPriceRange(val, filters.priceRange[1]);
              }}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <span className="text-slate-400 dark:text-slate-500 mt-5">—</span>
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">до</span>
            <input
              type="number"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={filters.priceRange[1]}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!Number.isNaN(val)) setPriceRange(filters.priceRange[0], val);
              }}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1.5">
          <span>{PRICE_MIN} — {PRICE_MAX}</span>
        </div>
      </div>

      {/* Дата */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Когда нужно
        </label>
        <DatePickerDropdown
          value={filters.date}
          onChange={(value) => update("date", value)}
          placeholder="Выберите дату"
        />
      </div>

      {/* Срочно */}
      <button
        onClick={() => update("urgent", !filters.urgent)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border-2 text-sm transition-colors ${filters.urgent
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
              priceRange: [PRICE_MIN, PRICE_MAX],
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
