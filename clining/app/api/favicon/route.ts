import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

/** Не кэшировать: всегда читать с диска (важно после замены в админке). */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Отдаёт текущую фавиконку с диска при каждом запросе (без кэша).
 * Так фавиконка всегда актуальна после замены в админке, в т.ч. в Docker.
 */
export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  let buffer: Buffer;
  let contentType: string;

  try {
    buffer = await readFile(path.join(publicDir, "favicon.ico"));
    contentType = "image/x-icon";
  } catch {
    try {
      buffer = await readFile(path.join(publicDir, "favicon.png"));
      contentType = "image/png";
    } catch {
      return new NextResponse(null, { status: 404 });
    }
  }

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Pragma": "no-cache",
    },
  });
}
