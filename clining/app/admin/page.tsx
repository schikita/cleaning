import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Админ-панель</h1>
      <p className="mt-2 text-zinc-400">Панель управления ProЧисто</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
        <Link
          href="/admin/orders"
          className="block p-4 rounded-xl border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50 transition-colors"
        >
          <span className="font-medium">Заказы</span>
          <p className="text-sm text-zinc-400 mt-1">Управление заказами</p>
        </Link>
        <Link
          href="/admin/users"
          className="block p-4 rounded-xl border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50 transition-colors"
        >
          <span className="font-medium">Пользователи</span>
          <p className="text-sm text-zinc-400 mt-1">Управление пользователями</p>
        </Link>
      </div>
    </div>
  );
}
