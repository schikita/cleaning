"use client";

import React from "react";
import { Draft, WindowsAccess } from "../flows";

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
};

type WindowsKey = "floor" | "access";

export default function StepWindowsAccess({ draft, updateDraft }: Props) {
  const w = draft.windows;

  function set(key: WindowsKey, value: string | WindowsAccess) {
    updateDraft({ windows: { ...w, [key]: value } });
  }

  return (
    <div>
      <div className="text-white text-xl font-semibold mb-2">
        Доступ и детали
      </div>
      <div className="text-white/50 mb-6">
        Этажность и сложность доступа влияют на работу
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-sm text-white/60">
          Этаж (если актуально)
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={w.floor}
            onChange={(e) => set("floor", e.target.value)}
            placeholder="Например: 9"
          />
        </label>

        <label className="text-sm text-white/60">
          Доступ
          <select
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={w.access}
            onChange={(e) => set("access", e.target.value as WindowsAccess)}
          >
            <option value="normal">Обычный</option>
            <option value="difficult">Сложный (ограничения/высота)</option>
            <option value="ladder_needed">Нужна лестница/стремянка</option>
          </select>
        </label>
      </div>
    </div>
  );
}
