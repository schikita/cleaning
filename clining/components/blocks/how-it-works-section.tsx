"use client";

import { AnimateOnScroll } from "./animate-on-scroll";

const STEPS = [
  {
    step: "01",
    title: "Опишите задачу",
    desc: "Укажите тип уборки, площадь помещения, желаемую дату и особые пожелания",
    accent: "#00d2ff",
  },
  {
    step: "02",
    title: "Получите отклики",
    desc: "Проверенные клинеры предложат свои условия — сравните цены, рейтинги и отзывы",
    accent: "#5b8af5",
  },
  {
    step: "03",
    title: "Наслаждайтесь чистотой",
    desc: "Выберите лучшего исполнителя, оплатите безопасно через платформу и примите работу",
    accent: "#7253df",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      className="py-24 sm:py-32 bg-white"
      id="how-it-works"
      aria-label="Как это работает"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <AnimateOnScroll className="text-center mb-16 sm:mb-20">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#7253df] mb-4">
            Просто и быстро
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-5">
            Как это работает
          </h2>
          <p className="text-lg text-slate-500">
            Три шага от заявки до сияющей чистоты
          </p>
        </AnimateOnScroll>

        <div className="max-w-5xl mx-auto">
          {/* Desktop: horizontal layout with connecting line */}
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-[2px]">
              <div className="w-full h-full bg-gradient-to-r from-[#00d2ff]/30 via-[#5b8af5]/30 to-[#7253df]/30 rounded-full" />
            </div>

            {STEPS.map((item, idx) => (
              <AnimateOnScroll key={idx} delay={idx * 0.15}>
                <div className="relative text-center group">
                  {/* Step number circle */}
                  <div
                    className="w-[104px] h-[104px] rounded-3xl flex items-center justify-center mx-auto mb-7 relative transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${item.accent}15, ${item.accent}08)`,
                      border: `1.5px solid ${item.accent}20`,
                    }}
                  >
                    <span
                      className="text-3xl font-bold"
                      style={{ color: item.accent }}
                    >
                      {item.step}
                    </span>
                    {/* Glow on hover */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                      style={{ background: `${item.accent}15` }}
                    />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
