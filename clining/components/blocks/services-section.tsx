"use client";

import Link from "next/link";
import { AnimateOnScroll } from "./animate-on-scroll";

const SERVICES = [
  {
    title: "Уборка квартир",
    desc: "Генеральная и поддерживающая уборка, мытьё окон, уборка после ремонта и переезда",
    slug: "apartment",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    accent: "#00d2ff",
    accentBg: "rgba(0,210,255,0.08)",
  },
  {
    title: "Уборка офисов",
    desc: "Ежедневный клининг, комплексное обслуживание офисных и торговых помещений",
    slug: "office",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    accent: "#5b8af5",
    accentBg: "rgba(91,138,245,0.08)",
  },
  {
    title: "Химчистка мебели",
    desc: "Глубокая чистка диванов, ковров, матрасов и мягкой мебели профессиональным оборудованием",
    slug: "furniture",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    accent: "#7253df",
    accentBg: "rgba(114,83,223,0.08)",
  },
  {
    title: "Мойка окон",
    desc: "Мытьё окон, фасадов и витрин на любой высоте с использованием промышленного оборудования",
    slug: "windows",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
    accent: "#00d2ff",
    accentBg: "rgba(0,210,255,0.08)",
  },
  {
    title: "Уборка после ремонта",
    desc: "Вывоз строительного мусора, удаление пыли, мойка всех поверхностей после отделочных работ",
    slug: "renovation",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    accent: "#5b8af5",
    accentBg: "rgba(91,138,245,0.08)",
  },
  {
    title: "Промышленный клининг",
    desc: "Уборка складов, производственных помещений, паркингов и территорий предприятий",
    slug: "industrial",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    accent: "#7253df",
    accentBg: "rgba(114,83,223,0.08)",
  },
] as const;

export function ServicesSection() {
  return (
    <section
      className="py-24 sm:py-32 bg-[#f8f9fb]"
      id="services"
      aria-label="Услуги"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#00d2ff] mb-4">
            Услуги
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-5">
            Все виды клининга
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Выберите нужную услугу — получите отклики от проверенных
            специалистов в&nbsp;вашем городе
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {SERVICES.map((service, idx) => (
            <AnimateOnScroll key={service.slug} delay={idx * 0.08}>
              <Link
                href={`/client/order/create?category=${service.slug}`}
                className="group block relative bg-white rounded-2xl p-7 sm:p-8 border border-slate-100 hover:border-transparent hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 h-full"
              >
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${service.accentBg}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: service.accentBg,
                      color: service.accent,
                    }}
                  >
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-slate-800">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 text-[15px] leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                    style={{ color: service.accent }}
                  >
                    Заказать
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
