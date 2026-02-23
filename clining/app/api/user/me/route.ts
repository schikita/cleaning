import { auth } from "@/auth";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!BACKEND_URL) {
    return NextResponse.json(
      { user: { id: session.user.id, name: session.user.name, email: session.user.email, avatar: session.user.image } },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/v1/users/${session.user.id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return NextResponse.json({ error: "User not found" }, { status: 404 });
    const user = await res.json();
    return NextResponse.json(
      { user },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
