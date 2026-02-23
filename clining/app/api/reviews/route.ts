import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(req: NextRequest) {
  if (!BACKEND_URL) {
    return NextResponse.json({ error: "Backend not configured" }, { status: 500 });
  }
  const { searchParams } = new URL(req.url);
  const performerId = searchParams.get("performer_id");
  const limit = searchParams.get("limit") ?? "20";

  const params = new URLSearchParams();
  if (performerId) params.set("performer_id", performerId);
  params.set("limit", limit);

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/reviews?${params}`, {
      cache: "no-store",
    });
    if (!res.ok) return NextResponse.json([], { status: 200 });
    const data = await res.json();
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
