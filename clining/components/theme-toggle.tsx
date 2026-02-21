"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Переключить тему"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]"
      >
        {/* Заглушка, чтобы размер и DOM были стабильными */}
        <span className="h-5 w-5 opacity-0" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Переключить тему"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-slate-200" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  );
}
