import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { Draft } from "@/components/order/flows";
import { SERVICE_META } from "@/components/order/flows";

function buildDescription(draft: Draft): string {
  const parts: string[] = [];
  if (draft.service && draft.service in SERVICE_META) {
    parts.push(`Услуга: ${SERVICE_META[draft.service as keyof typeof SERVICE_META].title}`);
  }
  if (draft.service === "general") {
    parts.push(`Комнаты: ${draft.general.rooms}, санузлы: ${draft.general.bathrooms}`);
    if (draft.general.areaM2) parts.push(`Площадь: ${draft.general.areaM2} м²`);
  }
  if (draft.service === "maintenance") {
    parts.push(`Комнаты: ${draft.maintenance.rooms}, санузлы: ${draft.maintenance.bathrooms}`);
    if (draft.maintenance.areaM2) parts.push(`Площадь: ${draft.maintenance.areaM2} м²`);
    parts.push(`Периодичность: ${draft.maintenance.frequency}`);
  }
  if (draft.service === "renovation") {
    if (draft.renovation.areaM2) parts.push(`Площадь: ${draft.renovation.areaM2} м²`);
    parts.push(`Уровень пыли: ${draft.renovation.dustLevel}`);
  }
  if (draft.service === "furniture") {
    parts.push(`Предметов: ${draft.furniture.items.length}, материал: ${draft.furniture.material}`);
  }
  if (draft.service === "windows") {
    parts.push(`Тип: ${draft.windows.windowType}, кол-во: ${draft.windows.count}, стороны: ${draft.windows.sides}`);
  }
  parts.push(`Контакт: ${draft.contact.name}, ${draft.contact.phone}`);
  if (draft.contact.email) parts.push(`Email: ${draft.contact.email}`);
  if (draft.schedule.date && draft.schedule.timeFrom && draft.schedule.timeTo) {
    parts.push(`Дата: ${draft.schedule.date}, время: ${draft.schedule.timeFrom}–${draft.schedule.timeTo}`);
  }
  if (draft.address.comment) parts.push(`Комментарий: ${draft.address.comment}`);
  return parts.join("\n");
}

function buildAddress(draft: Draft): string {
  const { street, house, apartment } = draft.address;
  let addr = [street, house].filter(Boolean).join(", ");
  if (apartment) addr += `, кв. ${apartment}`;
  return addr || "—";
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Войдите в аккаунт для создания заказа" },
      { status: 401 }
    );
  }

  let draft: Draft;
  try {
    draft = await request.json();
  } catch {
    return NextResponse.json({ error: "Неверный формат данных" }, { status: 400 });
  }

  if (!draft.service || !draft.address?.city?.trim() || !draft.contact?.name?.trim() || !draft.contact?.phone?.trim()) {
    return NextResponse.json(
      { error: "Заполните обязательные поля: услуга, адрес, имя, телефон" },
      { status: 400 }
    );
  }

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend не настроен" },
      { status: 500 }
    );
  }

  const serviceTitle = draft.service in SERVICE_META
    ? SERVICE_META[draft.service as keyof typeof SERVICE_META].title
    : draft.service;

  const orderPayload = {
    title: serviceTitle,
    description: buildDescription(draft),
    category: draft.service,
    quality: "standard",
    budget: draft.budget?.amount ? parseFloat(String(draft.budget.amount).replace(/\s/g, "")) || null : null,
    address: buildAddress(draft),
    city: draft.address.city.trim(),
    date:
      draft.schedule?.date && draft.schedule?.timeFrom && draft.schedule?.timeTo
        ? new Date(`${draft.schedule.date}T${draft.schedule.timeFrom}:00`).toISOString()
        : null,
    client_id: session.user.id,
  };

  const accessToken = (session as any).accessToken;
  console.log(`[Proxy] Creating order for user ${session.user.id}. Token present: ${!!accessToken}`);
  console.log(`[Proxy] Backend URL: ${backendUrl}`);

  try {
    const res = await fetch(`${backendUrl.replace(/\/$/, "")}/api/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {})
      },
      body: JSON.stringify(orderPayload),
    });

    console.log(`[Proxy] Backend responded with status: ${res.status}`);
    const data = await res.json().catch(() => ({}));
    console.log(`[Proxy] Backend data:`, JSON.stringify(data));
    if (!res.ok) {
      return NextResponse.json(
        { error: (data as { detail?: string })?.detail ?? "Ошибка создания заказа" },
        { status: res.status }
      );
    }
    return NextResponse.json(data);
  } catch (e) {
    console.error("Order create error:", e);
    return NextResponse.json(
      { error: "Не удалось создать заказ" },
      { status: 500 }
    );
  }
}
