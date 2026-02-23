import { auth } from "@/auth";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!BACKEND_URL) {
    return NextResponse.json({ error: "Backend not configured" }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("avatar") as File | null;
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Файл не выбран" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json(
      { error: "Допустимы: JPG, PNG, WebP, GIF" },
      { status: 400 }
    );
  }

  try {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(
      `${BACKEND_URL}/api/v1/users/${session.user.id}/avatar`,
      {
        method: "POST",
        body: fd,
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.detail ?? "Ошибка загрузки" },
        { status: res.status }
      );
    }

    return NextResponse.json({ avatar: data.avatar, user: data });
  } catch (e) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
