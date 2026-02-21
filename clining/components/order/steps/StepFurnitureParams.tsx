"use client";

import React from "react";
import { Draft, FurnitureMaterial, StainKey } from "../flows";
import { orderStyles as s } from "../styles";

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
  next: () => void;
  prev: () => void;
};

const MATERIALS: Array<[FurnitureMaterial, string]> = [
  ["fabric", "Ткань"],
  ["leather", "Кожа"],
  ["ecoleather", "Эко-кожа"],
  ["velour", "Велюр"],
  ["suede", "Замша"],
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
      furniture: { ...f, stains: { ...f.stains, [key]: !f.stains[key] } },
    });
  }

  return (
    <div>
      <div className={s.stepTitle}>Материал и состояние</div>
      <div className={s.stepSubtitle}>
        Помогает оценить сложность и подобрать исполнителя
      </div>

      <div className="mt-6 mb-6">
        <div className={`${s.sectionTitle} mb-2`}>Материал</div>
        <div className="flex flex-wrap gap-2">
          {MATERIALS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMaterial(id)}
              className={`${s.chipBase} ${f.material === id ? s.chipSelected : s.chipDefault}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className={`${s.sectionTitle} mb-2`}>Проблемы</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STAINS.map(([k, label]) => (
            <label key={k} className={s.toggleRow}>
              <input
                type="checkbox"
                checked={!!f.stains[k]}
                onChange={() => toggleStain(k)}
                className={s.checkbox}
              />
              <span className={s.label}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={s.actions}>
        <button type="button" onClick={prev} className={s.btnOutline}>
          Назад
        </button>
        <button type="button" onClick={next} className={s.btnPrimary}>
          Далее
        </button>
      </div>
    </div>
  );
}
