import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "О платформе",
  description:
    "ProЧисто — маркетплейс клининговых услуг в Беларуси. Связываем клиентов и исполнителей для уборки квартир, офисов и других услуг.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
          О платформе
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          ProЧисто — это маркетплейс клининговых услуг, где заказчики находят
          проверенных исполнителей для уборки квартир, офисов, химчистки мебели,
          мытья окон и уборки после ремонта. Мы помогаем клиентам быстро оформить
          заказ с понятной ценой, а исполнителям — получать заказы и развивать рейтинг.
        </p>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            Как это устроено
          </h2>
          <p className="text-sm text-muted-foreground">
            Клиент создаёт заказ, указывает тип уборки, бюджет и дату. Исполнители
            видят заказы в ленте и откликаются. После выполнения заказа стороны
            оставляют отзывы — так формируется репутация и рейтинг.
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            Для кого платформа
          </h2>
          <p className="text-sm text-muted-foreground">
            Для частных лиц и компаний, которым нужна уборка или клининг, и для
            клинеров и мастеров, которые хотят получать заказы и работать по всей Беларуси.
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/#how-it-works">Как это работает</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/performer/register">Стать исполнителем</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
