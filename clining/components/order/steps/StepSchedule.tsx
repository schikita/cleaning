"use client";

import React from "react";
import { DEFAULT_DRAFT } from "../flows";
import { orderStyles as s } from "../styles";
import { DatePickerDropdown } from "@/components/ui/date-picker";

type Draft = typeof DEFAULT_DRAFT;

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
};

const TIME_SLOTS = [
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
] as const;

type TimeSlot = (typeof TIME_SLOTS)[number];

function nextSlots(from: string) {
  const idx = TIME_SLOTS.indexOf(from as TimeSlot);
  if (idx < 0) return TIME_SLOTS;
  return TIME_SLOTS.slice(idx + 1);
}

export default function StepSchedule({ draft, updateDraft }: Props) {
  const sc = draft.schedule;
  const today = new Date().toISOString().split("T")[0];

  function set(key: "date" | "timeFrom" | "timeTo", value: string) {
    updateDraft({ schedule: { ...sc, [key]: value } });
  }

  function canNext() {
    return Boolean(sc.date && sc.timeFrom && sc.timeTo);
  }

  const toOptions = sc.timeFrom ? nextSlots(sc.timeFrom) : TIME_SLOTS;

  return (
    <div>
      <div className={s.stepTitle}>Время</div>
      <div className={s.stepSubtitle}>Выберите дату и удобный интервал</div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <span className={s.label}>Дата</span>
          <div className="mt-1">
            <DatePickerDropdown
              value={sc.date}
              onChange={(v) => set("date", v)}
              placeholder="Выберите дату"
              minDate={today}
            />
          </div>
        </div>
        <label className={s.label}>
          С
          <select
            className={s.select}
            value={sc.timeFrom}
            onChange={(e) => {
              const v = e.target.value;
              set("timeFrom", v);
              if (sc.timeTo && nextSlots(v).indexOf(sc.timeTo as TimeSlot) < 0)
                set("timeTo", "");
            }}
          >
            <option value="">Выберите</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className={s.label}>
          До
          <select
            className={s.select}
            value={sc.timeTo}
            onChange={(e) => set("timeTo", e.target.value)}
            disabled={!sc.timeFrom}
          >
            <option value="">Выберите</option>
            {toOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!canNext() && (
        <div className={s.error}>Выберите дату и интервал времени.</div>
      )}
    </div>
  );
}
