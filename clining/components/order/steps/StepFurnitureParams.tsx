"use client";

import React from "react";
import { Draft, FurnitureMaterial, StainKey } from "../flows";

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
  next: () => void;
  prev: () => void;
};

const MATERIALS: Array<[FurnitureMaterial, string]> = [
  ["fabric", "Ткань"],
  ["leather", "Кожа"],
  ["ecoleather", "Эко-кожа"], // исправлено: eco_leather -> ecoleather
  ["velour", "Велюр"],
  ["suede", "Замша"], // добавлен недостающий тип
];

const STAINS: Array<[StainKey, string]> = [
  ["food", "Пятна от еды"],
  ["drinks", "Пятна от напитков"],
  ["pets", "Следы животных"],
  ["odor", "Неприятный запах"],
];

export default function StepFurnitureParams({
  draft,
  updateDraft,
  next,
  prev,
}: Props) {
  const f = draft.furniture;

  function setMaterial(material: FurnitureMaterial) {
    updateDraft({ furniture: { ...f, material } });
  }

  function toggleStain(key: StainKey) {
    updateDraft({
      furniture: {
        ...f,
        stains: { ...f.stains, [key]: !f.stains[key] },
      },
    });
  }

  return (
    <div>
      <div className="text-white text-xl font-semibold mb-2">
        Материал и состояние
      </div>
      <div className="text-white/50 mb-6">
        Помогает оценить сложность и подобрать исполнителя
      </div>

      <div className="mb-6">
        <div className="text-sm text-white/70 mb-2">Материал</div>
        <div className="flex flex-wrap gap-2">
          {MATERIALS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMaterial(id)}
              className={[
                "rounded-lg border px-3 py-2 text-sm",
                f.material === id
                  ? "border-[#00d2ff]/40 bg-[#00d2ff]/[0.06] text-white"
                  : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.04]",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-white/70 mb-2">Проблемы</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STAINS.map(([k, label]) => (
            <label
              key={k}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2"
            >
              <input
                type="checkbox"
                checked={!!f.stains[k]}
                onChange={() => toggleStain(k)}
                className="rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="text-white/70 text-sm">{label}</span>
            </label>
          ))}
        </div>
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
