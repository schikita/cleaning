import { Footer } from "@/components/blocks/footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Header } from "@/components/blocks/Header";
import type { ReactNode } from "react";

export const metadata = {
  title: "Pro Чисто — клининг маркетплейс",
  description:
    "Площадка, где клиенты находят клинеров и мастеров, а специалисты получают заказы.",
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop showAfter={400} />
    </>
  );
}
