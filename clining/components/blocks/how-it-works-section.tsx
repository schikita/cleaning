"use client";

import { AnimateOnScroll } from "./animate-on-scroll";

const STEPS = [
  {
    step: "01",
    title: "Опишите задачу",
    desc: "Укажите тип уборки, площадь помещения, желаемую дату и особые пожелания",
  },
  {
    step: "02",
    title: "Получите отклики",
    desc: "Проверенные клинеры предложат свои условия — сравните цены, рейтинги и отзывы",
  },
  {
    step: "03",
    title: "Наслаждайтесь чистотой",
    desc: "Выберите лучшего исполнителя, оплатите безопасно через платформу и примите работу",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      className="py-24 sm:py-32 bg-[var(--warm-white)] dark:bg-[#0f1412]"
      id="how-it-works"
      aria-label="Как это работает"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <AnimateOnScroll className="text-center mb-16 sm:mb-20">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[var(--brand)] dark:text-[var(--primary)] mb-4">
            Просто и быстро
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--ink)] dark:text-white mb-5">
            Как это работает
          </h2>
          <p className="text-lg text-[var(--ink-muted)] dark:text-zinc-400">
            Три шага от заявки до сияющей чистоты
          </p>
        </AnimateOnScroll>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 relative">
            <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-[2px]">
              <div className="w-full h-full bg-[var(--border)] dark:bg-white/10 rounded-full" />
            </div>

            {STEPS.map((item, idx) => (
              <AnimateOnScroll key={idx} delay={idx * 0.15}>
                <div className="relative text-center group">
                  <div className="w-[104px] h-[104px] rounded-3xl flex items-center justify-center mx-auto mb-7 relative transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-lg bg-[var(--accent)] dark:bg-white/5 border border-[var(--border)] dark:border-white/10">
                    <span className="text-3xl font-bold text-[var(--brand)] dark:text-[var(--primary)]">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[var(--ink-muted)] dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
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
