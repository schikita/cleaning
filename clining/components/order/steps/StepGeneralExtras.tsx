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

type ExtraKey = "fridgeInside" | "oven" | "hood" | "balcony";

const EXTRAS: Array<[ExtraKey, string]> = [
  ["fridgeInside", "Помыть холодильник внутри"],
  ["oven", "Помыть духовку"],
  ["hood", "Помыть вытяжку"],
  ["balcony", "Уборка балкона/лоджии"],
];

export default function StepGeneralExtras({
  draft,
  updateDraft,
  next,
  prev,
}: Props) {
  const extras = draft.general.extras;

  function toggle(key: ExtraKey) {
    updateDraft({
      general: {
        ...draft.general,
        extras: { ...extras, [key]: !extras[key] },
      },
    });
  }

  return (
    <div>
      <div className="text-white text-xl font-semibold mb-2">Дополнительно</div>
      <div className="text-white/50 mb-6">
        Отметьте, что нужно сделать дополнительно
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {EXTRAS.map(([key, label]) => (
          <label
            key={key}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2"
          >
            <input
              type="checkbox"
              checked={!!extras[key]}
              onChange={() => toggle(key)}
            />
            <span className="text-white/70 text-sm">{label}</span>
          </label>
        ))}
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
