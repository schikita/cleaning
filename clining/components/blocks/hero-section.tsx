"use client";

import Link from "next/link";
import { AbstractBackground } from "./abstract-background";

const STATS = [
  { value: "10 000+", label: "Выполненных заказов" },
  { value: "2 500+", label: "Проверенных мастеров" },
  { value: "4.9", label: "Средний рейтинг" },
  { value: "24/7", label: "Онлайн-поддержка" },
] as const;

export function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--warm-white)] dark:bg-[#0f1412]"
      aria-label="Главный экран"
    >
      <AbstractBackground variant="hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--cream),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(26,77,58,0.08),transparent)]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--cream)] dark:bg-white/5 dark:border-white/10 mb-10 animate-fade-in-up transition-smooth"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand)] opacity-40" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--brand)]" />
            </span>
            <span className="text-[var(--ink-muted)] dark:text-zinc-400 text-sm font-medium tracking-wide">
              Более 10 000 заказов в Беларуси
            </span>
          </div>

          {/* Headline — Nfinite-style: large, clean, one colour */}
          <h1
            className="mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-[var(--ink)] dark:text-white">
              Маркетплейс клининговых услуг
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl text-[var(--ink-muted)] dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            Найдите проверенных специалистов по уборке квартир, офисов
            и&nbsp;коммерческих помещений в&nbsp;Минске и&nbsp;по&nbsp;всей
            Беларуси
          </p>

          {/* CTA — solid green primary, outline secondary */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            <Link
              href="/client/order/create"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-[var(--brand)] hover:bg-[var(--brand-hover)] dark:bg-[var(--primary)] dark:hover:opacity-90 transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.98]"
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
              href="/performer/feed"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-lg text-[var(--brand)] dark:text-[var(--primary)] border-2 border-[var(--brand)] dark:border-[var(--primary)] hover:bg-[var(--accent)] dark:hover:bg-white/5 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg
                className="w-5 h-5"
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
            </Link>
          </div>

          {/* Auth */}
          <div
            className="flex flex-wrap justify-center gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-[var(--ink-muted)] dark:text-zinc-400 border border-[var(--border)] dark:border-white/10 hover:bg-[var(--cream)] dark:hover:bg-white/5 transition-colors"
            >
              Войти
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-[var(--brand)] dark:text-[var(--primary)] hover:underline transition-colors"
            >
              Регистрация
            </Link>
          </div>

          {/* Stats — минимально */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-16 animate-fade-in-up"
            style={{ animationDelay: "0.7s", animationFillMode: "both" }}
          >
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="text-center transition-transform duration-300 hover:scale-105"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[var(--brand)] dark:text-[var(--primary)] mb-1">
                  {stat.value}
                </div>
                <div className="text-[var(--ink-muted)] dark:text-zinc-500 text-sm tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <svg
          className="w-5 h-5 text-[var(--ink)] dark:text-white"
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
