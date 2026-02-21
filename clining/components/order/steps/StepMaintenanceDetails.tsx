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

type Frequency = "once" | "weekly" | "biweekly" | "monthly";
type ExtraKey = "ironing" | "dishes";

export default function StepMaintenanceDetails({
  draft,
  updateDraft,
  next,
  prev,
}: Props) {
  const m = draft.maintenance;

  function set(
    key: "rooms" | "bathrooms" | "areaM2" | "frequency",
    value: number | string,
  ) {
    updateDraft({ maintenance: { ...m, [key]: value } });
  }

  function toggleExtra(key: ExtraKey) {
    updateDraft({
      maintenance: {
        ...m,
        extras: { ...m.extras, [key]: !m.extras[key] },
      },
    });
  }

  return (
    <div>
      <div className="text-white text-xl font-semibold mb-2">
        Параметры уборки
      </div>
      <div className="text-white/50 mb-6">
        Уточните параметры и периодичность
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-sm text-white/60">
          Комнаты
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            type="number"
            min={1}
            value={m.rooms}
            onChange={(e) =>
              set("rooms", Math.max(1, Number(e.target.value || 1)))
            }
          />
        </label>

        <label className="text-sm text-white/60">
          Санузлы
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            type="number"
            min={1}
            value={m.bathrooms}
            onChange={(e) =>
              set("bathrooms", Math.max(1, Number(e.target.value || 1)))
            }
          />
        </label>

        <label className="text-sm text-white/60">
          Площадь (м²)
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={m.areaM2}
            onChange={(e) => set("areaM2", e.target.value)}
            placeholder="Например: 54"
            inputMode="numeric"
          />
        </label>

        <label className="text-sm text-white/60">
          Периодичность
          <select
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={m.frequency}
            onChange={(e) => set("frequency", e.target.value as Frequency)}
          >
            <option value="once">Разово</option>
            <option value="weekly">Раз в неделю</option>
            <option value="biweekly">Раз в 2 недели</option>
            <option value="monthly">Раз в месяц</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
          <input
            type="checkbox"
            checked={!!m.extras.ironing}
            onChange={() => toggleExtra("ironing")}
          />
          <span className="text-white/70 text-sm">Глажка</span>
        </label>

        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
          <input
            type="checkbox"
            checked={!!m.extras.dishes}
            onChange={() => toggleExtra("dishes")}
          />
          <span className="text-white/70 text-sm">Мытьё посуды</span>
        </label>
      </div>

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
          onClick={next}
          className="rounded-lg bg-[#0b3a7a] px-4 py-2 text-white"
        >
          Далее
        </button>
      </div>
    </div>
  );
}
