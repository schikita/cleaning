"use client";

import Link from "next/link";
import { AuthMenu } from "@/components/client/AuthMenu";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 bg-[var(--warm-white)]/95 dark:bg-[#0f1412]/95 backdrop-blur-md border-b border-[var(--border)] transition-colors duration-300 animate-slide-down"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-[var(--brand)] dark:text-[var(--primary)] transition-opacity duration-300 hover:opacity-90"
        >
          ProЧисто
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/performer/feed"
            className="text-sm text-[var(--ink-muted)] dark:text-zinc-400 hover:text-[var(--brand)] dark:hover:text-[var(--primary)] transition-colors duration-300"
          >
            Найти работу
          </Link>
          <Link
            href="/client/order/create"
            className="text-sm text-[var(--ink-muted)] dark:text-zinc-400 hover:text-[var(--brand)] dark:hover:text-[var(--primary)] transition-colors duration-300"
          >
            Создать заказ
          </Link>
        </nav>

        <AuthMenu />
      </div>
    </header>
  );
}
