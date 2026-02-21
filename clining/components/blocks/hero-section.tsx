"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STATS = [
  { value: "10 000+", label: "Выполненных заказов" },
  { value: "2 500+", label: "Проверенных мастеров" },
  { value: "4.9", label: "Средний рейтинг" },
  { value: "24/7", label: "Онлайн-поддержка" },
] as const;

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Главный экран"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#060a14]">
        {/* Gradient orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#00d2ff]/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#7253df]/[0.07] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#1a3a5c]/[0.15] blur-[100px]" />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-md mb-10"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-white/70 text-sm font-medium tracking-wide">
              Более 10 000 заказов в Беларуси
            </span>
          </div>

          {/* Logo / Title */}
          <h1 className="mb-6">
            <span
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded
                  ? "translateY(0) scale(1)"
                  : "translateY(24px) scale(0.95)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              <span className="text-[#00d2ff] drop-shadow-[0_0_40px_rgba(0,210,255,0.3)]">
                Pro
              </span>
              <span className="inline-block w-[3px] h-[0.65em] bg-gradient-to-b from-[#00d2ff] to-[#7253df] mx-2 sm:mx-3 rounded-full align-middle shadow-[0_0_12px_rgba(0,210,255,0.4)]" />
              <span className="text-[#7253df] drop-shadow-[0_0_40px_rgba(114,83,223,0.3)]">
                Чисто
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl md:text-3xl text-white/70 mb-4 font-light tracking-wide"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            Маркетплейс клининговых услуг
          </p>

          <p
            className="text-base sm:text-lg text-white/40 mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            Найдите проверенных специалистов по уборке квартир, офисов
            и&nbsp;коммерческих помещений в&nbsp;Минске и&nbsp;по&nbsp;всей
            Беларуси
          </p>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            <Link
              href="/client/order/create"
              className="group relative px-8 py-4 rounded-2xl font-semibold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(0,210,255,0.25)] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d2ff] to-[#0090d4] transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00b8e6] to-[#0078c0] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
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
              href="/performer/feed"
              className="group px-8 py-4 rounded-2xl font-semibold text-lg text-white/90 border border-white/[0.12] bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2.5">
                <svg
                  className="w-5 h-5 text-[#7253df]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Стать исполнителем
              </span>
            </Link>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 max-w-3xl mx-auto"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s ease 0.8s",
            }}
          >
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 transition-colors group-hover:text-[#00d2ff]">
                  {stat.value}
                </div>
                <div className="text-white/35 text-xs sm:text-sm tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
