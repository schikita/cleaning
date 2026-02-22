import JsonLd from "@/components/server/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";

import { HomeContent } from "@/components/blocks/home-content";

function buildLocalBusinessJsonLd() {
  const c = siteConfig.company;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: c.legalName || siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    telephone: c.phone || undefined,
    email: c.email || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.address.streetAddress || undefined,
      addressLocality: c.address.addressLocality || undefined,
      addressRegion: c.address.addressRegion || undefined,
      postalCode: c.address.postalCode || undefined,
      addressCountry: c.address.addressCountry || undefined,
    },
  };
}

export default function MarketingHomePage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd()} />
      <HomeContent />
    </>
  );
}
