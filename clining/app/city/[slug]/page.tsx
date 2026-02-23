import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/footer";

const CITIES: Record<string, { name: string; count: string }> = {
  минск: { name: "Минск", count: "1 200+ мастеров" },
  гомель: { name: "Гомель", count: "340+ мастеров" },
  "могилёв": { name: "Могилёв", count: "280+ мастеров" },
  могилев: { name: "Могилёв", count: "280+ мастеров" },
  витебск: { name: "Витебск", count: "250+ мастеров" },
  гродно: { name: "Гродно", count: "230+ мастеров" },
  брест: { name: "Брест", count: "220+ мастеров" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const normalized = decodeURIComponent(slug).toLowerCase();
  const city = CITIES[normalized];
  if (!city) return { title: "Город не найден" };
  return {
    title: `Клининг в ${city.name} — мастера по уборке | ProЧисто`,
    description: `Найдите проверенных мастеров по клинингу в ${city.name}. ${city.count} специалистов.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const normalized = decodeURIComponent(slug).toLowerCase();
  const city = CITIES[normalized];
  if (!city) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Клининг в {city.name}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            {city.count} — выбирайте проверенных специалистов
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center">
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Список мастеров по городу в разработке
            </p>
            <Link
              href="/performer/feed"
              className="inline-block text-[#00d2ff] hover:underline font-medium"
            >
              Перейти к ленте заказов →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
