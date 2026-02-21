import React from "react";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

export const metadata = {
  title: {
    template: "%s | ProЧисто",
    default: "ProЧисто — маркетплейс клининговых услуг в Беларуси",
  },
  description:
    "Найдите проверенных специалистов по уборке квартир, офисов и коммерческих помещений в Минске и по всей Беларуси.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-1 flex flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
