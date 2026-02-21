"use client";

import React from "react";
import { DEFAULT_DRAFT } from "../flows";
import { orderStyles as s } from "../styles";

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
      maintenance: { ...m, extras: { ...m.extras, [key]: !m.extras[key] } },
    });
  }

  return (
    <div>
      <div className={s.stepTitle}>Параметры уборки</div>
      <div className={s.stepSubtitle}>Уточните параметры и периодичность</div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className={s.label}>
          Комнаты
          <input
            className={s.input}
            type="number"
            min={1}
            value={m.rooms}
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
            value={m.bathrooms}
            onChange={(e) =>
              set("bathrooms", Math.max(1, Number(e.target.value || 1)))
            }
          />
        </label>
        <label className={s.label}>
          Площадь (м²)
          <input
            className={s.input}
            value={m.areaM2}
            onChange={(e) => set("areaM2", e.target.value)}
            placeholder="Например: 54"
            inputMode="numeric"
          />
        </label>
        <label className={s.label}>
          Периодичность
          <select
            className={s.select}
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

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label className={s.toggleRow}>
          <input
            type="checkbox"
            checked={!!m.extras.ironing}
            onChange={() => toggleExtra("ironing")}
            className={s.checkbox}
          />
          <span className={s.label}>Глажка</span>
        </label>
        <label className={s.toggleRow}>
          <input
            type="checkbox"
            checked={!!m.extras.dishes}
            onChange={() => toggleExtra("dishes")}
            className={s.checkbox}
          />
          <span className={s.label}>Мытьё посуды</span>
        </label>
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
