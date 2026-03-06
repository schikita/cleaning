import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

type BackendOrder = {
  id: string;
  title: string;
  description?: string | null;
  budget: number | null;
  city: string;
  date?: string | null;
  created_at?: string | null;
  responses_count?: number;
  client?: {
    name: string;
    rating?: number;
  } | null;
};

export async function GET() {
  if (!BACKEND_URL) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/v1/orders?status=open&limit=100`,
      { cache: "no-store" },
    );
    if (!res.ok) return NextResponse.json([], { status: 200 });
    const data: BackendOrder[] = await res.json();

    const mapped = data.map((o) => ({
      id: o.id,
      title: o.title,
      description: o.description ?? "",
      category: "Клининг",
      serviceType: "regular" as const,
      budget: o.budget ?? 0,
      city: o.city,
      date: (o.date || o.created_at || null) as string | null,
      client: {
        name: o.client?.name || "Клиент",
        rating: o.client?.rating ?? 0,
      },
      responsesCount: o.responses_count ?? 0,
      urgent: false,
    }));

    return NextResponse.json(mapped, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

