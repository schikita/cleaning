"use client";

import Link from "next/link";
import { AnimateOnScroll } from "./animate-on-scroll";

export function CtaSection() {
  return (
    <section className="py-24 sm:py-32 bg-white" aria-label="Призыв к действию">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="max-w-4xl mx-auto relative">
            {/* Card */}
            <div className="relative bg-[#060a14] rounded-[2rem] p-10 sm:p-14 md:p-16 overflow-hidden text-center">
              {/* Background effects */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#00d2ff]/[0.06] rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#7253df]/[0.06] rounded-full blur-[100px]" />
              </div>

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent opacity-40" />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                  Готовы к идеальной чистоте?
                </h2>
                <p className="text-lg text-white/40 mb-10 max-w-lg mx-auto">
                  Присоединяйтесь к&nbsp;тысячам довольных клиентов
                  и&nbsp;лучших специалистов Беларуси
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/client/order/create"
                    className="group px-8 py-4 bg-gradient-to-r from-[#00d2ff] to-[#0090d4] text-white rounded-2xl font-semibold text-lg hover:shadow-[0_8px_32px_rgba(0,210,255,0.3)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Заказать уборку
                      <svg
                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
                    </span>
                  </Link>

                  <Link
                    href="/performer/register"
                    className="px-8 py-4 border border-white/[0.12] text-white/90 rounded-2xl font-semibold text-lg hover:bg-white/[0.06] hover:border-white/[0.2] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    Стать исполнителем
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
