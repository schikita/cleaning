import { redirect } from "next/navigation";

export default function PerformerCatchAllPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  void params;
  // Неизвестные URL под /performer перенаправляем в дашборд исполнителя
  redirect("/performer/dashboard");
}

