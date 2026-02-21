"use client";

import Link from "next/link";
import { AnimateOnScroll } from "./animate-on-scroll";

const CITIES = [
  { name: "Минск", count: "1 200+ мастеров", featured: true },
  { name: "Гомель", count: "340+ мастеров", featured: false },
  { name: "Могилёв", count: "280+ мастеров", featured: false },
  { name: "Витебск", count: "250+ мастеров", featured: false },
  { name: "Гродно", count: "230+ мастеров", featured: false },
  { name: "Брест", count: "220+ мастеров", featured: false },
] as const;

export function GeographySection() {
  return (
    <section
      className="py-24 sm:py-32 bg-[#f8f9fb]"
      id="cities"
      aria-label="География"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <AnimateOnScroll className="text-center mb-14">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#00d2ff] mb-4">
            География
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-5">
            Работаем по всей Беларуси
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Клининговые услуги доступны во всех областных центрах и&nbsp;крупных
            городах страны
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {CITIES.map((city, idx) => (
            <AnimateOnScroll key={city.name} delay={idx * 0.06}>
              <Link
                href={`/city/${city.name.toLowerCase()}`}
                className={`group block text-center p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  city.featured
                    ? "bg-gradient-to-br from-[#00d2ff]/[0.06] to-[#7253df]/[0.06] border-[#00d2ff]/20 hover:border-[#00d2ff]/40 hover:shadow-lg hover:shadow-[#00d2ff]/[0.08]"
                    : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100"
                }`}
              >
                <span
                  className={`block text-lg font-bold mb-1 transition-colors ${
                    city.featured
                      ? "text-[#00d2ff]"
                      : "text-slate-900 group-hover:text-[#00d2ff]"
                  }`}
                >
                  {city.name}
                </span>
                <span className="text-xs text-slate-400">{city.count}</span>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
