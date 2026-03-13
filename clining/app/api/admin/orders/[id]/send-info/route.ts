import { auth } from "@/auth";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function POST(
  _request: Request,
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
  const res = await fetch(
    `${BACKEND_URL}/api/v1/orders/${encodeURIComponent(id)}/send-info`,
    { method: "POST" },
  );
  const data = (await res.json().catch(() => ({}))) as { detail?: string };
  if (!res.ok) {
    return NextResponse.json(
      { error: data.detail ?? "Ошибка" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
