import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  description:
    "Условия использования маркетплейса клининговых услуг Clining (ProЧисто).",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
          Пользовательское соглашение
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Настоящее Пользовательское соглашение (далее — «Соглашение»)
          регулирует порядок использования сервиса Clining (ProЧисто)
          (далее — «Сервис», «Мы») и заключено между администратором Сервиса и
          любым лицом, использующим Сервис (далее — «Пользователь»).
        </p>

        <section className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            1. Статус сервиса
          </h2>
          <p className="text-sm text-muted-foreground">
            1.1. Сервис является онлайн‑площадкой (маркетплейсом), которая
            позволяет заказчикам размещать запросы на клининговые услуги, а
            исполнителям — находить заказы и предлагать свои услуги.
          </p>
          <p className="text-sm text-muted-foreground">
            1.2. Сервис не является клининговой компанией, не выступает
            исполнителем услуг, а также не является стороной договоров между
            заказчиками и исполнителями. Ответственность за исполнение
            обязательств по таким договорам несут соответствующие стороны.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            2. Регистрация и аккаунт
          </h2>
          <p className="text-sm text-muted-foreground">
            2.1. Для полного использования Сервиса Пользователь проходит
            регистрацию и создаёт аккаунт, указывая достоверные данные.
          </p>
          <p className="text-sm text-muted-foreground">
            2.2. Пользователь несёт ответственность за сохранность логина и
            пароля, а также за все действия, совершённые в его аккаунте.
          </p>
          <p className="text-sm text-muted-foreground">
            2.3. Администрация вправе ограничить доступ или заблокировать
            аккаунт при нарушении Соглашения или действующего законодательства.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            3. Обязанности пользователей
          </h2>
          <p className="text-sm text-muted-foreground">
            3.1. Заказчики обязуются размещать только реальные заказы и
            предоставлять точную информацию об объекте уборки, объёме работ и
            иных условиях.
          </p>
          <p className="text-sm text-muted-foreground">
            3.2. Исполнители обязуются указывать достоверные сведения о себе и
            своих услугах, соблюдать договорённости с заказчиками и
            обеспечивать надлежащее качество услуг.
          </p>
          <p className="text-sm text-muted-foreground">
            3.3. Запрещается размещать недостоверную информацию, спам,
            оскорбления, материалы, нарушающие права третьих лиц или
            законодательство Республики Беларусь.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            4. Ответственность
          </h2>
          <p className="text-sm text-muted-foreground">
            4.1. Сервис предоставляет техническую возможность для взаимодействия
            заказчиков и исполнителей и не несёт ответственности за:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>качество и результат оказанных услуг;</li>
            <li>соблюдение сроков и условий выполнения работ;</li>
            <li>любой ущерб, причинённый в результате взаимоотношений между
              пользователями.</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            4.2. Пользователь несёт ответственность за свои действия при
            использовании Сервиса, в том числе за содержание размещаемой
            информации.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            5. Обработка персональных данных
          </h2>
          <p className="text-sm text-muted-foreground">
            5.1. Обработка персональных данных Пользователей осуществляется в
            соответствии с действующим законодательством и{" "}
            <a href="/privacy" className="text-primary underline underline-offset-2">
              Политикой конфиденциальности
            </a>
            .
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            6. Изменение условий
          </h2>
          <p className="text-sm text-muted-foreground">
            6.1. Мы вправе в любое время изменять условия настоящего
            Соглашения. Актуальная версия публикуется на этой странице.
          </p>
          <p className="text-sm text-muted-foreground">
            6.2. Продолжение использования Сервиса после внесения изменений
            означает согласие Пользователя с новой редакцией Соглашения.
          </p>
        </section>

        <p className="text-xs text-muted-foreground">
          Если у вас есть вопросы по условиям использования Сервиса, вы можете
          связаться с нами по контактам, указанным на сайте.
        </p>
      </div>
    </div>
  );
}

