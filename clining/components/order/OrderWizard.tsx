"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_DRAFT, getFlowSteps, type Draft } from "./flows";
import { orderStyles as s } from "./styles";

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

function useCanNext(draft: Draft, stepKind: string): boolean {
  switch (stepKind) {
    case "address":
      return Boolean(
        draft.address.city.trim() &&
        draft.address.street.trim() &&
        draft.address.house.trim(),
      );
    case "contact":
      return Boolean(draft.contact.name.trim() && draft.contact.phone.trim());
    case "schedule":
      return Boolean(
        draft.schedule.date && draft.schedule.timeFrom && draft.schedule.timeTo,
      );
    case "furniture_items":
      return draft.furniture.items.length > 0;
    default:
      return true;
  }
}

export default function OrderWizard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [draft, setDraft] = useState<Draft>(DEFAULT_DRAFT);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = readStoredDraft();
    if (stored) setDraft((prev) => mergeDraft(prev, stored));
  }, []);

  // Восстановить шаг после возврата с логина
  useEffect(() => {
    if (!mounted) return;
    const returnStep = searchParams.get("step");
    if (returnStep === "contact") {
      const steps = getFlowSteps(draft.service);
      const contactIdx = steps.findIndex((s) => s.kind === "contact");
      if (contactIdx >= 0) setStepIndex(contactIdx);
    }
  }, [mounted, searchParams, draft.service]);

  const steps = useMemo(() => getFlowSteps(draft.service), [draft.service]);
  const safeIndex = clampIndex(stepIndex, steps.length);
  const step = steps[safeIndex];

  // Авторизация требуется на шаге контактов
  useEffect(() => {
    if (!mounted || status === "loading") return;
    if (step?.kind === "contact" && status === "unauthenticated") {
      router.replace(
        `/login?callbackUrl=${encodeURIComponent("/client/order/create?step=contact")}`
      );
    }
  }, [mounted, status, step?.kind, router]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {}
  }, [draft, mounted]);

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
      // eslint-disable-next-line no-console
      console.log("[OrderWizard] submit payload", draft);
      alert("Спасибо! Заявка отправлена. Мы скоро с вами свяжемся.");
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      setDraft(DEFAULT_DRAFT);
      setStepIndex(0);
    } finally {
      setSubmitting(false);
    }
  }

  const canNext = useCanNext(draft, step?.kind ?? "");
  const isFirstStep = safeIndex === 0;
  const isLastStep = safeIndex === steps.length - 1;
  const isServiceStep = step?.kind === "service";

  if (!mounted) {
    return (
      <div className={s.shell}>
        <div className="h-6 w-56 rounded bg-muted" />
        <div className="mt-3 h-2 w-full rounded bg-muted/70" />
        <div className="mt-6 h-[220px] w-full rounded-xl bg-muted/40" />
      </div>
    );
  }

  if (!step) return <div className={s.shell} />;

  // Передаём next/prev всем шагам — совместимо как со старыми (Props требуют next/prev),
  // так и с новыми версиями (Props не требуют next/prev, просто игнорируют)
  const commonProps = { draft, updateDraft, next, prev };

  const renderStep = (): React.ReactNode => {
    switch (step.kind) {
      case "service":
        return <StepService {...commonProps} />;
      case "general_details":
        return <StepGeneralDetails {...commonProps} />;
      case "general_extras":
        return <StepGeneralExtras {...commonProps} />;
      case "maintenance_details":
        return <StepMaintenanceDetails {...commonProps} />;
      case "renovation_details":
        return <StepRenovationDetails {...commonProps} />;
      case "furniture_items":
        return <StepFurnitureItems {...commonProps} />;
      case "furniture_params":
        return <StepFurnitureParams {...commonProps} />;
      case "windows_params":
        return <StepWindowsParams {...commonProps} />;
      case "windows_access":
        return <StepWindowsAccess {...commonProps} />;
      case "address":
        return <StepAddress {...commonProps} />;
      case "schedule":
        return <StepSchedule {...commonProps} />;
      case "contact":
        return <StepContact {...commonProps} />;
      case "review":
        return <StepReview draft={draft} />;
      default:
        const _exhaustiveCheck: never = step.kind;
        return null;
    }
  };

  return (
    <div className={s.page}>
      <div className={s.headerRow}>
        <div className={s.headerText}>
          Шаг {safeIndex + 1} из {steps.length} · {step.title}
        </div>
      </div>

      <div className="mb-6">
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
            style={{
              width: `${Math.round(((safeIndex + 1) / steps.length) * 100)}%`,
            }}
          />
        </div>
      </div>

      <div className={s.shell}>{renderStep()}</div>

      {/* Единая навигация для всех шагов кроме выбора услуги */}
      {!isServiceStep && (
        <div className={s.actions}>
          <button
            type="button"
            onClick={prev}
            disabled={isFirstStep}
            className={s.btnOutline}
          >
            ← Назад
          </button>

          {isLastStep ? (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className={s.btnPrimary}
            >
              {submitting ? "Отправка..." : "Создать заказ ✓"}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              className={s.btnPrimary}
            >
              Далее →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
