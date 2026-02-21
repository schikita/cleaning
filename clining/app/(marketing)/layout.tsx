import React from "react";

import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";

import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/footer";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: buildOpenGraph({ path: "/" }),
  twitter: buildTwitter({ path: "/" }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: absoluteUrl("/favicon.ico") },
      { url: absoluteUrl("/favicon.png"), type: "image/png" },
    ],
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
