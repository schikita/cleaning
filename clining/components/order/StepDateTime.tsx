"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { DatePickerDropdown } from "@/components/ui/date-picker";

interface StepDateTimeProps {
  date: string;
  time: string;
  onChange: (field: string, value: string) => void;
}

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export function StepDateTime({ date, time, onChange }: StepDateTimeProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Дата и время
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Выберите удобное время для уборки
        </p>
      </div>

      {/* Дата */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Дата</h3>
        </div>
        <DatePickerDropdown
          value={date}
          onChange={(v) => onChange("date", v)}
          placeholder="Выберите дату"
          minDate={today}
        />
      </div>

      {/* Время */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Время
          </h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => onChange("time", slot)}
              className={cn(
                "py-2 px-3 rounded-lg font-medium text-sm transition-all",
                time === slot
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600",
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
