import { NextResponse } from "next/server";
import { createUser } from "@/lib/auth-users";

/**
 * Создание учётной записи администратора (только для разработки).
 * POST /api/auth/create-admin
 * Body: { email: string, password: string, name: string }
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = await request.json();
    const { email, password, name } = body;
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Требуются email, password и name" },
        { status: 400 }
      );
    }
    const user = await createUser(email, password, name, "admin");
    if (!user) {
      return NextResponse.json(
        { error: "Email уже зарегистрирован" },
        { status: 400 }
      );
    }
    return NextResponse.json({
      message: "Админ создан",
      email: user.email,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
