"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Link from "next/link";

interface CityMapModalProps {
  city: { name: string; count: string; region: string; cities: string };
  open: boolean;
  onClose: () => void;
}

export function CityMapModal({ city, open, onClose }: CityMapModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, handleEscape]);

  if (!open) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-labelledby="city-modal-title"
    >
      <div
        className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2
            id="city-modal-title"
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            {city.name} — {city.count}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Наши специалисты работают в{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {city.name}
            </span>{" "}
            в {city.region} и в таких городах, как {city.cities}.
          </p>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <Link
            href={`/city/${city.name.toLowerCase()}`}
            className="text-sm font-medium text-[#00d2ff] hover:underline"
          >
            Смотреть мастеров →
          </Link>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
