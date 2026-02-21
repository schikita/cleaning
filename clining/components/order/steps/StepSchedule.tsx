"use client";

import React from "react";
import { DEFAULT_DRAFT } from "../flows";

type Draft = typeof DEFAULT_DRAFT;

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
  next: () => void;
  prev: () => void;
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

export default function StepSchedule({
  draft,
  updateDraft,
  next,
  prev,
}: Props) {
  const s = draft.schedule;

  function set(key: "date" | "timeFrom" | "timeTo", value: string) {
    updateDraft({ schedule: { ...s, [key]: value } });
  }

  function canNext() {
    return Boolean(s.date && s.timeFrom && s.timeTo);
  }

  const toOptions = s.timeFrom ? nextSlots(s.timeFrom) : TIME_SLOTS;

  return (
    <div>
      <div className="text-white text-xl font-semibold mb-2">Время</div>
      <div className="text-white/50 mb-6">Выберите дату и удобный интервал</div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label className="text-sm text-white/60 sm:col-span-1">
          Дата
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            type="date"
            value={s.date}
            onChange={(e) => set("date", e.target.value)}
          />
        </label>

        <label className="text-sm text-white/60">
          С
          <select
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={s.timeFrom}
            onChange={(e) => {
              const v = e.target.value;
              set("timeFrom", v);
              if (s.timeTo && nextSlots(v).indexOf(s.timeTo as TimeSlot) < 0) {
                set("timeTo", "");
              }
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

        <label className="text-sm text-white/60">
          До
          <select
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={s.timeTo}
            onChange={(e) => set("timeTo", e.target.value)}
            disabled={!s.timeFrom}
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

      {!canNext() ? (
        <div className="mt-4 text-sm text-red-400">
          Выберите дату и интервал времени.
        </div>
      ) : null}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          className="rounded-lg border border-white/10 px-4 py-2 text-white/70 hover:bg-white/[0.03]"
        >
          Назад
        </button>
        <button
          type="button"
          disabled={!canNext()}
          onClick={next}
          className="rounded-lg bg-[#0b3a7a] px-4 py-2 text-white disabled:opacity-50"
        >
          Далее
        </button>
      </div>
    </div>
  );
}
