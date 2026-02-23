"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  callbackUrl?: string;
  showSignupLink?: boolean;
  title?: string;
  /** Вариант для тёмной админ-панели — светлый текст на тёмном фоне */
  variant?: "default" | "dark";
}

const inputDark =
  "!bg-zinc-800 !border-zinc-600 !text-zinc-50 placeholder:!text-zinc-500 focus:!ring-zinc-500 focus:!border-zinc-500 [color-scheme:dark]";

/** Явные inline-стили — наивысший приоритет, гарантируют читаемость */
const inputDarkStyle: React.CSSProperties = {
  backgroundColor: "#27272a",
  color: "#fafafa",
  borderColor: "#52525b",
  WebkitTextFillColor: "#fafafa",
} as React.CSSProperties;

export function LoginForm({
  callbackUrl = "/performer/dashboard",
  showSignupLink = true,
  title = "Вход",
  variant = "default",
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Неверный email или пароль");
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Ошибка входа");
    } finally {
      setLoading(false);
    }
  }

  const isDark = variant === "dark";
  const titleClass = isDark ? "text-zinc-100" : "";
  const subClass = isDark ? "text-zinc-400" : "text-muted-foreground";
  const labelClass = isDark ? "text-zinc-300" : "";

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className={`text-2xl font-semibold ${titleClass}`}>{title}</h1>
        <p className={`mt-1 ${subClass}`}>Введите email и пароль</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className={`text-sm font-medium mb-1 block ${labelClass}`}>
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            autoComplete="email"
            className={variant === "dark" ? inputDark : undefined}
            style={variant === "dark" ? inputDarkStyle : undefined}
          />
        </div>
        <div>
          <label htmlFor="password" className={`text-sm font-medium mb-1 block ${labelClass}`}>
            Пароль
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className={variant === "dark" ? inputDark : undefined}
            style={variant === "dark" ? inputDarkStyle : undefined}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </Button>
      </form>
      {showSignupLink && (
        <p className="text-center text-sm text-muted-foreground">
          Нет аккаунта?{" "}
          <Link
            href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-primary hover:underline"
          >
            Регистрация
          </Link>
        </p>
      )}
    </div>
  );
}
