"use client";

import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AvatarUpload } from "@/components/auth/AvatarUpload";
import { ArrowLeft } from "lucide-react";

export default function ClientProfilePage() {
  const { data: session } = useSession();
  const { user } = useUser();
  const displayName = user?.name || session?.user?.name || "Пользователь";
  const displayEmail = user?.email || session?.user?.email || "";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="container mx-auto max-w-md">
        <Link
          href="/client/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          В личный кабинет
        </Link>

        <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Профиль
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <AvatarUpload
              src={user?.avatar ?? session?.user?.image}
              fallback={displayName}
              size="lg"
            />
            <div className="text-center">
              <h2 className="font-semibold text-slate-900 dark:text-white">
                {displayName}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {displayEmail}
              </p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Нажмите на иконку камеры, чтобы изменить аватар
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
