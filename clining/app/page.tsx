// app/(marketing)/page.tsx
import type { Metadata } from "next";
import HomeContentClient from "./home-content.client";

/* ── SEO Metadata ────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "ProЧисто — маркетплейс клининговых услуг в Беларуси",
  description:
    "Найдите проверенных специалистов по уборке квартир, офисов и коммерческих помещений в Минске и по всей Беларуси. Гарантия качества, безопасная оплата, рейтинги и отзывы.",
  keywords: [
    "клининг Минск",
    "уборка квартир Беларусь",
    "клининговые услуги",
    "уборка офисов Минск",
    "генеральная уборка",
    "химчистка мебели",
    "мойка окон Минск",
    "клининговая компания",
    "уборка после ремонта",
    "маркетплейс услуг Беларусь",
  ],
  openGraph: {
    title: "ProЧисто — маркетплейс клининговых услуг в Беларуси",
    description:
      "Найдите лучших специалистов по клинингу за несколько минут. Проверенные исполнители, безопасная оплата, гарантия качества.",
    type: "website",
    locale: "ru_BY",
    siteName: "ProЧисто",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://prochisto.by" },
};

/* ── JSON-LD Schema ──────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ProЧисто",
  alternateName: "Pro Чисто",
  url: "https://prochisto.by",
  description:
    "Маркетплейс клининговых услуг в Беларуси. Найдите проверенных специалистов по уборке квартир, офисов и коммерческих помещений.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://prochisto.by/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ProЧисто",
  description:
    "Маркетплейс клининговых услуг в Беларуси. Уборка квартир, офисов, химчистка мебели, мойка окон.",
  url: "https://prochisto.by",
  areaServed: { "@type": "Country", name: "Беларусь" },
  serviceType: [
    "Уборка квартир",
    "Уборка офисов",
    "Химчистка мебели",
    "Мойка окон",
    "Уборка после ремонта",
    "Промышленный клининг",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "10000",
    bestRating: "5",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <HomeContentClient />
    </>
  );
}
