import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика использования cookie",
  description:
    "Политика использования файлов cookie на сайте сервиса Clining (ProЧисто).",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
          Политика использования cookie
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Настоящая Политика использования файлов cookie (далее — «Политика»)
          объясняет, какие типы cookie мы используем на сайте Clining (ProЧисто),
          для каких целей и как Пользователь может управлять настройками cookie.
        </p>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            1. Что такое cookie
          </h2>
          <p className="text-sm text-muted-foreground">
            Cookie — это небольшие текстовые файлы, которые сохраняются в
            браузере или на устройстве Пользователя при посещении сайта. Они
            позволяют распознавать браузер, запоминать настройки и улучшать
            работу Сервиса.
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            2. Какие cookie мы используем
          </h2>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>
              <span className="font-medium text-foreground">Технические (необходимые)</span>{" "}
              — обеспечивают работу сайта, авторизацию, безопасность и сохранение
              базовых настроек.
            </li>
            <li>
              <span className="font-medium text-foreground">Функциональные</span>{" "}
              — помогают запоминать ваши предпочтения (например, выбранную тему
              оформления).
            </li>
            <li>
              <span className="font-medium text-foreground">Аналитические</span>{" "}
              — позволяют собирать обезличенную статистику использования Сервиса
              для его улучшения.
            </li>
          </ul>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            3. Управление cookie
          </h2>
          <p className="text-sm text-muted-foreground">
            Вы можете в любой момент изменить настройки cookie в браузере:
            блокировать установку файлов cookie, удалять ранее сохранённые или
            настроить уведомления об их использовании.
          </p>
          <p className="text-sm text-muted-foreground">
            Обратите внимание: отключение технических cookie может привести к
            некорректной работе части функционала Сервиса.
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            4. Согласие на использование cookie
          </h2>
          <p className="text-sm text-muted-foreground">
            Продолжая использовать Сервис после появления баннера о cookie, вы
            соглашаетесь с использованием файлов cookie в соответствии с
            настоящей Политикой. Вы можете отозвать согласие, изменив настройки
            браузера и/или удалив cookie.
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            5. Обновления политики
          </h2>
          <p className="text-sm text-muted-foreground">
            Мы можем время от времени обновлять настоящую Политику. Актуальная
            версия всегда доступна на этой странице. Рекомендуем периодически
            её просматривать.
          </p>
        </section>

        <p className="text-xs text-muted-foreground">
          Если у вас есть вопросы по использованию cookie на нашем сайте,
          свяжитесь с нами по контактам, указанным на сайте.
        </p>
      </div>
    </div>
  );
}

