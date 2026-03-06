import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности и обработки персональных данных сервиса Clining (ProЧисто).",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
          Политика конфиденциальности
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Настоящая Политика конфиденциальности описывает порядок обработки и
          защиты персональных данных Пользователей сервиса Clining (ProЧисто)
          (далее — «Сервис», «Мы»).
        </p>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            1. Оператор персональных данных
          </h2>
          <p className="text-sm text-muted-foreground">
            Оператором персональных данных является владелец Сервиса Clining
            (ProЧисто). Контактные данные для обращений по вопросам обработки
            персональных данных указаны на странице «Контакты».
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            2. Какие данные мы обрабатываем
          </h2>
          <p className="text-sm text-muted-foreground">
            В рамках использования Сервиса мы можем обрабатывать следующие
            категории данных:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>контактные данные: имя, email, номер телефона;</li>
            <li>данные аккаунта и профиля (роль, город, аватар и т.д.);</li>
            <li>информация о заказах и оказанных услугах;</li>
            <li>
              техническая информация: IP‑адрес, данные о устройстве и браузере,
              cookies, данные веб‑аналитики;
            </li>
            <li>история переписки со службой поддержки.</li>
          </ul>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            3. Цели обработки данных
          </h2>
          <p className="text-sm text-muted-foreground">
            Мы обрабатываем персональные данные для следующих целей:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>создание и ведение пользовательских аккаунтов;</li>
            <li>обеспечение работы Сервиса и функционала маркетплейса;</li>
            <li>обработка заказов и коммуникация между заказчиками и исполнителями;</li>
            <li>отправка сервисных уведомлений (о заказах, статусах, безопасности);</li>
            <li>улучшение работы Сервиса, аналитика и статистика;</li>
            <li>исполнение требований законодательства и защита прав Сервиса.</li>
          </ul>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            4. Cookies и аналитика
          </h2>
          <p className="text-sm text-muted-foreground">
            Мы используем файлы cookie и инструменты веб‑аналитики для
            корректной работы сайта, запоминания настроек и анализа
            использования Сервиса. Подробнее — в{" "}
            <a href="/cookies" className="text-primary underline underline-offset-2">
              Политике использования cookie
            </a>
            .
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            5. Передача третьим лицам
          </h2>
          <p className="text-sm text-muted-foreground">
            Мы не продаём и не передаём персональные данные третьим лицам, за
            исключением случаев:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>когда это необходимо для работы Сервиса (например, платёжные провайдеры);</li>
            <li>когда такая передача требуется по закону;</li>
            <li>когда Пользователь явно согласился на такую передачу.</li>
          </ul>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            6. Права пользователя
          </h2>
          <p className="text-sm text-muted-foreground">
            Пользователь имеет право запросить доступ к своим персональным
            данным, их исправление, обновление или удаление, а также отозвать
            согласие на обработку, если иное не противоречит законодательству.
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            7. Изменения политики
          </h2>
          <p className="text-sm text-muted-foreground">
            Мы можем обновлять настоящую Политику конфиденциальности. Актуальная
            версия всегда доступна на этой странице. Продолжение использования
            Сервиса означает согласие с новой редакцией Политики.
          </p>
        </section>

        <p className="text-xs text-muted-foreground">
          Если у вас есть вопросы по обработке персональных данных, напишите нам
          через форму обратной связи или по контактам, указанным на сайте.
        </p>
      </div>
    </div>
  );
}

