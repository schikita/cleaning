import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Связаться с командой ProЧисто: поддержка, вопросы по платформе и сотрудничеству.",
};

export default function ContactsPage() {
  const { company } = siteConfig;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
          Контакты
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          По вопросам работы платформы, заказов и сотрудничества свяжитесь с нами
          любым удобным способом.
        </p>

        <div className="space-y-6">
          {company.email && (
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block">Email</span>
                <span className="font-medium text-foreground">{company.email}</span>
              </div>
            </a>
          )}
          {company.phone && (
            <a
              href={`tel:${company.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <Phone className="h-5 w-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block">Телефон</span>
                <span className="font-medium text-foreground">{company.phone}</span>
              </div>
            </a>
          )}
          {company.address?.streetAddress && (
            <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <MapPin className="h-5 w-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block">Адрес</span>
                <span className="font-medium text-foreground">
                  {[
                    company.address.streetAddress,
                    company.address.addressLocality,
                    company.address.addressRegion,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            </div>
          )}
        </div>

        {!company.email && !company.phone && (
          <p className="mt-6 text-sm text-muted-foreground">
            Контактные данные настраиваются в конфигурации сайта.
          </p>
        )}
      </div>
    </div>
  );
}
