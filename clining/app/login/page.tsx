"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/performer/dashboard";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Анимированный градиентный фон */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-[40%] animate-[spin_40s_linear_infinite] bg-[conic-gradient(at_top,#22d3ee,#6366f1,#ec4899,#22d3ee)] opacity-30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.5),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.7),transparent_55%)]" />
      </div>

      {/* Эффект под курсором */}
      <MouseGlow />

      {/* Контент */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <LoginForm callbackUrl={callbackUrl} showSignupLink={true} />
      </div>
    </div>
  );
}

function MouseGlow() {
  if (typeof window === "undefined") return null;
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(56,189,248,0.18), transparent 60%)`,
        mixBlendMode: "screen",
      }}
    />
  );
}
