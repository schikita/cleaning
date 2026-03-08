import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

/**
 * Загрузка фавиконки: при наличии BACKEND_URL — на бэкенд (единый источник),
 * иначе — в локальный public (для dev без Docker).
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Необходима авторизация" }, { status: 401 });
  }
  const role = (session.user as { role?: string }).role;
  if (role !== "admin") {
    return NextResponse.json({ error: "Доступ только для администратора" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("favicon") as File | null;
  if (!file || !(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Выберите файл фавиконки" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Размер файла не более 2 МБ" },
      { status: 400 }
    );
  }

  const type = file.type.toLowerCase();
  const isIco =
    type === "image/x-icon" ||
    type === "image/vnd.microsoft.icon" ||
    (file.name && file.name.toLowerCase().endsWith(".ico"));
  const isPng = type === "image/png" || (file.name && file.name.toLowerCase().endsWith(".png"));

  if (!isIco && !isPng) {
    return NextResponse.json(
      { error: "Допустимые форматы: .ico или .png" },
      { status: 400 }
    );
  }

  const backendUrl = process.env.BACKEND_URL;
  if (backendUrl) {
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, "")}/api/v1/favicon`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return NextResponse.json(
          { error: (data as { detail?: string })?.detail ?? "Ошибка бэкенда" },
          { status: res.status }
        );
      }
      return NextResponse.json({
        success: true,
        path: "/favicon.ico",
        message: "Фавиконка сохранена",
      });
    } catch (e) {
      console.error("Favicon upload error:", e);
      return NextResponse.json(
        { error: "Не удалось сохранить файл" },
        { status: 500 }
      );
    }
  }

  // Fallback: сохранить в локальный public (dev без Docker)
  const publicDir = path.join(process.cwd(), "public");
  try {
    await mkdir(publicDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(publicDir, "favicon.ico"), buffer);
    await writeFile(path.join(publicDir, "favicon.png"), buffer);
    return NextResponse.json({
      success: true,
      path: "/favicon.ico",
      message: "Фавиконка сохранена",
    });
  } catch (e) {
    console.error("Favicon upload error:", e);
    return NextResponse.json(
      { error: "Не удалось сохранить файл" },
      { status: 500 }
    );
  }
}
