"use client";

import Image from "next/image";

type Variant = "hero" | "cta" | "trust" | "soft";

const BACKGROUND_IMAGES: Record<Variant, string> = {
  hero:
    "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1920&q=80",
  cta:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  trust:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
  soft:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80",
};

interface AbstractBackgroundProps {
  variant?: Variant;
  className?: string;
}

export function AbstractBackground({ variant = "hero", className = "" }: AbstractBackgroundProps) {
  const imageSrc = BACKGROUND_IMAGES[variant];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Фоновое фото: размытое + затемнение для читаемости */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover scale-105"
          sizes="100vw"
          priority={variant === "hero"}
          unoptimized={false}
        />
        <div
          className="absolute inset-0 bg-[var(--warm-white)]/85 dark:bg-[#0f1412]/90"
          aria-hidden
        />
        {/* Дополнительный градиент для плавности */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--warm-white)]/20 to-[var(--warm-white)]/80 dark:via-[#0f1412]/30 dark:to-[#0f1412]/95"
          aria-hidden
        />
      </div>

      {/* Размытые градиентные орбы поверх фото — плавное движение */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[80vmin] h-[80vmin] rounded-full opacity-25 dark:opacity-15 blur-[80px] animate-float"
        style={{
          background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[40%] -right-[15%] w-[60vmin] h-[60vmin] rounded-full opacity-20 dark:opacity-10 blur-[70px] animate-float-reverse"
        style={{
          background: "radial-gradient(circle, var(--brand-muted) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-[10%] left-[20%] w-[50vmin] h-[50vmin] rounded-full opacity-15 dark:opacity-10 blur-[60px] animate-float-slow"
        style={{
          background: "radial-gradient(circle, var(--brand) 0%, transparent 65%)",
        }}
      />

      {/* Чёткие геометрические формы (лёгкий 3D) */}
      <div
        className="absolute top-[15%] right-[10%] w-32 h-32 md:w-48 md:h-48 rounded-2xl border border-[var(--border)]/50 dark:border-white/10 opacity-40"
        style={{
          transform: "perspective(800px) rotateY(-15deg) rotateX(5deg)",
          background: "linear-gradient(135deg, var(--cream) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-[25%] left-[5%] w-24 h-24 md:w-36 md:h-36 rounded-full border border-[var(--border)]/40 dark:border-white/10 opacity-30"
        style={{
          transform: "perspective(600px) rotateY(10deg)",
          background: "radial-gradient(circle at 30% 30%, var(--accent), transparent)",
        }}
      />

      {variant === "hero" && (
        <>
          <div
            className="absolute top-[60%] right-[25%] w-20 h-20 rounded-lg opacity-20"
            style={{
              transform: "perspective(500px) rotateZ(-12deg) rotateY(8deg)",
              background: "linear-gradient(145deg, var(--accent), transparent)",
              border: "1px solid var(--border)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--ink) 0.5px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </>
      )}

      {variant === "cta" && (
        <>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full opacity-10 blur-[100px]"
            style={{
              background: "radial-gradient(circle, var(--brand) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full border border-white/10 opacity-20"
            style={{
              transform: "perspective(400px) rotateY(-20deg)",
              background: "radial-gradient(circle, white 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {variant === "trust" && (
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(var(--brand) 1px, transparent 1px),
                             linear-gradient(90deg, var(--brand) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      )}

      {variant === "soft" && (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,var(--accent)/0.3,transparent)]"
        />
      )}
    </div>
  );
}
