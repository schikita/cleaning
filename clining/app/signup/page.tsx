"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, User } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [role, setRole] = useState<"client" | "performer">("client");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  const defaultRedirect = role === "performer" ? "/performer/dashboard" : "/client/dashboard";
  const callbackUrl = searchParams.get("callbackUrl") ?? defaultRedirect;

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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: email.trim(), role, code: code.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Ошибка регистрации");
        return;
      }
      const signInRes = await signIn("credentials", {
        email: email.trim(),
        code: code.trim(),
        redirect: false,
      });
      if (signInRes?.error) {
        setError("Регистрация прошла, но вход не удался. Войдите по коду на странице входа.");
        return;
      }
      if (avatarFile) {
        const fd = new FormData();
        fd.append("avatar", avatarFile);
        await fetch("/api/user/avatar", { method: "POST", body: fd });
      }
      const redirect = role === "performer" ? "/performer/dashboard" : "/client/dashboard";
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Регистрация</h1>
          <p className="text-muted-foreground mt-1">
            {codeSent ? "Введите код из письма" : "Вход по коду на email — пароль не нужен"}
          </p>
        </div>
        {!codeSent ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Регистрация как</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole("client")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition-colors ${
                    role === "client"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Клиент
                </button>
                <button
                  type="button"
                  onClick={() => setRole("performer")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition-colors ${
                    role === "performer"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  Исполнитель
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="avatar" className="text-sm font-medium mb-1 block">
                Аватар (необязательно)
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
            </div>
            <div>
              <label htmlFor="name" className="text-sm font-medium mb-1 block">Имя</label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium mb-1 block">Email</label>
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
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={sendingCode}>
              {sendingCode ? "Отправка..." : "Получить код"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="text-sm font-medium mb-1 block">Код из письма</label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Код действует 10 минут</p>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => { setCodeSent(false); setCode(""); setError(""); }}
              >
                Другой email
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Регистрация..." : "Зарегистрироваться"}
              </Button>
            </div>
          </form>
        )}
        <p className="text-center text-sm text-muted-foreground">
          Уже есть аккаунт?{" "}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-primary hover:underline"
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
