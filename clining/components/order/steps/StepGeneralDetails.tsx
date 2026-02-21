"use client";

import React from "react";
import { DEFAULT_DRAFT } from "../flows";
import { orderStyles as s } from "../styles";

type Draft = typeof DEFAULT_DRAFT;

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
};

export default function StepGeneralDetails({ draft, updateDraft }: Props) {
  const g = draft.general;

  function set(
    key: "rooms" | "bathrooms" | "kitchen" | "areaM2",
    value: number | boolean | string,
  ) {
    updateDraft({ general: { ...g, [key]: value } });
  }

  return (
    <div>
      <div className={s.stepTitle}>Параметры уборки</div>
      <div className={s.stepSubtitle}>Уточните базовые параметры помещения</div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className={s.label}>
          Комнаты
          <input
            className={s.input}
            type="number"
            min={1}
            value={g.rooms}
            onChange={(e) =>
              set("rooms", Math.max(1, Number(e.target.value || 1)))
            }
          />
        </label>
        <label className={s.label}>
          Санузлы
          <input
            className={s.input}
            type="number"
            min={1}
            value={g.bathrooms}
            onChange={(e) =>
              set("bathrooms", Math.max(1, Number(e.target.value || 1)))
            }
          />
        </label>
        <label className={s.label}>
          Площадь (м²)
          <input
            className={s.input}
            value={g.areaM2}
            onChange={(e) => set("areaM2", e.target.value)}
            placeholder="Например: 54"
            inputMode="numeric"
          />
        </label>
        <label className={`${s.toggleRow} mt-6 sm:mt-0`}>
          <input
            type="checkbox"
            checked={!!g.kitchen}
            onChange={() => set("kitchen", !g.kitchen)}
            className={s.checkbox}
          />
          <span className={s.label}>Есть кухня</span>
        </label>
      </div>
    </div>
  );
}
