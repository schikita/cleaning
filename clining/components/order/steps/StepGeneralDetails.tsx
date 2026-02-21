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

export default function StepGeneralDetails({
  draft,
  updateDraft,
  next,
  prev,
}: Props) {
  const g = draft.general;

  function set(
    key: "rooms" | "bathrooms" | "kitchen" | "areaM2",
    value: number | boolean | string,
  ) {
    updateDraft({ general: { ...g, [key]: value } });
  }

  function canNext() {
    return true;
  }

  return (
    <div>
      <div className="text-white text-xl font-semibold mb-2">
        Параметры уборки
      </div>
      <div className="text-white/50 mb-6">
        Уточните базовые параметры помещения
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-sm text-white/60">
          Комнаты
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            type="number"
            min={1}
            value={g.rooms}
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
            value={g.bathrooms}
            onChange={(e) =>
              set("bathrooms", Math.max(1, Number(e.target.value || 1)))
            }
          />
        </label>

        <label className="text-sm text-white/60">
          Площадь (м²)
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={g.areaM2}
            onChange={(e) => set("areaM2", e.target.value)}
            placeholder="Например: 54"
            inputMode="numeric"
          />
        </label>

        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 mt-6 sm:mt-0">
          <input
            type="checkbox"
            checked={!!g.kitchen}
            onChange={() => set("kitchen", !g.kitchen)}
          />
          <span className="text-white/70 text-sm">Есть кухня</span>
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
