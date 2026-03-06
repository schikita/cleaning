"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function YandexLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#FC3F1D" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fill="#fff"
        fontSize="11"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
      >
        Я
      </text>
    </svg>
  );
}

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
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  function handleOAuth(provider: "google" | "yandex") {
    setError("");
    void signIn(provider, { callbackUrl });
  }

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSendingCode(true);
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Не удалось отправить код");
        return;
      }
      setCodeSent(true);
    } catch {
      setError("Ошибка отправки кода");
    } finally {
      setSendingCode(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        ...(usePassword ? { password } : { code: code.trim() }),
        redirect: false,
      });
      if (res?.error) {
        setError(
          usePassword ? "Неверный email или пароль" : "Неверный код или истёк срок. Запросите новый."
        );
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
        <p className={`mt-1 ${subClass}`}>
          {codeSent ? "Введите код из письма" : "Вход по коду на email"}
        </p>
      </div>
      {variant !== "dark" && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="w-full flex items-center justify-center gap-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3.5 text-slate-700 dark:text-slate-200 font-medium shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-slate-300 dark:hover:border-slate-500 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <GoogleLogo className="h-6 w-6 shrink-0" />
            <span>Войти через Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("yandex")}
            className="w-full flex items-center justify-center gap-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3.5 text-slate-700 dark:text-slate-200 font-medium shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-slate-300 dark:hover:border-slate-500 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FC3F1D]/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <YandexLogo className="h-6 w-6 shrink-0" />
            <span>Войти через Яндекс</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <span className="h-px flex-1 bg-border" />
            <span>или по email</span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </div>
      )}
      {!codeSent ? (
        <form
          onSubmit={usePassword ? handleSubmit : handleSendCode}
          className="space-y-4"
        >
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
          {usePassword && (
            <div>
              <label htmlFor="password-first" className={`text-sm font-medium mb-1 block ${labelClass}`}>
                Пароль
              </label>
              <Input
                id="password-first"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={usePassword}
                autoComplete="current-password"
                className={variant === "dark" ? inputDark : undefined}
                style={variant === "dark" ? inputDarkStyle : undefined}
              />
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            type="submit"
            className="w-full"
            disabled={usePassword ? loading : sendingCode}
          >
            {usePassword
              ? loading ? "Вход..." : "Войти"
              : sendingCode ? "Отправка..." : "Получить код"}
          </Button>
          <button
            type="button"
            onClick={() => { setUsePassword(!usePassword); setError(""); }}
            className="text-xs text-muted-foreground hover:underline w-full"
          >
            {usePassword ? "Войти по коду на email" : "Войти по паролю"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {usePassword ? (
            <>
              <div>
                <label htmlFor="password" className={`text-sm font-medium mb-1 block ${labelClass}`}>
                  Пароль
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={usePassword}
                  autoComplete="current-password"
                  className={variant === "dark" ? inputDark : undefined}
                  style={variant === "dark" ? inputDarkStyle : undefined}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Для аккаунтов с паролем (backend / админ).
              </p>
            </>
          ) : (
            <div>
              <label htmlFor="code" className={`text-sm font-medium mb-1 block ${labelClass}`}>
                Код из письма
              </label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                required={!usePassword}
                className={variant === "dark" ? inputDark : undefined}
                style={variant === "dark" ? inputDarkStyle : undefined}
              />
              <p className="text-xs text-muted-foreground mt-1">Код действует 10 минут</p>
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {!usePassword && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => { setCodeSent(false); setCode(""); setError(""); }}
                >
                  Другой email
                </Button>
              )}
              <Button
                type="submit"
                className={usePassword ? "w-full" : "flex-1"}
                disabled={loading}
              >
                {loading ? "Вход..." : "Войти"}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => { setUsePassword(!usePassword); setError(""); }}
              className="text-xs text-muted-foreground hover:underline"
            >
              {usePassword ? "Войти по коду на email" : "Войти по паролю"}
            </button>
          </div>
        </form>
      )}
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
