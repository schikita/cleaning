export const siteConfig = {
  name: "Clining",
  description: "Заказ клининга онлайн: быстро, прозрачно, с подбором исполнителя.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  locale: "ru_RU",
  ogImage: "/og-cover.png",

  company: {
    legalName: "Clining",
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "",
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "",
    address: {
      streetAddress: "",
      addressLocality: "",
      addressRegion: "",
      postalCode: "",
      addressCountry: "",
    },
  },

  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
};
