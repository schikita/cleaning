"use client";

import React from "react";
import { SERVICE_META, type Draft } from "../flows";

type Props = {
  draft: Draft;
  prev: () => void;
  onSubmit?: () => void;
  submitting?: boolean;
};

function line(label: string, value: string) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-white/50 text-sm">{label}</div>
      <div className="text-white/80 text-sm text-right">{value || "—"}</div>
    </div>
  );
}

export default function StepReview({
  draft,
  prev,
  onSubmit,
  submitting,
}: Props) {
  const serviceTitle = draft.service ? SERVICE_META[draft.service].title : "—";

  function handleSubmit() {
    if (submitting) return;

    if (onSubmit) {
      onSubmit();
      return;
    }

    // Фоллбек, если onSubmit не передали
    alert("Заказ сформирован (заглушка).");
  }

  return (
    <div>
      <div className="text-white text-xl font-semibold mb-2">Проверка</div>
      <div className="text-white/50 mb-6">
        Проверьте данные перед созданием заказа
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
        {line("Услуга", serviceTitle)}

        {draft.service === "general" ? (
          <>
            {line("Комнаты", String(draft.general.rooms))}
            {line("Санузлы", String(draft.general.bathrooms))}
            {line(
              "Площадь",
              draft.general.areaM2 ? `${draft.general.areaM2} м²` : "",
            )}
          </>
        ) : null}

        {draft.service === "maintenance" ? (
          <>
            {line("Комнаты", String(draft.maintenance.rooms))}
            {line("Санузлы", String(draft.maintenance.bathrooms))}
            {line(
              "Площадь",
              draft.maintenance.areaM2 ? `${draft.maintenance.areaM2} м²` : "",
            )}
            {line("Периодичность", draft.maintenance.frequency)}
          </>
        ) : null}

        {draft.service === "renovation" ? (
          <>
            {line(
              "Площадь",
              draft.renovation.areaM2 ? `${draft.renovation.areaM2} м²` : "",
            )}
            {line("Пыль", draft.renovation.dustLevel)}
          </>
        ) : null}

        {draft.service === "furniture" ? (
          <>
            {line("Предметов", String(draft.furniture.items.length))}
            {line("Материал", draft.furniture.material)}
          </>
        ) : null}

        {draft.service === "windows" ? (
          <>
            {line("Тип", draft.windows.windowType)}
            {line("Количество", String(draft.windows.count))}
            {line("Стороны", draft.windows.sides)}
          </>
        ) : null}

        {line("Город", draft.address.city)}
        {line("Улица", draft.address.street)}
        {line("Дом", draft.address.house)}
        {line("Квартира", draft.address.apartment)}
        {line("Дата", draft.schedule.date)}
        {line(
          "Время",
          draft.schedule.timeFrom && draft.schedule.timeTo
            ? `${draft.schedule.timeFrom}–${draft.schedule.timeTo}`
            : "",
        )}
        {line("Имя", draft.contact.name)}
        {line("Телефон", draft.contact.phone)}
        {line("Email", draft.contact.email)}
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
          className={[
            "rounded-lg bg-[#00d2ff] px-4 py-2 text-black font-semibold",
            submitting ? "opacity-70 cursor-not-allowed" : "",
          ].join(" ")}
          disabled={!!submitting}
          aria-busy={!!submitting}
          onClick={handleSubmit}
        >
          {submitting ? "Отправка..." : "Создать заказ"}
        </button>
      </div>
    </div>
  );
}
