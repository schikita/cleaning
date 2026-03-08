"use client";

import { useState, useEffect } from "react";

type Order = {
  id: string;
  title: string;
  description?: string | null;
  budget: number | null;
  city: string;
  address: string;
  date: string | null;
  status: string;
  payment_status?: string;
  payment_amount?: number | null;
  payment_completed_at?: string | null;
  responses_count: number;
  client_id: string;
  performer_id?: string | null;
  client?: { name: string; email?: string } | null;
  performer?: { name: string; email?: string; phone?: string } | null;
  created_at?: string | null;
};

type OrderResponseItem = {
  id: string;
  order_id: string;
  performer_id: string;
  performer?: { name: string; email?: string; phone?: string } | null;
  created_at?: string | null;
};

const STATUS_LABELS: Record<string, string> = {
  open: "Принимает отклики",
  awaiting_payment: "Ожидает оплаты",
  in_progress: "В исполнении",
  completed: "Выполнен",
  cancelled: "Отменён",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, OrderResponseItem[]>>({});
  const [loadingResponses, setLoadingResponses] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, [filter]);

  async function loadOrders() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filter) params.set("status", filter);
      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Не удалось загрузить заказы");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  async function loadResponses(orderId: string) {
    if (responses[orderId]) return;
    setLoadingResponses(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/responses`);
      if (!res.ok) throw new Error("Ошибка");
      const data = await res.json();
      setResponses((prev) => ({ ...prev, [orderId]: data }));
    } catch {
      setResponses((prev) => ({ ...prev, [orderId]: [] }));
    } finally {
      setLoadingResponses(null);
    }
  }

  function toggleExpand(orderId: string) {
    if (expandedId === orderId) {
      setExpandedId(null);
    } else {
      setExpandedId(orderId);
      loadResponses(orderId);
    }
  }

  async function approvePerformer(orderId: string, performerId: string) {
    setActionLoading(`${orderId}-approve`);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ performer_id: performerId }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Ошибка");
      await loadOrders();
      setExpandedId(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setActionLoading(null);
    }
  }

  async function markPaid(orderId: string) {
    setActionLoading(`${orderId}-paid`);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/mark-paid`, {
        method: "POST",
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Ошибка");
      await loadOrders();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setActionLoading(null);
    }
  }

  async function sendInfo(orderId: string) {
    setActionLoading(`${orderId}-send`);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/send-info`, {
        method: "POST",
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Ошибка");
      await loadOrders();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setActionLoading(null);
    }
  }

  const calcCommission = (budget: number | null) => {
    if (budget == null) return 20;
    return budget > 150 ? budget * 0.05 : 20;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Заказы</h1>
      <p className="mt-1 text-zinc-400">
        Одобрение исполнителей, приём оплаты, отправка информации
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
        >
          <option value="">Все статусы</option>
          <option value="open">Принимает отклики</option>
          <option value="awaiting_payment">Ожидает оплаты</option>
          <option value="in_progress">В исполнении</option>
          <option value="completed">Выполнен</option>
          <option value="cancelled">Отменён</option>
        </select>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-900/30 border border-red-800 px-4 py-2 text-red-300 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="mt-6 text-zinc-400">Загрузка...</p>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-zinc-400">Заказов нет</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer hover:bg-zinc-800/50 transition-colors"
                onClick={() => toggleExpand(order.id)}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="font-medium text-zinc-100">{order.title}</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-sm text-zinc-400">
                      <span>{order.city}</span>
                      <span>•</span>
                      <span>
                        {order.budget != null
                          ? `${order.budget} BYN`
                          : "Договорная"}
                      </span>
                      <span>•</span>
                      <span>{order.responses_count} откликов</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === "open"
                          ? "bg-blue-900/50 text-blue-300"
                          : order.status === "awaiting_payment"
                            ? "bg-amber-900/50 text-amber-300"
                            : order.status === "in_progress"
                              ? "bg-green-900/50 text-green-300"
                              : "bg-zinc-700 text-zinc-300"
                      }`}
                    >
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                    <span className="text-zinc-500">▼</span>
                  </div>
                </div>
              </div>

              {expandedId === order.id && (
                <div className="border-t border-zinc-800 p-4 space-y-4">
                  <div className="text-sm text-zinc-400">
                    <p className="text-zinc-300">{order.description || "—"}</p>
                    <p className="mt-2">
                      Адрес: {order.city}, {order.address}
                    </p>
                    {order.client && (
                      <p className="mt-1">
                        Заказчик: {order.client.name}
                        {order.client.email && ` (${order.client.email})`}
                      </p>
                    )}
                  </div>

                  {order.status === "open" && order.responses_count > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-zinc-300 mb-2">
                        Отклики исполнителей
                      </h4>
                      {loadingResponses === order.id ? (
                        <p className="text-zinc-500 text-sm">Загрузка...</p>
                      ) : (
                        <div className="space-y-2">
                          {(responses[order.id] ?? []).map((r) => (
                            <div
                              key={r.id}
                              className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-3 py-2"
                            >
                              <div>
                                <span className="font-medium text-zinc-200">
                                  {r.performer?.name ?? "Исполнитель"}
                                </span>
                                {r.performer?.email && (
                                  <span className="ml-2 text-sm text-zinc-500">
                                    {r.performer.email}
                                  </span>
                                )}
                                {r.performer?.phone && (
                                  <span className="ml-2 text-sm text-zinc-500">
                                    {r.performer.phone}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() =>
                                  approvePerformer(order.id, r.performer_id)
                                }
                                disabled={
                                  actionLoading === `${order.id}-approve`
                                }
                                className="rounded-lg bg-cyan-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-cyan-500 disabled:opacity-50"
                              >
                                Одобрить
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {order.status === "awaiting_payment" && order.performer_id && (
                    <div>
                      <h4 className="text-sm font-medium text-zinc-300 mb-2">
                        Исполнитель одобрен
                      </h4>
                      <div className="rounded-lg bg-amber-900/20 border border-amber-800/50 p-4">
                        <p className="text-zinc-200">
                          {order.performer?.name ?? "Исполнитель"}
                        </p>
                        <p className="text-sm text-zinc-400 mt-1">
                          К оплате:{" "}
                          <strong className="text-amber-400">
                            {order.payment_amount ??
                              calcCommission(order.budget)}{" "}
                            BYN
                          </strong>
                          {order.budget != null && order.budget > 150 && (
                            <span className="text-zinc-500">
                              {" "}
                              (5% от {order.budget} BYN)
                            </span>
                          )}
                          {order.budget != null &&
                            order.budget <= 150 && (
                              <span className="text-zinc-500">
                                {" "}
                                (фикс. 20 BYN)
                              </span>
                            )}
                        </p>
                        <p className="text-xs text-zinc-500 mt-2">
                          После оплаты исполнителем нажмите «Оплата получена»,
                          затем «Выслать информацию».
                        </p>
                        <button
                          onClick={() => markPaid(order.id)}
                          disabled={actionLoading === `${order.id}-paid`}
                          className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 disabled:opacity-50"
                        >
                          Оплата получена
                        </button>
                      </div>
                    </div>
                  )}

                  {order.status === "awaiting_payment" &&
                    order.payment_status === "paid" && (
                      <div>
                        <p className="text-sm text-green-400 mb-2">
                          ✓ Оплата получена. Вышлите исполнителю полную
                          информацию (адрес, контакты заказчика и т.д.).
                        </p>
                        <button
                          onClick={() => sendInfo(order.id)}
                          disabled={actionLoading === `${order.id}-send`}
                          className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 disabled:opacity-50"
                        >
                          Выслать информацию исполнителю
                        </button>
                      </div>
                    )}

                  {order.status === "in_progress" && (
                    <p className="text-sm text-green-400">
                      Заказ в исполнении. Информация выслана исполнителю.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
