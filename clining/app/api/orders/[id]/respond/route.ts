import { auth } from "@/auth";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Войдите в аккаунт, чтобы откликнуться на заказ" },
      { status: 401 },
    );
  }

  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: "Backend не настроен" },
      { status: 500 },
    );
  }

  const { id: orderId } = await params;
  if (!orderId) {
    return NextResponse.json(
      { error: "Не указан ID заказа" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(
      `${BACKEND_URL.replace(/\/$/, "")}/api/v1/orders/${encodeURIComponent(orderId)}/respond`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ performer_id: session.user.id }),
      },
    );

    const data = (await res.json().catch(() => ({}))) as { detail?: string };
    if (!res.ok) {
      return NextResponse.json(
        { error: data.detail ?? "Не удалось откликнуться на заказ" },
        { status: res.status },
      );
    }
    return NextResponse.json({ ok: true, message: "Отклик отправлен" });
  } catch (e) {
    console.error("Order respond error:", e);
    return NextResponse.json(
      { error: "Не удалось откликнуться на заказ" },
      { status: 500 },
    );
  }
}
