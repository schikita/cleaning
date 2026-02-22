"use client";

import Link from "next/link";
import { AuthMenu } from "@/components/client/AuthMenu";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 animate-slide-down"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          ProЧисто
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/performer/feed"
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Найти работу
          </Link>
          <Link
            href="/client/order/create"
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Создать заказ
          </Link>
        </nav>

        <AuthMenu />
      </div>
    </header>
  );
}
