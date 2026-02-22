"use client";

import React from "react";
import { DEFAULT_DRAFT } from "../flows";
import { orderStyles as s } from "../styles";

type Draft = typeof DEFAULT_DRAFT;

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
};

type ExtraKey = "fridgeInside" | "oven" | "hood" | "balcony";

const EXTRAS: Array<[ExtraKey, string]> = [
  ["fridgeInside", "Помыть холодильник внутри"],
  ["oven", "Помыть духовку"],
  ["hood", "Помыть вытяжку"],
  ["balcony", "Уборка балкона/лоджии"],
];

export default function StepGeneralExtras({ draft, updateDraft }: Props) {
  const extras = draft.general.extras;

  function toggle(key: ExtraKey) {
    updateDraft({
      general: { ...draft.general, extras: { ...extras, [key]: !extras[key] } },
    });
  }

  return (
    <div>
      <div className={s.stepTitle}>Дополнительно</div>
      <div className={s.stepSubtitle}>
        Отметьте, что нужно сделать дополнительно
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {EXTRAS.map(([key, label]) => (
          <label key={key} className={s.toggleRow}>
            <input
              type="checkbox"
              checked={!!extras[key]}
              onChange={() => toggle(key)}
              className={s.checkbox}
            />
            <span className={s.label}>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
