import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

export const metadata = {
  title: "Стать исполнителем — Pro Чисто",
  description: "Зарегистрируйтесь как исполнитель и получайте заказы на клининг.",
};

export default async function PerformerRegisterPage() {
  const session = await auth();
  if (session?.user?.id) redirect("/performer/dashboard");

  const signupUrl = "/signup?callbackUrl=" + encodeURIComponent("/performer/dashboard");
  const loginUrl = "/login?callbackUrl=" + encodeURIComponent("/performer/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-sm">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
            <Briefcase className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Стать исполнителем</h1>
          <p className="mt-2 text-muted-foreground">
            Зарегистрируйтесь или войдите в аккаунт, чтобы получать заказы на уборку и управлять профилем исполнителя.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="flex-1 sm:flex-initial">
              <Link href={signupUrl}>Зарегистрироваться</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1 sm:flex-initial">
              <Link href={loginUrl}>Войти</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
