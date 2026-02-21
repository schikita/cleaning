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
      <div className={s.stepTitle}>Контакты</div>
      <div className={s.stepSubtitle}>Чтобы мы могли подтвердить заказ</div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className={s.label}>
          Имя
          <input
            className={s.input}
            value={c.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Иван"
          />
        </label>
        <label className={s.label}>
          Телефон
          <input
            className={s.input}
            value={c.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+375..."
            inputMode="tel"
          />
        </label>
        <label className={`${s.label} sm:col-span-2`}>
          Email (необязательно)
          <input
            className={s.input}
            value={c.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="email@example.com"
            inputMode="email"
          />
        </label>
      </div>

      {!canNext() ? (
        <div className={s.error}>Заполните имя и телефон.</div>
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
