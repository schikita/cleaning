"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Upload, Loader2 } from "lucide-react";

export default function AdminFaviconPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [faviconCacheBust, setFaviconCacheBust] = useState(() => Date.now());
  // Берём фавиконку через API (читается с диска без кэша), иначе после замены может показываться старая
  const faviconUrl = "/api/favicon";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setError("Выберите файл");
      return;
    }
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("favicon", file);
      const res = await fetch("/api/admin/favicon", { method: "POST", body: fd });
      const text = await res.text();
      let data: { error?: string; message?: string } = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setError(res.status === 403 ? "Доступ только для администратора" : `Ошибка ${res.status}`);
        return;
      }
      if (!res.ok) {
        setError(data.error ?? (res.status === 403 ? "Доступ только для администратора" : "Ошибка загрузки"));
        return;
      }
      setSuccess(data.message ?? "Фавиконка обновлена");
      setPreview(URL.createObjectURL(file));
      const bust = Date.now();
      setFaviconCacheBust(bust);
      // Обновить иконку во вкладке браузера, чтобы не показывала кэш
      const q = `?t=${bust}`;
      document.querySelectorAll('link[rel="icon"]').forEach((el) => {
        const link = el as HTMLLinkElement;
        if (link.href.includes("favicon")) link.href = `/api/favicon${q}`;
      });
      const shortcut = document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement | null;
      if (shortcut) shortcut.href = `/api/favicon${q}`;
      if (inputRef.current) inputRef.current.value = "";
    } catch {
      setError("Ошибка сети");
    } finally {
      setLoading(false);
    }
  }

  function handleChange() {
    const file = inputRef.current?.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Фавиконка сайта</h1>
      <Card className="max-w-xl border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Загрузка / замена фавиконки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-zinc-400">
            Загрузите файл в формате .ico или .png (рекомендуется 32×32 или 16×16). Текущая фавиконка будет заменена.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-zinc-500">Текущая фавиконка</span>
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Превью" className="w-8 h-8 object-contain" />
                ) : (
                  <>
                    <img
                      src={`${faviconUrl}?t=${faviconCacheBust}`}
                      alt=""
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                    <ImageIcon className="w-8 h-8 text-zinc-500 hidden" aria-hidden />
                  </>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                ref={inputRef}
                type="file"
                accept=".ico,image/x-icon,image/vnd.microsoft.icon,.png,image/png"
                onChange={handleChange}
                className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-700 file:text-zinc-100 file:font-medium hover:file:bg-zinc-600"
              />
            </div>
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-400">{success}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-600 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Загрузка…
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Заменить фавиконку
                </>
              )}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
