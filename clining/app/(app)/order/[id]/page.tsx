import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Star,
  MessageSquare,
} from "lucide-react";
import { fetchOrderById } from "@/lib/backend-api";
import { SERVICE_META } from "@/components/order/flows";

const categoryLabel: Record<string, string> = {
  general: "Генеральная уборка",
  maintenance: "Поддерживающая уборка",
  renovation: "Уборка после ремонта",
  furniture: "Химчистка мебели",
  windows: "Мойка окон",
};

const statusConfig: Record<string, { label: string; color: string }> = {
  open: { label: "Поиск исполнителя", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
  active: { label: "Поиск исполнителя", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
  in_progress: { label: "В работе", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" },
  completed: { label: "Выполнен", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
  cancelled: { label: "Отменён", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" },
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await fetchOrderById(id);

  if (!order) {
    notFound();
  }

  const status = statusConfig[order.status] ?? statusConfig.open;
  const serviceLabel = categoryLabel[order.category] ?? SERVICE_META[order.category as keyof typeof SERVICE_META]?.title ?? order.category;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/client/dashboard"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к заказам
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Badge className={`${status.color} mb-3`}>
                      {status.label}
                    </Badge>
                    <CardTitle className="text-xl text-slate-900 dark:text-white">
                      {order.title}
                    </CardTitle>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                      {order.budget != null ? `${order.budget} BYN` : "Договорная"}
                    </div>
                    <div className="text-xs text-slate-400">
                      {(order.responses_count ?? 0)} откликов
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Описание
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {order.description || "—"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {order.city}, {order.address}
                    </div>
                    {order.date && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {new Date(order.date).toLocaleDateString("ru-RU")}
                      </div>
                    )}
                    {order.date && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {new Date(order.date).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <User className="w-4 h-4 text-slate-400" />
                      {serviceLabel}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Client info */}
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-900 dark:text-white">
                  Заказчик
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {(order.client?.name ?? "К")[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {order.client?.name ?? "Клиент"}
                    </div>
                    {(order.client?.rating ?? 0) > 0 && (
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        {order.client?.rating}
                      </div>
                    )}
                  </div>
                </div>
                <Button className="w-full gap-2 bg-cyan-600 hover:bg-cyan-700">
                  <MessageSquare className="w-4 h-4" />
                  Откликнуться
                </Button>
              </CardContent>
            </Card>

            {/* Order info */}
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardContent className="p-4">
                {order.created_at && (
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Заказ создан:{" "}
                    {new Date(order.created_at).toLocaleDateString("ru-RU")}
                  </div>
                )}
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  ID: #{order.id}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
