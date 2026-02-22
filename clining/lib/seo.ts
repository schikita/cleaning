import { siteConfig } from "./site-config";

type AbsoluteUrlInput = string | null | undefined;

type SeoParams = {
  title?: string;
  description?: string;
  path?: string;
  images?: string[];
};

export function absoluteUrl(path: AbsoluteUrlInput) {
  const base = siteConfig.url.replace(/\/+$/, "");
  const p = (path || "").toString();

  if (!p) return base;
  if (p.startsWith("http://") || p.startsWith("https://")) return p;

  return `${base}${p.startsWith("/") ? "" : "/"}${p}`;
}

export function buildOpenGraph(params: SeoParams = {}) {
  const title = params.title || siteConfig.name;
  const description = params.description || siteConfig.description;
  const url = absoluteUrl(params.path || "/");
  const images = params.images && params.images.length ? params.images : [absoluteUrl(siteConfig.ogImage)];

  return {
    title,
    description,
    url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: images.map((u) => ({
      url: u,
      width: 1200,
      height: 630,
      alt: title,
    })),
  };
}

export function buildTwitter(params: SeoParams = {}) {
  const title = params.title || siteConfig.name;
  const description = params.description || siteConfig.description;
  const images = params.images && params.images.length ? params.images : [absoluteUrl(siteConfig.ogImage)];

  return {
    card: "summary_large_image",
    title,
    description,
    images,
  };
}
