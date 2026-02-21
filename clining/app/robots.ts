import { siteConfig } from "@/lib/site-config";

export default function robots() {
  const base = siteConfig.url.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/client",
          "/performer",
          "/order",
          "/api",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
