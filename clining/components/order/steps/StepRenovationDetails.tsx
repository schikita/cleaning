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

type DustLevel = "low" | "medium" | "high";

export default function StepRenovationDetails({
  draft,
  updateDraft,
  next,
  prev,
}: Props) {
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
      <div className="text-white text-xl font-semibold mb-2">
        Детали ремонта
      </div>
      <div className="text-white/50 mb-6">
        От этого зависит сложность и время уборки
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-sm text-white/60">
          Площадь (м²)
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={r.areaM2}
            onChange={(e) => set("areaM2", e.target.value)}
            placeholder="Например: 54"
            inputMode="numeric"
          />
        </label>

        <label className="text-sm text-white/60">
          Уровень пыли
          <select
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={r.dustLevel}
            onChange={(e) => set("dustLevel", e.target.value as DustLevel)}
          >
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
          <input
            type="checkbox"
            checked={!!r.needsWasteRemoval}
            onChange={() => toggle("needsWasteRemoval")}
          />
          <span className="text-white/70 text-sm">
            Нужен вынос строительного мусора
          </span>
        </label>

        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
          <input
            type="checkbox"
            checked={!!r.needsStickerRemoval}
            onChange={() => toggle("needsStickerRemoval")}
          />
          <span className="text-white/70 text-sm">Снять скотч/плёнку</span>
        </label>

        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 sm:col-span-2">
          <input
            type="checkbox"
            checked={!!r.needsPaintTracesRemoval}
            onChange={() => toggle("needsPaintTracesRemoval")}
          />
          <span className="text-white/70 text-sm">
            Удалить следы краски/шпаклёвки
          </span>
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
