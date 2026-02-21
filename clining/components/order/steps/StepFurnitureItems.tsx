"use client";

import React from "react";
import { Draft, type FurnitureItem as FlowFurnitureItem } from "../flows";
import { orderStyles as s } from "../styles";

const FURNITURE_KINDS = [
  { id: "sofa", label: "Диван" },
  { id: "chair", label: "Кресло" },
  { id: "mattress", label: "Матрас" },
  { id: "carpet", label: "Ковер" },
] as const;

type FurnitureKind = (typeof FURNITURE_KINDS)[number]["id"];

type LocalFurnitureItem = {
  kind: FurnitureKind;
  qty: number;
  seats?: number;
};

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
};

function createItem(kind: FurnitureKind): LocalFurnitureItem {
  return { kind, qty: 1, ...(kind === "sofa" ? { seats: 3 } : {}) };
}

export default function StepFurnitureItems({ draft, updateDraft }: Props) {
  const items =
    (draft.furniture.items as unknown as LocalFurnitureItem[]) || [];

  function add(kind: FurnitureKind) {
    updateDraft({
      furniture: {
        ...draft.furniture,
        items: [...items, createItem(kind)] as unknown as FlowFurnitureItem[],
      },
    });
  }

  function remove(index: number) {
    updateDraft({
      furniture: {
        ...draft.furniture,
        items: items.filter(
          (_, i) => i !== index,
        ) as unknown as FlowFurnitureItem[],
      },
    });
  }

  function updateItem(index: number, patch: Partial<LocalFurnitureItem>) {
    updateDraft({
      furniture: {
        ...draft.furniture,
        items: items.map((it, i) =>
          i === index ? { ...it, ...patch } : it,
        ) as unknown as FlowFurnitureItem[],
      },
    });
  }

  function canNext() {
    return items.length > 0;
  }

  return (
    <div>
      <div className={s.stepTitle}>Что нужно почистить?</div>
      <div className={s.stepSubtitle}>Добавьте мебель и укажите количество</div>

      <div className="mt-6 flex flex-wrap gap-2 mb-6">
        {FURNITURE_KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => add(k.id)}
            className={`${s.chipBase} ${s.chipDefault}`}
          >
            + {k.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((it, idx) => (
          <div key={`${it.kind}-${idx}`} className={s.card}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-foreground font-medium">
                {FURNITURE_KINDS.find((k) => k.id === it.kind)?.label ||
                  it.kind}
              </div>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Удалить
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className={s.label}>
                Кол-во
                <input
                  className={s.input}
                  type="number"
                  min={1}
                  value={it.qty || 1}
                  onChange={(e) =>
                    updateItem(idx, {
                      qty: Math.max(1, Number(e.target.value || 1)),
                    })
                  }
                />
              </label>
              {it.kind === "sofa" ? (
                <label className={s.label}>
                  Мест
                  <input
                    className={s.input}
                    type="number"
                    min={1}
                    value={it.seats || 3}
                    onChange={(e) =>
                      updateItem(idx, {
                        seats: Math.max(1, Number(e.target.value || 1)),
                      })
                    }
                  />
                </label>
              ) : (
                <div />
              )}
            </div>
          </div>
        ))}
      </div>

      {!canNext() && (
        <div className={s.error}>Добавьте хотя бы один предмет мебели.</div>
      )}
    </div>
  );
}
