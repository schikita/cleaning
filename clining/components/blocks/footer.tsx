import Link from "next/link";

const FOOTER_LINKS = {
  services: {
    title: "Услуги",
    links: [
      { label: "Уборка квартир", href: "/services/apartment" },
      { label: "Уборка офисов", href: "/services/office" },
      { label: "Химчистка мебели", href: "/services/furniture" },
      { label: "Мойка окон", href: "/services/windows" },
      { label: "Уборка после ремонта", href: "/services/renovation" },
    ],
  },
  cities: {
    title: "Города",
    links: [
      { label: "Минск", href: "/city/минск" },
      { label: "Гомель", href: "/city/гомель" },
      { label: "Могилёв", href: "/city/могилёв" },
      { label: "Витебск", href: "/city/витебск" },
      { label: "Гродно", href: "/city/гродно" },
      { label: "Брест", href: "/city/брест" },
    ],
  },
  company: {
    title: "Компания",
    links: [
      { label: "О платформе", href: "/about" },
      { label: "Как это работает", href: "/#how-it-works" },
      { label: "Для исполнителей", href: "/performer" },
      { label: "Блог", href: "/blog" },
      { label: "Контакты", href: "/contacts" },
    ],
  },
  support: {
    title: "Поддержка",
    links: [
      { label: "Центр помощи", href: "/help" },
      { label: "Безопасность", href: "/safety" },
      { label: "Условия использования", href: "/terms" },
      { label: "Политика конфиденциальности", href: "/privacy" },
      { label: "Политика использования cookie", href: "/cookies" },
    ],
  },
} as const;

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--cream)] dark:bg-[#0f1412] border-t border-[var(--border)]"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-[var(--brand)] dark:text-[var(--primary)]">
                ProЧисто
              </span>
            </Link>
            <p className="text-[var(--ink-muted)] dark:text-zinc-500 text-sm leading-relaxed max-w-[200px]">
              Маркетплейс клининговых услуг №1 в&nbsp;Беларуси
            </p>
          </div>

          {Object.values(FOOTER_LINKS).map((group) => (
            <div key={group.title}>
              <h4 className="text-[var(--ink)] dark:text-zinc-200 font-semibold text-sm mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--ink-muted)] dark:text-zinc-500 text-sm hover:text-[var(--brand)] dark:hover:text-[var(--primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[var(--ink-muted)] dark:text-zinc-500 text-sm">
            © {year} ProЧисто. Все права защищены.
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-[var(--ink-muted)] dark:text-zinc-500 text-sm hover:text-[var(--brand)] dark:hover:text-[var(--primary)] transition-colors"
            >
              Условия
            </Link>
            <Link
              href="/privacy"
              className="text-[var(--ink-muted)] dark:text-zinc-500 text-sm hover:text-[var(--brand)] dark:hover:text-[var(--primary)] transition-colors"
            >
              Конфиденциальность
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
export default Footer;
