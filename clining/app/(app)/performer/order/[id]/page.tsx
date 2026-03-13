import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { fetchOrderById, fetchPerformerOrders } from "@/lib/backend-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { SERVICE_META } from "@/components/order/flows";

const categoryLabel: Record<string, string> = {
  general: "Генеральная уборка",
  maintenance: "Поддерживающая уборка",
  renovation: "Уборка после ремонта",
  furniture: "Химчистка мебели",
  windows: "Мойка окон",
};

const statusConfig: Record<string, { label: string; color: string }> = {
  awaiting_payment: {
    label: "Ожидает оплаты комиссии",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  },
  in_progress: {
    label: "В исполнении",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  completed: {
    label: "Выполнен",
    color: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  },
};

export default async function PerformerOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) notFound();

  const { id } = await params;
  const order = await fetchOrderById(id);

  if (!order) notFound();

  // Проверяем, что заказ назначен текущему исполнителю
  const performerOrders = await fetchPerformerOrders(session.user.id);
  const isMyOrder = performerOrders.some((o) => o.id === id);
  if (!isMyOrder) notFound();

  const status = statusConfig[order.status] ?? statusConfig.awaiting_payment;
  const serviceLabel =
    categoryLabel[order.category] ??
    SERVICE_META[order.category as keyof typeof SERVICE_META]?.title ??
    order.category;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/performer/orders"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к моим заказам
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
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
                      {order.budget != null
                        ? `${order.budget} BYN`
                        : "Договорная"}
                    </div>
                    <div className="text-xs text-slate-400">{serviceLabel}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Описание
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {order.description || "—"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>
                        {order.city}, {order.address}
                      </span>
                    </div>
                    {order.date && (
                      <>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                          {new Date(order.date).toLocaleDateString("ru-RU")}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                          {new Date(order.date).toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Контакты заказчика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {order.client?.name ?? "Клиент"}
                  </p>
                  {order.client?.email && (
                    <a
                      href={`mailto:${order.client.email}`}
                      className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {order.client.email}
                    </a>
                  )}
                  {order.client?.phone && (
                    <a
                      href={`tel:${order.client.phone}`}
                      className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      {order.client.phone}
                    </a>
                  )}
                  {!order.client?.email && !order.client?.phone && (
                    <p className="text-sm text-slate-500">
                      Контакты в описании заказа
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {order.status === "awaiting_payment" && (
              <Card className="border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/20">
                <CardContent className="p-4">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Оплатите комиссию и сообщите админу. После подтверждения
                    оплаты полная информация о заказе будет доступна здесь.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
