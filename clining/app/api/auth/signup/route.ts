import { NextResponse } from "next/server";
import { createUser, createUserWithoutPassword, getUserByEmail } from "@/lib/auth-users";
import { isValidCode } from "@/lib/auth-codes";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, role, code } = body;
    const hasCode = typeof code === "string" && code.trim().length >= 4;
    const hasPassword = typeof password === "string" && password.length >= 6;

    if (!email || !name) {
      return NextResponse.json(
        { error: "Требуются email и name" },
        { status: 400 }
      );
    }
    const userRole = role === "performer" ? "performer" : "client";
    const normalizedEmail = email.trim().toLowerCase();

    // Регистрация по коду (без пароля)
    if (hasCode) {
      if (!isValidCode(normalizedEmail, code)) {
        return NextResponse.json(
          { error: "Неверный или просроченный код. Запросите новый." },
          { status: 400 }
        );
      }
      if (getUserByEmail(normalizedEmail)) {
        return NextResponse.json(
          { error: "Email уже зарегистрирован" },
          { status: 400 }
        );
      }
      const user = createUserWithoutPassword(normalizedEmail, name.trim(), userRole);
      if (!user) {
        return NextResponse.json(
          { error: "Email уже зарегистрирован" },
          { status: 400 }
        );
      }
      return NextResponse.json({
        message: "Пользователь создан",
        email: user.email,
        loginByCode: true,
      });
    }

    // Регистрация с паролем (если backend или legacy)
    if (!hasPassword) {
      return NextResponse.json(
        { error: "Укажите код из письма (или пароль для старой регистрации)" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;
    if (backendUrl) {
      const res = await fetch(`${backendUrl}/api/v1/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: normalizedEmail,
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
  } catch {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
