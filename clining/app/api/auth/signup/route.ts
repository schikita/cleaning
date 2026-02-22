import { NextResponse } from "next/server";
import { createUser } from "@/lib/auth-users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Требуются email, password и name" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Пароль минимум 6 символов" },
        { status: 400 }
      );
    }
    const user = await createUser(email, password, name.trim(), "client");
    if (!user) {
      return NextResponse.json(
        { error: "Email уже зарегистрирован" },
        { status: 400 }
      );
    }
    return NextResponse.json({
      message: "Пользователь создан",
      email: user.email,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
