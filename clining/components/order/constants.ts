import {
  Sparkles,
  Wind,
  Sofa,
  Droplets,
  Building2,
  Trees,
  Check,
  MapPin,
  Clock,
  Banknote,
  type LucideIcon,
} from "lucide-react";

export type StepId =
  | "service"
  | "details"
  | "furniture_items"
  | "furniture_params"
  | "windows_params"
  | "windows_access"
  | "location"
  | "datetime"
  | "budget"
  | "summary";

export interface StepMeta {
  id: StepId;
  title: string;
  icon: LucideIcon;
}

export type ServiceId =
  | "general"
  | "maintenance"
  | "renovation"
  | "furniture"
  | "windows"
  | "office"
  | "cottage";

export interface CleaningService {
  id: ServiceId;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  ringColor: string;
  priceFrom: number;
}

export type FurnitureMaterial = "fabric" | "leather" | "eco_leather" | "velour" | "other";
export type WindowsSides = "one" | "both";
export type WindowsAccess = "normal" | "hard";
export type WindowsType = "standard" | "panoramic" | "balcony" | "loggia";

export type FurnitureItemKind = "sofa" | "chair" | "mattress" | "carpet" | "other";

export interface FurnitureItem {
  kind: FurnitureItemKind;
  qty: number;
  seats?: number;
}

export interface FurnitureForm {
  items: FurnitureItem[];
  material: FurnitureMaterial;
  stains: {
    food: boolean;
    drinks: boolean;
    pets: boolean;
    odor: boolean;
  };
}

export interface WindowsForm {
  windowType: WindowsType;
  count: number;
  sides: WindowsSides;
  hasScreens: boolean;
  floor: string;
  access: WindowsAccess;
}

export interface CommonDetailsForm {
  rooms: string;
  bathrooms: string;
  area: string;
  description: string;
}

export interface RenovationDetailsForm {
  area: string;
  dustLevel: "low" | "medium" | "high";
  needsWasteRemoval: boolean;
  needsStickerRemoval: boolean;
  needsPaintTracesRemoval: boolean;
}

export interface OrderForm {
  service: ServiceId | "";

  // Общие блоки (используются большинством сценариев)
  details: CommonDetailsForm;
  renovation: RenovationDetailsForm;

  address: string;
  date: string;
  time: string;
  budget: string;

  // Ветки
  furniture: FurnitureForm;
  windows: WindowsForm;
}

export const STEP_META: Record<StepId, StepMeta> = {
  service: { id: "service", title: "Услуга", icon: Sparkles },

  details: { id: "details", title: "Детали", icon: Check },

  furniture_items: { id: "furniture_items", title: "Что чистим", icon: Sofa },
  furniture_params: { id: "furniture_params", title: "Материал и состояние", icon: Check },

  windows_params: { id: "windows_params", title: "Параметры окон", icon: Droplets },
  windows_access: { id: "windows_access", title: "Доступ и детали", icon: Wind },

  location: { id: "location", title: "Адрес", icon: MapPin },
  datetime: { id: "datetime", title: "Когда", icon: Clock },
  budget: { id: "budget", title: "Бюджет", icon: Banknote },

  summary: { id: "summary", title: "Проверка", icon: Check },
};

export const SERVICE_FLOWS: Record<ServiceId, StepId[]> = {
  general: ["service", "details", "location", "datetime", "budget", "summary"],
  maintenance: ["service", "details", "location", "datetime", "budget", "summary"],
  renovation: ["service", "details", "location", "datetime", "budget", "summary"],

  furniture: ["service", "furniture_items", "furniture_params", "location", "datetime", "budget", "summary"],
  windows: ["service", "windows_params", "windows_access", "location", "datetime", "budget", "summary"],

  // пока можно вести как general, потом выделишь отдельные шаги
  office: ["service", "details", "location", "datetime", "budget", "summary"],
  cottage: ["service", "details", "location", "datetime", "budget", "summary"],
};

export const cleaningServices: CleaningService[] = [
  {
    id: "general",
    name: "Генеральная уборка",
    description: "Комплексная уборка всего помещения: полы, пыль, санузел, кухня",
    icon: Sparkles,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    iconColor: "text-cyan-600",
    ringColor: "ring-cyan-500",
    priceFrom: 100,
  },
  {
    id: "maintenance",
    name: "Поддерживающая уборка",
    description: "Быстрая уборка для поддержания чистоты: полы, пыль, мусор",
    icon: Wind,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    ringColor: "ring-green-500",
    priceFrom: 50,
  },
  {
    id: "furniture",
    name: "Химчистка мебели",
    description: "Чистка диванов, кресел, матрасов, ковров от пятен и запахов",
    icon: Sofa,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    iconColor: "text-purple-600",
    ringColor: "ring-purple-500",
    priceFrom: 75,
  },
  {
    id: "windows",
    name: "Мойка окон",
    description: "Мытьё окон, балконов, лоджий с двух сторон",
    icon: Droplets,
    color: "from-sky-500 to-blue-500",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    iconColor: "text-sky-600",
    ringColor: "ring-sky-500",
    priceFrom: 75,
  },
  {
    id: "renovation",
    name: "Уборка после ремонта",
    description: "Удаление строительной пыли, краски, скотча и мусора",
    icon: Sparkles,
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    iconColor: "text-orange-600",
    ringColor: "ring-orange-500",
    priceFrom: 150,
  },
  {
    id: "office",
    name: "Офисная уборка",
    description: "Уборка офисных помещений, коворкингов, коммерческой недвижимости",
    icon: Building2,
    color: "from-slate-500 to-zinc-500",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    iconColor: "text-slate-600",
    ringColor: "ring-slate-500",
    priceFrom: 120,
  },
  {
    id: "cottage",
    name: "Уборка коттеджа",
    description: "Уборка загородных домов, дач, таунхаусов с участком",
    icon: Trees,
    color: "from-teal-500 to-green-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    iconColor: "text-teal-600",
    ringColor: "ring-teal-500",
    priceFrom: 190,
  },
];

export const roomOptions = ["1", "2", "3", "4", "5+"] as const;
export const bathroomOptions = ["1", "2", "3+"] as const;
export const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
] as const;

export function getFlowForService(service: ServiceId | "") {
  if (!service) return ["service"] as StepId[];
  return SERVICE_FLOWS[service];
}

export function getServiceId(raw: string): ServiceId | "" {
  // Поддержка старого id "deep" (если он уже где-то сохранён/используется)
  if (raw === "deep") return "furniture";

  if (
    raw === "general" ||
    raw === "maintenance" ||
    raw === "renovation" ||
    raw === "furniture" ||
    raw === "windows" ||
    raw === "office" ||
    raw === "cottage"
  ) {
    return raw;
  }

  return "";
}

export const DEFAULT_ORDER_FORM: OrderForm = {
  service: "",

  details: {
    rooms: "",
    bathrooms: "",
    area: "",
    description: "",
  },

  renovation: {
    area: "",
    dustLevel: "medium",
    needsWasteRemoval: false,
    needsStickerRemoval: false,
    needsPaintTracesRemoval: false,
  },

  address: "",
  date: "",
  time: "",
  budget: "",

  furniture: {
    items: [],
    material: "fabric",
    stains: { food: false, drinks: false, pets: false, odor: false },
  },

  windows: {
    windowType: "standard",
    count: 1,
    sides: "both",
    hasScreens: false,
    floor: "",
    access: "normal",
  },
};
