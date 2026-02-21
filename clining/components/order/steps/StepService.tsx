"use client";

import React from "react";
import { SERVICE_META, type ServiceId, type Draft } from "../flows";

type ServiceCardProps = {
  title: string;
  priceFrom: string;
  selected: boolean;
  onClick: () => void;
  description?: string;
};

function ServiceCard({
  title,
  priceFrom,
  selected,
  onClick,
  description,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left rounded-2xl border transition-colors",
        "px-5 py-4 flex items-center justify-between gap-4",
        selected
          ? "border-primary/40 bg-primary/10"
          : "border-border bg-card hover:bg-accent",
      ].join(" ")}
    >
      <div className="min-w-0">
        <div className="text-foreground font-semibold">{title}</div>
        {description ? (
          <div className="text-muted-foreground text-sm mt-1">
            {description}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-muted-foreground text-sm whitespace-nowrap">
          {priceFrom}
        </div>
        <div
          className={[
            "h-5 w-5 rounded-full border-2",
            selected ? "border-primary bg-primary/40" : "border-border",
          ].join(" ")}
        />
      </div>
    </button>
  );
}

type Props = {
  draft: Draft;
  updateDraft: (patch: Partial<Draft>) => void;
  next: () => void;
};

export default function StepService({ draft, updateDraft, next }: Props) {
  function choose(service: ServiceId) {
    updateDraft({ service });
    next();
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-2xl font-bold text-foreground">
          Какая уборка нужна?
        </div>
        <div className="text-muted-foreground mt-2">
          Выберите тип услуги — мы подберём лучших клинеров
        </div>
      </div>

      <div className="space-y-3">
        <ServiceCard
          title={SERVICE_META.general.title}
          description="Комплексная уборка всего помещения"
          priceFrom="от 100 Br"
          selected={draft.service === "general"}
          onClick={() => choose("general")}
        />

        <ServiceCard
          title={SERVICE_META.maintenance.title}
          description="Быстро поддержать чистоту"
          priceFrom="от 50 Br"
          selected={draft.service === "maintenance"}
          onClick={() => choose("maintenance")}
        />

        <ServiceCard
          title={SERVICE_META.furniture.title}
          description="Диваны, кресла, матрасы, ковры"
          priceFrom="от 75 Br"
          selected={draft.service === "furniture"}
          onClick={() => choose("furniture")}
        />

        <ServiceCard
          title={SERVICE_META.windows.title}
          description="Окна, балконы, лоджии с двух сторон"
          priceFrom="от 75 Br"
          selected={draft.service === "windows"}
          onClick={() => choose("windows")}
        />

        <ServiceCard
          title={SERVICE_META.renovation.title}
          description="Пыль, краска, скотч, строительный мусор"
          priceFrom="от 150 Br"
          selected={draft.service === "renovation"}
          onClick={() => choose("renovation")}
        />
      </div>
    </div>
  );
}
