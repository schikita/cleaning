"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cleaningServices } from "./constants";
import { cn } from "@/lib/utils";

interface OrderSummaryProps {
  form: {
    service: string;
    rooms: string;
    bathrooms: string;
    area: string;
    address: string;
    date: string;
    time: string;
    budget: string;
  };
}

export function OrderSummary({ form }: OrderSummaryProps) {
  const selectedService = cleaningServices.find((s) => s.id === form.service);

  if (!selectedService) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "mt-6 p-6 rounded-2xl border shadow-lg",
        "bg-white dark:bg-slate-800",
        "border-slate-200 dark:border-slate-700",
      )}
    >
      <h3
        className={cn(
          "font-semibold mb-4 flex items-center gap-2",
          "text-slate-900 dark:text-white",
        )}
      >
        <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
        Проверьте заказ
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-slate-500 dark:text-slate-400">Услуга:</span>
          <p className={cn("font-medium", "text-slate-900 dark:text-white")}>
            {selectedService.name}
          </p>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400">Бюджет:</span>
          <p className={cn("font-medium", "text-slate-900 dark:text-white")}>
            {Number(form.budget).toLocaleString("ru-RU")} Br
          </p>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400">Помещение:</span>
          <p className={cn("font-medium", "text-slate-900 dark:text-white")}>
            {form.rooms} комн., {form.bathrooms} сануз., {form.area} м²
          </p>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400">Когда:</span>
          <p className={cn("font-medium", "text-slate-900 dark:text-white")}>
            {form.date} в {form.time}
          </p>
        </div>

        <div className="col-span-2">
          <span className="text-slate-500 dark:text-slate-400">Адрес:</span>
          <p className={cn("font-medium", "text-slate-900 dark:text-white")}>
            {form.address}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
