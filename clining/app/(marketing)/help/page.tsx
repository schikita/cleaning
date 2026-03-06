import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Центр помощи",
  description:
    "Ответы на частые вопросы о сервисе ProЧисто: как оформить заказ, как стать исполнителем и как работает платформа.",
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
          Центр помощи
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Здесь собраны ответы на популярные вопросы о том, как оформить заказ,
          как стать исполнителем и как работает платформа ProЧисто.
        </p>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            Как оформить заказ
          </h2>
          <p className="text-sm text-muted-foreground">
            Перейдите в раздел &laquo;Заказать уборку&raquo;, укажите тип
            уборки, адрес, желаемую дату и бюджет. После подтверждения заказа
            исполнители смогут откликаться на него.
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            Как стать исполнителем
          </h2>
          <p className="text-sm text-muted-foreground">
            Зарегистрируйтесь как исполнитель, заполните профиль и проходите
            задания в ленте заказов. Репутация формируется на основе отзывов и
            выполненных заказов.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            Остались вопросы?
          </h2>
          <p className="text-sm text-muted-foreground">
            Если вы не нашли ответ на свой вопрос, напишите нам через раздел{" "}
            «Контакты» — мы постараемся помочь.
          </p>
        </section>
      </div>
    </div>
  );
}

