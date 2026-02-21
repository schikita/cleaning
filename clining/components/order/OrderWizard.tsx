"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DEFAULT_DRAFT, getFlowSteps, type Draft } from "./flows";

// Нам не нужен внутренний theme-togle , мы должны принимать состояние темы из переключателя header
import { orderStyles } from "./styles";

import StepService from "./steps/StepService";
import StepGeneralDetails from "./steps/StepGeneralDetails";
import StepGeneralExtras from "./steps/StepGeneralExtras";
import StepMaintenanceDetails from "./steps/StepMaintenanceDetails";
import StepRenovationDetails from "./steps/StepRenovationDetails";
import StepFurnitureItems from "./steps/StepFurnitureItems";
import StepFurnitureParams from "./steps/StepFurnitureParams";
import StepWindowsParams from "./steps/StepWindowsParams";
import StepWindowsAccess from "./steps/StepWindowsAccess";
import StepAddress from "./steps/StepAddress";
import StepSchedule from "./steps/StepSchedule";
import StepContact from "./steps/StepContact";
import StepReview from "./steps/StepReview";

const STORAGE_KEY = "order_draft_v1";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(base: unknown, patch: unknown): unknown {
  if (!isPlainObject(base) || !isPlainObject(patch)) return patch ?? base;

  const out: Record<string, unknown> = { ...base };

  for (const key of Object.keys(patch)) {
    if (!(key in base)) continue;

    const bv = base[key];
    const pv = patch[key];

    if (isPlainObject(bv) && isPlainObject(pv)) {
      out[key] = deepMerge(bv, pv);
      continue;
    }

    out[key] = pv;
  }

  return out;
}

function mergeDraft(base: Draft, patch: Partial<Draft>): Draft {
  return deepMerge(base, patch) as Draft;
}

function readStoredDraft(): Partial<Draft> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<Draft>;
  } catch {
    return null;
  }
}

function clampIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  if (index < 0) return 0;
  if (index > length - 1) return length - 1;
  return index;
}

export default function OrderWizard() {
  const [mounted, setMounted] = useState(false);
  const [draft, setDraft] = useState<Draft>(DEFAULT_DRAFT);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored = readStoredDraft();
    if (stored) {
      setDraft((prev) => mergeDraft(prev, stored));
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {}
  }, [draft, mounted]);

  const steps = useMemo(() => getFlowSteps(draft.service), [draft.service]);
  const safeIndex = clampIndex(stepIndex, steps.length);
  const step = steps[safeIndex];

  useEffect(() => {
    if (safeIndex !== stepIndex) setStepIndex(safeIndex);
  }, [safeIndex, stepIndex]);

  useEffect(() => {
    if (!mounted) return;
    setStepIndex(0);
  }, [draft.service, mounted]);

  function updateDraft(patch: Partial<Draft>) {
    setDraft((prev) => mergeDraft(prev, patch));
  }

  function next() {
    setStepIndex((i) => clampIndex(i + 1, steps.length));
  }

  function prev() {
    setStepIndex((i) => clampIndex(i - 1, steps.length));
  }

  async function submit() {
    if (submitting) return;
    setSubmitting(true);

    try {
      // Здесь будет интеграция с API (POST /orders). Сейчас — безопасная заглушка.
      // eslint-disable-next-line no-console
      console.log("[OrderWizard] submit payload", draft);

      alert("Спасибо! Заявка отправлена. Мы скоро с вами свяжемся.");

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }

      setDraft(DEFAULT_DRAFT);
      setStepIndex(0);
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted) {
    return (
      <div className={orderStyles.shell}>
        <div className="h-6 w-56 rounded bg-muted" />
        <div className="mt-3 h-2 w-full rounded bg-muted/70" />
        <div className="mt-6 h-[220px] w-full rounded-xl bg-muted/40" />
      </div>
    );
  }

  if (!step) {
    return <div className={orderStyles.shell} />;
  }

  const renderStep = (): React.ReactNode => {
    const { kind } = step;

    switch (kind) {
      case "service":
        return (
          <StepService draft={draft} updateDraft={updateDraft} next={next} />
        );

      case "general_details":
        return (
          <StepGeneralDetails
            draft={draft}
            updateDraft={updateDraft}
            next={next}
            prev={prev}
          />
        );

      case "general_extras":
        return (
          <StepGeneralExtras
            draft={draft}
            updateDraft={updateDraft}
            next={next}
            prev={prev}
          />
        );

      case "maintenance_details":
        return (
          <StepMaintenanceDetails
            draft={draft}
            updateDraft={updateDraft}
            next={next}
            prev={prev}
          />
        );

      case "renovation_details":
        return (
          <StepRenovationDetails
            draft={draft}
            updateDraft={updateDraft}
            next={next}
            prev={prev}
          />
        );

      case "furniture_items":
        return (
          <StepFurnitureItems
            draft={draft}
            updateDraft={updateDraft}
            next={next}
            prev={prev}
          />
        );

      case "furniture_params":
        return (
          <StepFurnitureParams
            draft={draft}
            updateDraft={updateDraft}
            next={next}
            prev={prev}
          />
        );

      case "windows_params":
        return (
          <StepWindowsParams
            draft={draft}
            updateDraft={updateDraft}
            next={next}
            prev={prev}
          />
        );

      case "windows_access":
        return (
          <StepWindowsAccess
            draft={draft}
            updateDraft={updateDraft}
            next={next}
            prev={prev}
          />
        );

      case "address":
        return (
          <StepAddress
            draft={draft}
            updateDraft={updateDraft}
            next={next}
            prev={prev}
          />
        );

      case "schedule":
        return (
          <StepSchedule
            draft={draft}
            updateDraft={updateDraft}
            next={next}
            prev={prev}
          />
        );

      case "contact":
        return (
          <StepContact
            draft={draft}
            updateDraft={updateDraft}
            next={next}
            prev={prev}
          />
        );

      case "review":
        return (
          <StepReview
            draft={draft}
            prev={prev}
            onSubmit={submit}
            submitting={submitting}
          />
        );

      default:
        const _exhaustiveCheck: never = kind;
        return null;
    }
  };

  return (
    <div className={orderStyles.page}>
      <div className={orderStyles.headerRow}>
        <div className={orderStyles.headerText}>
          Шаг {safeIndex + 1} из {steps.length} · {step.title}
        </div>
      </div>

      <div className="mb-8">
        <div className="h-2 rounded-full bg-slate-200/70 overflow-hidden dark:bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
            style={{
              width: `${Math.round(((safeIndex + 1) / steps.length) * 100)}%`,
            }}
          />
        </div>
      </div>

      <div className={orderStyles.shell}>{renderStep()}</div>
    </div>
  );
}
