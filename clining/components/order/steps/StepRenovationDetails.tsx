"use client";

import React from "react";
import { DEFAULT_DRAFT } from "../flows";
import { orderStyles as s } from "../styles";

type Draft = typeof DEFAULT_DRAFT;

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
};

type DustLevel = "low" | "medium" | "high";

export default function StepRenovationDetails({ draft, updateDraft }: Props) {
  const r = draft.renovation;

  function set(key: "areaM2" | "dustLevel", value: string) {
    updateDraft({ renovation: { ...r, [key]: value } });
  }

  function toggle(
    key:
      | "needsWasteRemoval"
      | "needsStickerRemoval"
      | "needsPaintTracesRemoval",
  ) {
    updateDraft({ renovation: { ...r, [key]: !r[key] } });
  }

  return (
    <div>
      <div className={s.stepTitle}>Детали ремонта</div>
      <div className={s.stepSubtitle}>
        От этого зависит сложность и время уборки
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className={s.label}>
          Площадь (м²)
          <input
            className={s.input}
            value={r.areaM2}
            onChange={(e) => set("areaM2", e.target.value)}
            placeholder="Например: 54"
            inputMode="numeric"
          />
        </label>
        <label className={s.label}>
          Уровень пыли
          <select
            className={s.select}
            value={r.dustLevel}
            onChange={(e) => set("dustLevel", e.target.value as DustLevel)}
          >
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label className={s.toggleRow}>
          <input
            type="checkbox"
            checked={!!r.needsWasteRemoval}
            onChange={() => toggle("needsWasteRemoval")}
            className={s.checkbox}
          />
          <span className={s.label}>Нужен вынос строительного мусора</span>
        </label>
        <label className={s.toggleRow}>
          <input
            type="checkbox"
            checked={!!r.needsStickerRemoval}
            onChange={() => toggle("needsStickerRemoval")}
            className={s.checkbox}
          />
          <span className={s.label}>Снять скотч/плёнку</span>
        </label>
        <label className={`${s.toggleRow} sm:col-span-2`}>
          <input
            type="checkbox"
            checked={!!r.needsPaintTracesRemoval}
            onChange={() => toggle("needsPaintTracesRemoval")}
            className={s.checkbox}
          />
          <span className={s.label}>Удалить следы краски/шпаклёвки</span>
        </label>
      </div>
    </div>
  );
}
