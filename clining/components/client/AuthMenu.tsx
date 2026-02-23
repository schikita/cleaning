"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";

export function AuthMenu() {
  const { data: session, status } = useSession();
  const { user } = useUser();

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
    const displayName = user?.name || session.user.name || session.user.email || "Пользователь";
    const avatarSrc = user?.avatar ?? session.user.image ?? undefined;
    return (
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <Avatar
            size="sm"
            src={avatarSrc}
            fallback={displayName}
          />
          <span className="text-sm font-medium text-foreground max-w-[120px] truncate hidden sm:inline">
            {displayName}
          </span>
        </div>
        {isAdmin && (
          <Link href="/admin">
            <Button variant="outline" size="sm" className="border-amber-500/50 text-amber-600 dark:text-amber-400">
              Админ
            </Button>
          </Link>
        )}
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
