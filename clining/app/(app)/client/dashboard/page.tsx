import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { fetchClientOrders } from "@/lib/backend-api";
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
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  open: "Поиск",
  in_progress: "В работе",
  completed: "Выполнено",
  cancelled: "Отменён",
};

export default async function ClientDashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/client/dashboard");

  const orders = await fetchClientOrders(session.user.id);
  const totalOrders = orders.length;
  const activeOrders = orders.filter((o) =>
    ["open", "in_progress"].includes(o.status)
  );
  const completedOrders = orders.filter((o) => o.status === "completed");
  const totalSpent = completedOrders.reduce(
    (sum, o) => sum + (o.budget ?? 0),
    0
  );

  const stats = {
    totalOrders,
    activeOrdersCount: activeOrders.length,
    completedOrders: completedOrders.length,
    totalSpent,
  };
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
            { icon: Clock, label: "Активных", value: stats.activeOrdersCount },
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
                {activeOrders.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400 py-4">
                    Нет активных заказов
                  </p>
                ) : (
                  activeOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Link href={`/order/${order.id}`}>
                          <h3 className="font-semibold text-slate-900 dark:text-white hover:underline">
                            {order.title}
                          </h3>
                        </Link>
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
                          {statusLabel[order.status] ?? order.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Бюджет:{" "}
                        {order.budget != null
                          ? `${order.budget.toLocaleString()} Br`
                          : "По договорённости"}
                      </div>
                    </div>
                  ))
                )}
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
                <Link href="/client/profile">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-700"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Профиль
                  </Button>
                </Link>
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
