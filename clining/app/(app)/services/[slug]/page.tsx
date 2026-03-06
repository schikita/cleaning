import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SERVICE_PAGES: Record<
  string,
  { title: string; description: string; metaTitle: string }
> = {
  apartment: {
    title: "Уборка квартир",
    metaTitle: "Уборка квартир — Pro Чисто",
    description:
      "Генеральная и поддерживающая уборка квартир, мытьё окон, уборка после ремонта и переезда. Профессиональные клинеры с рейтингом и отзывами.",
  },
  office: {
    title: "Уборка офисов",
    metaTitle: "Уборка офисов — Pro Чисто",
    description:
      "Ежедневный клининг и комплексное обслуживание офисных и торговых помещений. Регулярная уборка по графику или разовые заказы.",
  },
  furniture: {
    title: "Химчистка мебели",
    metaTitle: "Химчистка мебели — Pro Чисто",
    description:
      "Глубокая чистка диванов, ковров, матрасов и мягкой мебели профессиональным оборудованием и средствами. Выезд на дом или в офис.",
  },
  windows: {
    title: "Мойка окон",
    metaTitle: "Мойка окон — Pro Чисто",
    description:
      "Мытьё окон, фасадов и витрин на любой высоте с использованием промышленного оборудования. Без разводов и царапин.",
  },
  renovation: {
    title: "Уборка после ремонта",
    metaTitle: "Уборка после ремонта — Pro Чисто",
    description:
      "Вывоз строительного мусора, удаление пыли, мойка всех поверхностей после отделочных работ. Подготовка помещения к заселению.",
  },
};

const VALID_SLUGS = new Set(Object.keys(SERVICE_PAGES));

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = SERVICE_PAGES[slug];
  if (!page) return { title: "Услуга — Pro Чисто" };
  return {
    title: page.metaTitle,
    description: page.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.has(slug)) notFound();

  const page = SERVICE_PAGES[slug];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 sm:py-16 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {page.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          {page.description}
        </p>
        <Button asChild size="lg" className="min-w-[200px]">
          <Link href="/client/order/create">Заказать услугу</Link>
        </Button>
      </div>
    </div>
  );
}
