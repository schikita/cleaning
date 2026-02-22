import { siteConfig } from "@/lib/site-config";

export default function sitemap() {
  const base = siteConfig.url.replace(/\/+$/, "");
  const now = new Date();

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
