"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function AuthMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <span className="text-sm text-muted-foreground">...</span>
      </div>
    );
  }

  if (session?.user) {
    const isAdmin = session.user.role === "admin";
    return (
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {session.user.email}
        </span>
        {isAdmin && (
          <Link href="/admin">
            <Button variant="outline" size="sm" className="border-amber-500/50 text-amber-600 dark:text-amber-400">
              Админ
            </Button>
          </Link>
        )}
        <Link href="/performer/dashboard">
          <Button variant="ghost" size="sm">
            Исполнитель
          </Button>
        </Link>
        <Link href="/client/dashboard">
          <Button variant="ghost" size="sm">
            Клиент
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Выйти
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <Link
        href="/performer/dashboard"
        className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hidden sm:block"
      >
        Исполнитель
      </Link>
      <Link
        href="/client/dashboard"
        className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hidden sm:block"
      >
        Клиент
      </Link>
    </div>
  );
}
