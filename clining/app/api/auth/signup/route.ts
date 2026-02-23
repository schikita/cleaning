import { NextResponse } from "next/server";
import { createUser } from "@/lib/auth-users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Требуются email, password и name" },
        { status: 400 }
      );
    }
    const userRole = role === "performer" ? "performer" : "client";
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Пароль минимум 6 символов" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;
    if (backendUrl) {
      // Регистрация через backend (PostgreSQL)
      const res = await fetch(`${backendUrl}/api/v1/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role: userRole,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        let errMsg = "Ошибка регистрации";
        if (typeof data.detail === "string") errMsg = data.detail;
        else if (Array.isArray(data.detail) && data.detail[0]?.msg) errMsg = data.detail[0].msg;
        else if (data.error) errMsg = data.error;
        return NextResponse.json({ error: errMsg }, { status: res.status });
      }
      return NextResponse.json({
        message: "Пользователь создан",
        email: data.email,
      });
    }

    // Fallback: локальный auth-users (без backend)
    const user = await createUser(email, password, name.trim(), userRole);
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
