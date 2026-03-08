import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

/** Не кэшировать: всегда читать с диска (важно после замены в админке). */
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
  "Pragma": "no-cache",
};

/**
 * Отдаёт фавиконку: сначала с бэкенда (единый источник для админки и Swagger),
 * при 404 — из локального public (fallback).
 */
export async function GET() {
  const backendUrl = process.env.BACKEND_URL;
  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, "")}/static/favicon/favicon.ico`, {
        cache: "no-store",
      });
      if (res.ok) {
        const buf = await res.arrayBuffer();
        return new NextResponse(buf, {
          headers: {
            "Content-Type": "image/x-icon",
            ...NO_CACHE,
          },
        });
      }
      const resPng = await fetch(`${backendUrl.replace(/\/$/, "")}/static/favicon/favicon.png`, {
        cache: "no-store",
      });
      if (resPng.ok) {
        const buf = await resPng.arrayBuffer();
        return new NextResponse(buf, {
          headers: {
            "Content-Type": "image/png",
            ...NO_CACHE,
          },
        });
      }
    } catch {
      /* fallback to local */
    }
  }

  const publicDir = path.join(process.cwd(), "public");
  try {
    const buffer = await readFile(path.join(publicDir, "favicon.ico"));
    return new NextResponse(new Uint8Array(buffer), {
      headers: { "Content-Type": "image/x-icon", ...NO_CACHE },
    });
  } catch {
    try {
      const buffer = await readFile(path.join(publicDir, "favicon.png"));
      return new NextResponse(new Uint8Array(buffer), {
        headers: { "Content-Type": "image/png", ...NO_CACHE },
      });
    } catch {
      return new NextResponse(null, { status: 404 });
    }
  }
}
