"use client";

import Link from "next/link";
import { AnimateOnScroll } from "./animate-on-scroll";
import { AbstractBackground } from "./abstract-background";

export function CtaSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[var(--cream)] dark:bg-[#0f1412] overflow-hidden" aria-label="Призыв к действию">
      <AbstractBackground variant="cta" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <AnimateOnScroll>
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative rounded-3xl p-10 sm:p-14 md:p-16 bg-[var(--brand)] dark:bg-[#1a211e] border border-[var(--border)] dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--brand)]/20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Готовы к идеальной чистоте?
              </h2>
              <p className="text-lg text-white/80 dark:text-zinc-400 mb-10 max-w-lg mx-auto">
                Присоединяйтесь к&nbsp;тысячам довольных клиентов
                и&nbsp;лучших специалистов Беларуси
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/client/order/create"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--brand)] dark:bg-white dark:text-[#0f1412] rounded-xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                >
                  Заказать уборку
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>

                <Link
                  href="/performer/register"
                  className="px-8 py-4 border-2 border-white/50 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                >
                  Стать исполнителем
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
