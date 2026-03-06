import { redirect } from "next/navigation";

export default function ClientOrderCatchAllPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Любые странные URL вида /client/order/что‑угодно отправляем на создание заказа
  void params; // параметр не используется, но нужен для совместимости
  redirect("/client/order/create");
}

