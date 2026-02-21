import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Clock,
  CheckCircle,
  RotateCcw,
  Star,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = {
  totalOrders: 12,
  activeOrders: 2,
  completedOrders: 10,
  totalSpent: 45000,
};

const activeOrders = [
  {
    id: "1",
    title: "Уборка квартиры перед новым годом",
    status: "active",
    budget: 4500,
    responses: 3,
  },
  {
    id: "2",
    title: "Ремонт крана на кухне",
    status: "in_progress",
    budget: 1200,
    performer: "Алексей С.",
  },
];

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 transition-colors duration-300">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Личный кабинет
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Управляйте вашими заказами
            </p>
          </div>
          <Link href="/client/order/create">
            <Button className="gap-2 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-500">
              <Plus className="h-4 w-4" />
              Создать заказ
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: RotateCcw,
              label: "Всего заказов",
              value: stats.totalOrders,
            },
            { icon: Clock, label: "Активных", value: stats.activeOrders },
            {
              icon: CheckCircle,
              label: "Выполнено",
              value: stats.completedOrders,
            },
            {
              icon: TrendingUp,
              label: "Потрачено",
              value: `${stats.totalSpent.toLocaleString()} Br`,
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="border-slate-200 dark:border-slate-700 dark:bg-slate-800"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <stat.icon className="h-4 w-4" />
                  <span className="text-xs">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Orders */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Clock className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  Активные заказы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {order.title}
                      </h3>
                      <Badge
                        variant={
                          order.status === "in_progress"
                            ? "default"
                            : "secondary"
                        }
                        className={cn(
                          order.status === "in_progress"
                            ? "bg-cyan-600 dark:bg-cyan-600"
                            : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
                        )}
                      >
                        {order.status === "in_progress" ? "В работе" : "Поиск"}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                      Бюджет: {order.budget.toLocaleString()} Br
                    </div>
                    {order.performer ? (
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        Исполнитель:{" "}
                        <span className="font-medium text-slate-900 dark:text-white">
                          {order.performer}
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {order.responses} отклика
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-900 dark:text-white">
                  Быстрые действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/client/order/create">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Новый заказ
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-700"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Мои отзывы
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
