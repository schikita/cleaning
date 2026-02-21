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
      <div className={s.stepTitle}>Адрес</div>
      <div className={s.stepSubtitle}>Укажите, где нужно выполнить уборку</div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className={s.label}>
          Город
          <input
            className={s.input}
            value={a.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Минск"
          />
        </label>
        <label className={s.label}>
          Улица
          <input
            className={s.input}
            value={a.street}
            onChange={(e) => set("street", e.target.value)}
            placeholder="пр-т Независимости"
          />
        </label>
        <label className={s.label}>
          Дом
          <input
            className={s.input}
            value={a.house}
            onChange={(e) => set("house", e.target.value)}
            placeholder="10"
          />
        </label>
        <label className={s.label}>
          Квартира (если есть)
          <input
            className={s.input}
            value={a.apartment}
            onChange={(e) => set("apartment", e.target.value)}
            placeholder="25"
          />
        </label>
        <label className={`${s.label} sm:col-span-2`}>
          Комментарий курьеру/клинеру
          <input
            className={s.input}
            value={a.comment}
            onChange={(e) => set("comment", e.target.value)}
            placeholder="Домофон, подъезд, этаж, ориентиры"
          />
        </label>
      </div>

      {!canNext() ? (
        <div className={s.error}>Заполните минимум: город, улица, дом.</div>
      ) : null}

      <div className={s.actions}>
        <button type="button" onClick={prev} className={s.btnOutline}>
          Назад
        </button>
        <button
          type="button"
          disabled={!canNext()}
          onClick={next}
          className={s.btnPrimary}
        >
          Далее
        </button>
      </div>
    </div>
  );
}
