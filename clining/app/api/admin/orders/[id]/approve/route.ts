import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Необходима авторизация" }, { status: 401 });
  }
  const role = (session.user as { role?: string }).role;
  if (role !== "admin") {
    return NextResponse.json({ error: "Доступ только для администратора" }, { status: 403 });
  }
  if (!BACKEND_URL) {
    return NextResponse.json({ error: "Backend не настроен" }, { status: 500 });
  }
  const { id } = await params;
  let body: { performer_id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Неверный формат" }, { status: 400 });
  }
  if (!body.performer_id) {
    return NextResponse.json({ error: "Укажите performer_id" }, { status: 400 });
  }
  const res = await fetch(
    `${BACKEND_URL}/api/v1/orders/${encodeURIComponent(id)}/approve`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ performer_id: body.performer_id }),
    },
  );
  const data = (await res.json().catch(() => ({}))) as { detail?: string };
  if (!res.ok) {
    return NextResponse.json(
      { error: data.detail ?? "Ошибка одобрения" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
