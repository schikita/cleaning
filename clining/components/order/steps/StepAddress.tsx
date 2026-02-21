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

type AddressKey = "city" | "street" | "house" | "apartment" | "comment";

export default function StepAddress({ draft, updateDraft, next, prev }: Props) {
  const a = draft.address;

  function set(key: AddressKey, value: string) {
    updateDraft({ address: { ...a, [key]: value } });
  }

  function canNext() {
    return Boolean(a.city.trim() && a.street.trim() && a.house.trim());
  }

  return (
    <div>
      <div className="text-white text-xl font-semibold mb-2">Адрес</div>
      <div className="text-white/50 mb-6">
        Укажите, где нужно выполнить уборку
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-sm text-white/60">
          Город
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={a.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Минск"
          />
        </label>

        <label className="text-sm text-white/60">
          Улица
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={a.street}
            onChange={(e) => set("street", e.target.value)}
            placeholder="пр-т Независимости"
          />
        </label>

        <label className="text-sm text-white/60">
          Дом
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={a.house}
            onChange={(e) => set("house", e.target.value)}
            placeholder="10"
          />
        </label>

        <label className="text-sm text-white/60">
          Квартира (если есть)
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={a.apartment}
            onChange={(e) => set("apartment", e.target.value)}
            placeholder="25"
          />
        </label>

        <label className="text-sm text-white/60 sm:col-span-2">
          Комментарий курьеру/клинеру
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
            value={a.comment}
            onChange={(e) => set("comment", e.target.value)}
            placeholder="Домофон, подъезд, этаж, ориентиры"
          />
        </label>
      </div>

      {!canNext() ? (
        <div className="mt-4 text-sm text-red-400">
          Заполните минимум: город, улица, дом.
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
