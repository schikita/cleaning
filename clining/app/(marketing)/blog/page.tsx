import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Статьи и советы по уборке, клинингу и уходу за домом от ProЧисто.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
          Блог
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Здесь будут публиковаться статьи о клининге, советы по уборке и новости платформы.
          Раздел в разработке.
        </p>
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-6 text-center text-sm text-muted-foreground">
          Скоро здесь появятся первые материалы.
        </div>
      </div>
    </div>
  );
}
