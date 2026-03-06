"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const MobileNav = () => (
    <nav className="md:hidden border-b border-zinc-800 bg-zinc-950">
      <div className="px-4 py-2 space-y-1">
        <Link
          href="/admin"
          className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white font-medium"
          onClick={() => setMobileOpen(false)}
        >
          Админ-панель
        </Link>
        <Link
          href="/admin/profile"
          className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white"
          onClick={() => setMobileOpen(false)}
        >
          Профиль
        </Link>
        <Link
          href="/admin/orders"
          className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white"
          onClick={() => setMobileOpen(false)}
        >
          Заказы
        </Link>
        <Link
          href="/admin/users"
          className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white"
          onClick={() => setMobileOpen(false)}
        >
          Пользователи
        </Link>
        <Link
          href="/admin/favicon"
          className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white"
          onClick={() => setMobileOpen(false)}
        >
          Фавиконка
        </Link>
        <Link
          href="/"
          className="block rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          onClick={() => setMobileOpen(false)}
        >
          ← На главную
        </Link>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div>
          <div className="text-sm uppercase tracking-wide text-zinc-500">
            Админ-панель
          </div>
          <div className="text-xs text-zinc-500">Управление сервисом</div>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-100 hover:bg-zinc-800"
        >
          {mobileOpen ? "Закрыть" : "Меню"}
        </button>
      </header>
      {mobileOpen && <MobileNav />}

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-56 border-r border-zinc-800 p-4">
        <nav className="space-y-1">
          <Link
            href="/admin"
            className="block px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white font-medium"
          >
            Админ-панель
          </Link>
          <Link
            href="/admin/profile"
            className="block px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Профиль
          </Link>
          <Link
            href="/admin/orders"
            className="block px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Заказы
          </Link>
          <Link
            href="/admin/users"
            className="block px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Пользователи
          </Link>
          <Link
            href="/admin/favicon"
            className="block px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Фавиконка
          </Link>
          <Link
            href="/"
            className="block px-3 py-2 rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 mt-4"
          >
            ← На главную
          </Link>
        </nav>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
