"use client";

import React from "react";
import { Draft, type FurnitureItem as FlowFurnitureItem } from "../flows";

const FURNITURE_KINDS = [
  { id: "sofa", label: "Диван" },
  { id: "chair", label: "Кресло" },
  { id: "mattress", label: "Матрас" },
  { id: "carpet", label: "Ковер" },
] as const;

type FurnitureKind = (typeof FURNITURE_KINDS)[number]["id"];

// Локальный тип для элемента мебели в этом компоненте
type LocalFurnitureItem = {
  kind: FurnitureKind;
  qty: number;
  seats?: number;
};

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
  next: () => void;
  prev: () => void;
};

function createItem(kind: FurnitureKind): LocalFurnitureItem {
  return {
    kind,
    qty: 1,
    ...(kind === "sofa" ? { seats: 3 } : {}),
  };
}

export default function StepFurnitureItems({
  draft,
  updateDraft,
  next,
  prev,
}: Props) {
  // Приводим тип через unknown
  const items =
    (draft.furniture.items as unknown as LocalFurnitureItem[]) || [];

  function add(kind: FurnitureKind) {
    const currentItems = items;
    updateDraft({
      furniture: {
        ...draft.furniture,
        items: [
          ...currentItems,
          createItem(kind),
        ] as unknown as FlowFurnitureItem[],
      },
    });
  }

  function remove(index: number) {
    const nextItems = items.filter((_, i) => i !== index);
    updateDraft({
      furniture: {
        ...draft.furniture,
        items: nextItems as unknown as FlowFurnitureItem[],
      },
    });
  }

  function updateItem(index: number, patch: Partial<LocalFurnitureItem>) {
    const nextItems = items.map((it, i) =>
      i === index ? { ...it, ...patch } : it,
    );
    updateDraft({
      furniture: {
        ...draft.furniture,
        items: nextItems as unknown as FlowFurnitureItem[],
      },
    });
  }

  function canNext() {
    return items.length > 0;
  }

  return (
    <div>
      <div className="text-white text-xl font-semibold mb-2">
        Что нужно почистить?
      </div>
      <div className="text-white/50 mb-6">
        Добавьте мебель и укажите количество
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {FURNITURE_KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => add(k.id)}
            className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white/80 hover:bg-white/[0.04]"
          >
            + {k.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((it, idx) => (
          <div
            key={`${it.kind}-${idx}`}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="text-white/90 font-medium">
                {FURNITURE_KINDS.find((k) => k.id === it.kind)?.label ||
                  it.kind}
              </div>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-sm text-white/40 hover:text-white/70"
              >
                Удалить
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="text-sm text-white/50">
                Кол-во
                <input
                  className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
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
                <label className="text-sm text-white/50">
                  Мест
                  <input
                    className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
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

      {!canNext() ? (
        <div className="mt-4 text-sm text-red-400">
          Добавьте хотя бы один предмет мебели.
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
