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

// Mock data - replace with real API call
const mockOrders: Record<
  string,
  {
    id: string;
    title: string;
    description: string;
    service: string;
    status: "active" | "in_progress" | "completed" | "cancelled";
    budget: number;
    city: string;
    address: string;
    date: string;
    timeFrom: string;
    client: { name: string; rating: number; ordersCount: number };
    responsesCount: number;
    createdAt: string;
    extras: string[];
  }
> = {
  "1": {
    id: "1",
    title: "Генеральная уборка 3-комнатной квартиры",
    description:
      "После ремонта, удаление строительной пыли. Мытье окон, балкон, кухня, 2 санузла. Квартира 85 м² на пр. Независимости. Нужна качественная уборка с использованием профессиональных средств.",
    service: "Генеральная уборка",
    status: "active",
    budget: 450,
    city: "Минск",
    address: "пр. Независимости, 123",
    date: "2025-02-25",
    timeFrom: "10:00",
    client: { name: "Анна К.", rating: 4.9, ordersCount: 8 },
    responsesCount: 5,
    createdAt: "2025-02-20",
    extras: ["Мойка окон", "Уборка балкона", "Чистка кухни"],
  },
};

const statusConfig = {
  active: { label: "Поиск исполнителя", color: "bg-blue-100 text-blue-800" },
  in_progress: { label: "В работе", color: "bg-yellow-100 text-yellow-800" },
  completed: { label: "Выполнен", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Отменён", color: "bg-red-100 text-red-800" },
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = mockOrders[id];

  if (!order) {
    notFound();
  }

  const status = statusConfig[order.status];

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
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                      {order.budget} BYN
                    </div>
                    <div className="text-xs text-slate-400">
                      {order.responsesCount} откликов
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
                      {order.description}
                    </p>
                  </div>

                  {order.extras.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Дополнительно
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {order.extras.map((extra) => (
                          <span
                            key={extra}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                          >
                            {extra}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {order.city}, {order.address}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(order.date).toLocaleDateString("ru-RU")}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Clock className="w-4 h-4 text-slate-400" />
                      от {order.timeFrom}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <User className="w-4 h-4 text-slate-400" />
                      {order.service}
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
                    {order.client.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {order.client.name}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      {order.client.rating} · {order.client.ordersCount} заказов
                    </div>
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
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Заказ создан:{" "}
                  {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                </div>
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
