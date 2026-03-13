import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(request: NextRequest) {
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
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  params.set("limit", "200");
  const res = await fetch(
    `${BACKEND_URL}/api/v1/orders?${params.toString()}`,
    { cache: "no-store" },
  );
  if (!res.ok) {
    return NextResponse.json({ error: "Ошибка загрузки заказов" }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
