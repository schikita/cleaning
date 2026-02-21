"use client";

import React from "react";
import { SERVICE_META, type Draft } from "../flows";
import { orderStyles as s } from "../styles";

type Props = {
  draft: Draft;
  prev: () => void;
  onSubmit?: () => void;
  submitting?: boolean;
};

function line(label: string, value: string) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className={s.label}>{label}</div>
      <div className="text-foreground text-sm text-right">{value || "—"}</div>
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
    alert("Заказ сформирован (заглушка).");
  }

  return (
    <div>
      <div className={s.stepTitle}>Проверка</div>
      <div className={s.stepSubtitle}>
        Проверьте данные перед созданием заказа
      </div>

      <div className={`mt-6 ${s.card} space-y-3`}>
        {line("Услуга", serviceTitle)}

        {draft.service === "general" && (
          <>
            {line("Комнаты", String(draft.general.rooms))}
            {line("Санузлы", String(draft.general.bathrooms))}
            {line(
              "Площадь",
              draft.general.areaM2 ? `${draft.general.areaM2} м²` : "",
            )}
          </>
        )}

        {draft.service === "maintenance" && (
          <>
            {line("Комнаты", String(draft.maintenance.rooms))}
            {line("Санузлы", String(draft.maintenance.bathrooms))}
            {line(
              "Площадь",
              draft.maintenance.areaM2 ? `${draft.maintenance.areaM2} м²` : "",
            )}
            {line("Периодичность", draft.maintenance.frequency)}
          </>
        )}

        {draft.service === "renovation" && (
          <>
            {line(
              "Площадь",
              draft.renovation.areaM2 ? `${draft.renovation.areaM2} м²` : "",
            )}
            {line("Пыль", draft.renovation.dustLevel)}
          </>
        )}

        {draft.service === "furniture" && (
          <>
            {line("Предметов", String(draft.furniture.items.length))}
            {line("Материал", draft.furniture.material)}
          </>
        )}

        {draft.service === "windows" && (
          <>
            {line("Тип", draft.windows.windowType)}
            {line("Количество", String(draft.windows.count))}
            {line("Стороны", draft.windows.sides)}
          </>
        )}

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

      <div className={s.actions}>
        <button type="button" onClick={prev} className={s.btnOutline}>
          Назад
        </button>
        <button
          type="button"
          className={s.btnPrimary}
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
