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
                className={`group block w-full text-center p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
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
