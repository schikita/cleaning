"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Award,
  CheckCircle,
  Edit,
  Camera,
} from "lucide-react";

const profile = {
  name: "Александр Петров",
  rating: 4.9,
  reviewsCount: 87,
  completedOrders: 124,
  memberSince: "2022",
  level: "Золото",
  city: "Минск",
  phone: "+375 29 123-45-67",
  email: "alex@example.com",
  bio: "Профессиональный клинер с 5-летним опытом. Специализируюсь на генеральной уборке, уборке после ремонта и химчистке мебели. Использую экологически чистые средства.",
  services: [
    "Генеральная уборка",
    "Уборка после ремонта",
    "Химчистка мебели",
    "Мойка окон",
  ],
  badges: [
    { label: "Проверен", color: "bg-emerald-100 text-emerald-800" },
    { label: "Топ исполнитель", color: "bg-yellow-100 text-yellow-800" },
    { label: "Быстрый отклик", color: "bg-blue-100 text-blue-800" },
  ],
  reviews: [
    {
      id: "1",
      author: "Анна М.",
      rating: 5,
      text: "Отличная работа! Квартира сверкает. Очень аккуратный и пунктуальный.",
      date: "15 января 2025",
    },
    {
      id: "2",
      author: "Сергей К.",
      rating: 5,
      text: "Уборка после ремонта выполнена на высшем уровне. Рекомендую!",
      date: "3 января 2025",
    },
    {
      id: "3",
      author: "Мария В.",
      rating: 4,
      text: "Хорошая работа, всё чисто. Приду снова.",
      date: "28 декабря 2024",
    },
  ],
};

export default function PerformerProfile() {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(profile.bio);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-6 border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-3xl">
                  {profile.name[0]}
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                  <Camera className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {profile.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        {profile.city}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">
                        •
                      </span>
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        {profile.level}
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
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.badges.map((badge) => (
                    <span
                      key={badge.label}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        {profile.rating}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {profile.reviewsCount} отзывов
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">
                      {profile.completedOrders}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Заказов
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">
                      {profile.memberSince}
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
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {profile.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {profile.email}
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
                {profile.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {service}
                  </div>
                ))}
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
                        onClick={() => setEditing(false)}
                      >
                        Сохранить
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setBio(profile.bio);
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
                    {bio}
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
                {profile.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-slate-900 dark:text-white text-sm">
                        {review.author}
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
                      {review.text}
                    </p>
                    <div className="text-xs text-slate-400">{review.date}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
