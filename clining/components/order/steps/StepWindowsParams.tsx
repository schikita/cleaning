"use client";

import React from "react";
import { Draft, WindowsType, WindowsSides } from "../flows";

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
  next: () => void;
  prev: () => void;
};

type WindowsKey = "windowType" | "count" | "sides" | "hasScreens";

export default function StepWindowsParams({
  draft,
  updateDraft,
  next,
  prev,
}: Props) {
  const w = draft.windows;

  function set(
    key: WindowsKey,
    value: WindowsType | WindowsSides | number | boolean,
  ) {
    updateDraft({ windows: { ...w, [key]: value } });
  }

  return (
    <div>
      <div className="text-white text-xl font-semibold mb-2">
        Параметры окон
      </div>
      <div className="text-white/50 mb-6">
        Тип, количество и с какой стороны мыть
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-sm text-white/60">
          Тип окон
          <select
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={w.windowType}
            onChange={(e) => set("windowType", e.target.value as WindowsType)}
          >
            <option value="standard">Обычные</option>
            <option value="panoramic">Панорамные</option>
            <option value="balcony">Балкон</option>
            <option value="skylight">Мансардные</option>
          </select>
        </label>

        <label className="text-sm text-white/60">
          Количество
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            type="number"
            min={1}
            value={w.count}
            onChange={(e) =>
              set("count", Math.max(1, Number(e.target.value || 1)))
            }
          />
        </label>

        <label className="text-sm text-white/60">
          Мыть с
          <select
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={w.sides}
            onChange={(e) => set("sides", e.target.value as WindowsSides)}
          >
            <option value="both">Двух сторон</option>
            <option value="inside">Внутри</option>
            <option value="outside">Снаружи</option>
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 mt-6 sm:mt-0">
          <input
            type="checkbox"
            checked={!!w.hasScreens}
            onChange={() => set("hasScreens", !w.hasScreens)}
            className="rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500"
          />
          <span className="text-white/70 text-sm">Есть москитные сетки</span>
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
