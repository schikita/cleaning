import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <aside className="w-56 border-r border-zinc-800 p-4">
        <nav className="space-y-1">
          <Link
            href="/admin"
            className="block px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white font-medium"
          >
            Админ-панель
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
