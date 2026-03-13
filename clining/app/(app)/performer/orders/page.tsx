import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { fetchPerformerOrders } from "@/lib/backend-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, FileText } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  awaiting_payment: "Ожидает оплаты комиссии",
  in_progress: "В исполнении",
  completed: "Выполнен",
};

export default async function PerformerOrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/performer/orders");

  const orders = await fetchPerformerOrders(session.user.id);

  const activeOrders = orders.filter(
    (o) => o.status === "awaiting_payment" || o.status === "in_progress"
  );
  const completedOrders = orders.filter((o) => o.status === "completed");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/performer/dashboard"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад в дашборд
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Мои заказы
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Здесь отображаются заказы, на которые вы откликнулись и были одобрены.
          После оплаты комиссии админ вышлет полную информацию — она появится на
          этой странице.
        </p>

        {activeOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Активные заказы
            </h2>
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <Link key={order.id} href={`/performer/order/${order.id}`}>
                  <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-colors cursor-pointer">
                    <CardContent className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {order.title}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {order.city}
                            </span>
                            <span>
                              {order.budget != null
                                ? `${order.budget} BYN`
                                : "Договорная"}
                            </span>
                          </div>
                        </div>
                        <Badge
                          className={
                            order.status === "in_progress"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          }
                        >
                          {STATUS_LABELS[order.status] ?? order.status}
                        </Badge>
                      </div>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                        {order.description || "—"}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3 text-cyan-600 dark:text-cyan-400"
                      >
                        Подробнее →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {completedOrders.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Выполненные
            </h2>
            <div className="space-y-4">
              {completedOrders.map((order) => (
                <Link key={order.id} href={`/performer/order/${order.id}`}>
                  <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 opacity-90 hover:opacity-100 transition-opacity">
                    <CardContent className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {order.title}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {order.city} •{" "}
                            {order.budget != null
                              ? `${order.budget} BYN`
                              : "Договорная"}
                          </div>
                        </div>
                        <Badge className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                          Выполнен
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {orders.length === 0 && (
          <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800/50">
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                У вас пока нет одобренных заказов
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                Откликайтесь на заказы в ленте — после одобрения админом они
                появятся здесь
              </p>
              <Link href="/performer/feed">
                <Button className="mt-4">Найти заказы</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
