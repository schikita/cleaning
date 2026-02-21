import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FormatPriceOptions {
  locale?: string;
  currency?: string;
  maximumFractionDigits?: number;
}

export function formatPrice(value: string | number, options?: FormatPriceOptions) {
  const opts = options || {}

  const locale = opts.locale || "ru-BY"
  const currency = opts.currency || "BYN"
  const maximumFractionDigits =
    typeof opts.maximumFractionDigits === "number" ? opts.maximumFractionDigits : 0

  let num = value

  if (typeof num === "string") {
    num = Number(num.replace(/\s/g, "").replace(",", "."))
  }

  if (typeof num !== "number" || !Number.isFinite(num)) {
    return ""
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits,
  }).format(num)
}