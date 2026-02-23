"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AvatarUpload } from "@/components/auth/AvatarUpload";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Award,
  CheckCircle,
  Edit,
} from "lucide-react";

const XP_PER_ORDER = 100;
const LEVELS = [
  { name: "Бронза", xpMin: 0, xpMax: 500 },
  { name: "Серебро", xpMin: 500, xpMax: 1500 },
  { name: "Золото", xpMin: 1500, xpMax: 3000 },
  { name: "Платина", xpMin: 3000, xpMax: Infinity },
];

function getLevelName(xp: number): string {
  const level = LEVELS.find((l) => xp >= l.xpMin && xp < l.xpMax);
  return level?.name ?? "Бронза";
}

const BADGE_COLORS: Record<string, string> = {
  "Проверен": "bg-emerald-100 text-emerald-800",
  "Топ исполнитель": "bg-yellow-100 text-yellow-800",
  "Быстрый отклик": "bg-blue-100 text-blue-800",
};

function getBadgeColor(label: string): string {
  return BADGE_COLORS[label] ?? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200";
}

function formatDate(s: string | null | undefined): string {
  if (!s) return "";
  const d = new Date(s);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

interface ReviewItem {
  id: string;
  author?: string;
  rating: number;
  text?: string | null;
  created_at?: string | null;
}

export default function PerformerProfile() {
  const { data: session } = useSession();
  const { user, refresh } = useUser();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const completedOrders = user?.completed_orders ?? 0;
  const xp = completedOrders * XP_PER_ORDER;
  const levelName = getLevelName(xp);
  const memberSince = user?.created_at ? new Date(user.created_at).getFullYear().toString() : "—";

  useEffect(() => {
    setBio(user?.bio ?? "");
  }, [user?.bio]);

  useEffect(() => {
    if (!user?.id) {
      setReviewsLoading(false);
      return;
    }
    fetch(`/api/reviews?performer_id=${encodeURIComponent(user.id)}&limit=20`)
      .then((res) => res.json())
      .then((data: ReviewItem[]) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]))
      .finally(() => setReviewsLoading(false));
  }, [user?.id]);

  const displayName = user?.name || session?.user?.name || "";
  const displayEmail = user?.email || session?.user?.email || "";
  const badges = user?.badges ?? [];

  const handleSaveBio = async () => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });
      if (res.ok) {
        await refresh();
        setEditing(false);
      }
    } catch {
      setEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-6 border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="shrink-0">
                <AvatarUpload
                  src={user?.avatar ?? session?.user?.image}
                  fallback={displayName}
                  size="lg"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {displayName}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      {user?.city && (
                        <>
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-500 dark:text-slate-400 text-sm">
                            {user.city}
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                        </>
                      )}
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        {levelName}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(!editing)}
                    className="border-slate-200 dark:border-slate-600 dark:text-white"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Редактировать
                  </Button>
                </div>

                {/* Badges */}
                {badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {badges.map((label) => (
                      <span
                        key={label}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getBadgeColor(label)}`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        {(user?.rating ?? 0).toFixed(1)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {reviews.length} отзывов
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">
                      {completedOrders}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Заказов
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">
                      {memberSince}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Год вступления
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Contacts */}
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-900 dark:text-white">
                  Контакты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user?.phone && (
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {user.phone}
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {displayEmail}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-900 dark:text-white">
                  Услуги
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(user?.services ?? []).length > 0 ? (
                  (user?.services ?? []).map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      {service}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Услуги не указаны
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-900 dark:text-white">
                  О себе
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editing ? (
                  <div className="space-y-3">
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-cyan-600 hover:bg-cyan-700"
                        onClick={handleSaveBio}
                      >
                        Сохранить
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setBio(user?.bio ?? "");
                          setEditing(false);
                        }}
                        className="dark:border-slate-600 dark:text-white"
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {bio || "Расскажите о себе в разделе «Редактировать»."}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-900 dark:text-white">
                  Отзывы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviewsLoading ? (
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Загрузка отзывов...
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Пока нет отзывов
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-slate-900 dark:text-white text-sm">
                          {review.author ?? "Аноним"}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                        {review.text ?? ""}
                      </p>
                      <div className="text-xs text-slate-400">
                        {formatDate(review.created_at)}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
