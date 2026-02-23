"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_URL = "http://localhost:8000";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // 1. Call FastAPI login directly from the browser
      const loginRes = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!loginRes.ok) {
        setError("Неверный email или пароль");
        return;
      }

      const loginData = await loginRes.json();
      const { access_token: accessToken, user } = loginData;

      // 2. Pass the user data to NextAuth (no separate /me call needed)
      const res = await signIn("credentials", {
        id: String(user.id),
        email: user.email,
        name: user.name,
        role: user.role,
        accessToken,
        redirect: false,
      });

      if (res?.error) {
        setError("Ошибка авторизации");
        return;
      }

      let destination = callbackUrl;
      if (!destination) {
        destination = user.role === "admin" ? "/admin" : "/performer/dashboard";
      }
      router.push(destination);
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("Ошибка входа. Проверьте подключение к серверу.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Вход</h1>
          <p className="text-muted-foreground mt-1">Введите email и пароль</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium mb-1 block">
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
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium mb-1 block">
              Пароль
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Вход..." : "Войти"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Нет аккаунта?{" "}
          <Link
            href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl ?? "")}`}
            className="text-primary hover:underline"
          >
            Регистрация
          </Link>
        </p>
      </div>
    </div>
  );
}
