export const SERVICE_IDS = [
  "general",
  "maintenance",
  "renovation",
  "furniture",
  "windows",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICE_META = {
  general: { title: "Генеральная уборка" },
  maintenance: { title: "Поддерживающая уборка" },
  renovation: { title: "Уборка после ремонта" },
  furniture: { title: "Химчистка мебели" },
  windows: { title: "Мойка окон" },
} as const;

// Экспортируем все типы элементов
export type FurnitureItem = "sofa" | "armchair" | "mattress" | "carpet" | "chair" | "pouf";
export type FurnitureMaterial = "fabric" | "leather" | "velour" | "suede" | "ecoleather";
export type StainKey = "food" | "drinks" | "pets" | "odor";
export type WindowsType = "standard" | "balcony" | "panoramic" | "skylight";
export type WindowsSides = "both" | "inside" | "outside";
export type WindowsAccess = "normal" | "difficult" | "ladder_needed";
export type MaintenanceFrequency = "once" | "weekly" | "biweekly" | "monthly";
export type RenovationDustLevel = "light" | "medium" | "heavy";
export type FurnitureUrgency = "standard" | "urgent" | "next_day";

export const DEFAULT_DRAFT = {
  service: null as ServiceId | null,

  general: {
    rooms: 1,
    bathrooms: 1,
    kitchen: true,
    areaM2: "",
    extras: {
      fridgeInside: false,
      oven: false,
      hood: false,
      balcony: false,
    },
  },

  maintenance: {
    rooms: 1,
    bathrooms: 1,
    areaM2: "",
    frequency: "once" as MaintenanceFrequency,
    extras: {
      ironing: false,
      dishes: false,
    },
  },

  renovation: {
    areaM2: "",
    dustLevel: "medium" as RenovationDustLevel,
    needsWasteRemoval: false,
    needsStickerRemoval: false,
    needsPaintTracesRemoval: false,
  },

  furniture: {
    items: [] as FurnitureItem[],
    material: "fabric" as FurnitureMaterial,
    stains: {
      food: false,
      drinks: false,
      pets: false,
      odor: false,
    } as Record<StainKey, boolean>,
    urgency: "standard" as FurnitureUrgency,
  },

  windows: {
    windowType: "standard" as WindowsType,
    count: 1,
    sides: "both" as WindowsSides,
    hasScreens: false,
    floor: "",
    access: "normal" as WindowsAccess,
  },

  address: {
    city: "",
    street: "",
    house: "",
    apartment: "",
    comment: "",
  },

  schedule: {
    date: "",
    timeFrom: "",
    timeTo: "",
  },

  contact: {
    name: "",
    phone: "",
    email: "",
  },

  budget: {
    amount: "",
  },
};

export type Draft = typeof DEFAULT_DRAFT;

export type StepKind =
  | "service"
  | "general_details"
  | "general_extras"
  | "maintenance_details"
  | "renovation_details"
  | "furniture_items"
  | "furniture_params"
  | "windows_params"
  | "windows_access"
  | "address"
  | "schedule"
  | "contact"
  | "review";

export interface FlowStep {
  id: StepKind;
  title: string;
  kind: StepKind;
}

const TITLES: Record<StepKind, string> = {
  service: "Услуга",
  general_details: "Детали помещения",
  general_extras: "Дополнительно",
  maintenance_details: "Детали уборки",
  renovation_details: "Состояние после ремонта",
  furniture_items: "Что чистим",
  furniture_params: "Материал и состояние",
  windows_params: "Параметры окон",
  windows_access: "Доступ и детали",
  address: "Адрес",
  schedule: "Когда",
  contact: "Контакты",
  review: "Проверка",
};

function step(kind: StepKind): FlowStep {
  return { id: kind, kind, title: TITLES[kind] };
}

const COMMON_TAIL: StepKind[] = ["address", "schedule", "contact", "review"];

const FLOWS: Record<ServiceId, StepKind[]> = {
  general: ["service", "general_details", "general_extras", ...COMMON_TAIL],
  maintenance: ["service", "maintenance_details", ...COMMON_TAIL],
  renovation: ["service", "renovation_details", ...COMMON_TAIL],
  furniture: ["service", "furniture_items", "furniture_params", ...COMMON_TAIL],
  windows: ["service", "windows_params", "windows_access", ...COMMON_TAIL],
};

export function getFlowSteps(service: ServiceId | null): FlowStep[] {
  const kinds = service ? FLOWS[service] : (["service"] as StepKind[]);
  return kinds.map(step);
}