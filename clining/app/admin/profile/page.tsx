"use client";

import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarUpload } from "@/components/auth/AvatarUpload";

export default function AdminProfilePage() {
  const { data: session } = useSession();
  const { user } = useUser();

  const displayName =
    user?.name || session?.user?.name || session?.user?.email || "Администратор";
  const displayEmail = user?.email || session?.user?.email || "";
  const avatarSrc = user?.avatar ?? session?.user?.image ?? null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Профиль администратора</h1>
      <Card className="max-w-xl border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Ваш аватар</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <AvatarUpload src={avatarSrc} fallback={displayName} size="lg" />
            <div className="space-y-1">
              <div className="text-lg font-semibold text-zinc-50">
                {displayName}
              </div>
              {displayEmail && (
                <div className="text-sm text-zinc-400">{displayEmail}</div>
              )}
              <p className="text-xs text-zinc-500">
                Загрузите изображение, чтобы обновить свой аватар в системе.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

