"use client";

import React from "react";
import { Draft, WindowsType, WindowsSides } from "../flows";
import { orderStyles as s } from "../styles";

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
};

type WindowsKey = "windowType" | "count" | "sides" | "hasScreens";

export default function StepWindowsParams({ draft, updateDraft }: Props) {
  const w = draft.windows;

  function set(
    key: WindowsKey,
    value: WindowsType | WindowsSides | number | boolean,
  ) {
    updateDraft({ windows: { ...w, [key]: value } });
  }

  return (
    <div>
      <div className={s.stepTitle}>Параметры окон</div>
      <div className={s.stepSubtitle}>
        Тип, количество и с какой стороны мыть
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className={s.label}>
          Тип окон
          <select
            className={s.select}
            value={w.windowType}
            onChange={(e) => set("windowType", e.target.value as WindowsType)}
          >
            <option value="standard">Обычные</option>
            <option value="panoramic">Панорамные</option>
            <option value="balcony">Балкон</option>
            <option value="skylight">Мансардные</option>
          </select>
        </label>
        <label className={s.label}>
          Количество
          <input
            className={s.input}
            type="number"
            min={1}
            value={w.count}
            onChange={(e) =>
              set("count", Math.max(1, Number(e.target.value || 1)))
            }
          />
        </label>
        <label className={s.label}>
          Мыть с
          <select
            className={s.select}
            value={w.sides}
            onChange={(e) => set("sides", e.target.value as WindowsSides)}
          >
            <option value="both">Двух сторон</option>
            <option value="inside">Внутри</option>
            <option value="outside">Снаружи</option>
          </select>
        </label>
        <label className={`${s.toggleRow} mt-6 sm:mt-0`}>
          <input
            type="checkbox"
            checked={!!w.hasScreens}
            onChange={() => set("hasScreens", !w.hasScreens)}
            className={s.checkbox}
          />
          <span className={s.label}>Есть москитные сетки</span>
        </label>
      </div>
    </div>
  );
}
