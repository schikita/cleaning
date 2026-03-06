"use client";

import { useState } from "react";
import { AnimateOnScroll } from "./animate-on-scroll";
import { CityMapModal } from "./city-map-modal";

const CITIES = [
  {
    name: "Минск",
    count: "1 200+ мастеров",
    featured: true,
    region: "Минской области",
    cities: "Борисов, Молодечно, Слуцк, Солигорск, Жодино, Фаниполь, Дзержинск",
  },
  {
    name: "Гомель",
    count: "340+ мастеров",
    featured: false,
    region: "Гомельской области",
    cities: "Мозырь, Жлобин, Светлогорск, Речица, Калинковичи, Рогачёв",
  },
  {
    name: "Могилёв",
    count: "280+ мастеров",
    featured: false,
    region: "Могилёвской области",
    cities: "Бобруйск, Орша, Горки, Кричев, Осиповичи, Чаусы",
  },
  {
    name: "Витебск",
    count: "250+ мастеров",
    featured: false,
    region: "Витебской области",
    cities: "Полоцк, Новополоцк, Орша, Глубокое, Поставы, Лепель",
  },
  {
    name: "Гродно",
    count: "230+ мастеров",
    featured: false,
    region: "Гродненской области",
    cities: "Лида, Слоним, Волковыск, Новогрудок, Сморгонь, Мосты",
  },
  {
    name: "Брест",
    count: "220+ мастеров",
    featured: false,
    region: "Брестской области",
    cities: "Барановичи, Пинск, Кобрин, Берёза, Лунинец, Ивацевичи",
  },
] as const;

export function GeographySection() {
  const [selectedCity, setSelectedCity] = useState<
    | {
        name: string;
        count: string;
        region: string;
        cities: string;
      }
    | null
  >(null);

  return (
    <section
      className="py-24 sm:py-32 bg-[var(--warm-white)] dark:bg-[#0f1412]"
      id="cities"
      aria-label="География"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <AnimateOnScroll className="text-center mb-14">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[var(--brand)] dark:text-[var(--primary)] mb-4">
            География
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--ink)] dark:text-white mb-5">
            Работаем по всей Беларуси
          </h2>
          <p className="text-lg text-[var(--ink-muted)] dark:text-zinc-400 max-w-2xl mx-auto">
            Клининговые услуги доступны во всех областных центрах и&nbsp;крупных
            городах страны
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {CITIES.map((city, idx) => (
            <AnimateOnScroll key={city.name} delay={idx * 0.06}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedCity({
                    name: city.name,
                    count: city.count,
                    region: city.region,
                    cities: city.cities,
                  });
                }}
                className={`group block w-full text-center p-5 sm:p-6 rounded-2xl border transition-all duration-500 ease-out hover:-translate-y-1 ${
                  city.featured
                    ? "bg-[var(--accent)] dark:bg-white/5 border-[var(--brand)]/30 dark:border-[var(--primary)]/30 hover:border-[var(--brand)]/50 hover:shadow-lg"
                    : "bg-[var(--warm-white)] dark:bg-[#1a211e] border-[var(--border)] dark:border-white/10 hover:border-[var(--brand)]/20 hover:shadow-lg"
                }`}
              >
                <span
                  className={`block text-lg font-bold mb-1 transition-colors ${
                    city.featured
                      ? "text-[var(--brand)] dark:text-[var(--primary)]"
                      : "text-[var(--ink)] dark:text-white group-hover:text-[var(--brand)] dark:group-hover:text-[var(--primary)]"
                  }`}
                >
                  {city.name}
                </span>
                <span className="text-xs text-[var(--ink-muted)] dark:text-zinc-500">{city.count}</span>
              </button>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <CityMapModal
        city={
          selectedCity ?? {
            name: "",
            count: "",
            region: "",
            cities: "",
          }
        }
        open={!!selectedCity}
        onClose={() => setSelectedCity(null)}
      />
    </section>
  );
}
