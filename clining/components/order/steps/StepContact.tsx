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

type ContactKey = "name" | "phone" | "email";

export default function StepContact({ draft, updateDraft, next, prev }: Props) {
  const c = draft.contact;

  function set(key: ContactKey, value: string) {
    updateDraft({ contact: { ...c, [key]: value } });
  }

  function canNext() {
    return Boolean(c.name.trim() && c.phone.trim());
  }

  return (
    <div>
      <div className="text-white text-xl font-semibold mb-2">Контакты</div>
      <div className="text-white/50 mb-6">Чтобы мы могли подтвердить заказ</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-sm text-white/60">
          Имя
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={c.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Иван"
          />
        </label>

        <label className="text-sm text-white/60">
          Телефон
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={c.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+375..."
            inputMode="tel"
          />
        </label>

        <label className="text-sm text-white/60 sm:col-span-2">
          Email (необязательно)
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={c.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="email@example.com"
            inputMode="email"
          />
        </label>
      </div>

      {!canNext() ? (
        <div className="mt-4 text-sm text-red-400">
          Заполните имя и телефон.
        </div>
      ) : null}

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
          disabled={!canNext()}
          onClick={next}
          className="rounded-lg bg-[#0b3a7a] px-4 py-2 text-white disabled:opacity-50"
        >
          Далее
        </button>
      </div>
    </div>
  );
}
