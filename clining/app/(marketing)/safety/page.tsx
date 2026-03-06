import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Безопасность",
  description:
    "Как ProЧисто заботится о безопасности клиентов и исполнителей: проверка исполнителей, защита данных и безопасная оплата.",
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
          Безопасность
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Мы уделяем особое внимание безопасности клиентов и исполнителей.
          Платформа помогает прозрачно договариваться об условиях, хранит
          историю заказов и обеспечивает удобную коммуникацию.
        </p>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            Проверка исполнителей
          </h2>
          <p className="text-sm text-muted-foreground">
            Исполнители формируют рейтинг на основе выполненных заказов и
            отзывов клиентов. Обращайте внимание на рейтинг, опыт и описание
            профиля при выборе специалиста.
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            Защита данных
          </h2>
          <p className="text-sm text-muted-foreground">
            Личные данные обрабатываются в соответствии с нашей Политикой
            конфиденциальности. Мы не передаем контактную информацию третьим
            лицам без вашего согласия.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            Безопасное общение
          </h2>
          <p className="text-sm text-muted-foreground">
            Не передавайте данные банковских карт и пароли в чате с
            исполнителями. Все важные детали заказа фиксируйте в описании
            заказа на платформе.
          </p>
        </section>
      </div>
    </div>
  );
}

