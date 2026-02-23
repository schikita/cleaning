import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl ?? "/admin";

  if (session?.user?.role === "admin") {
    redirect(callbackUrl);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <LoginForm
          callbackUrl={callbackUrl}
          showSignupLink={false}
          title="Вход в админ-панель"
          variant="dark"
        />
        <Link
          href="/"
          className="text-sm text-zinc-400 hover:text-zinc-300"
        >
          ← На главную
        </Link>
      </div>
    </div>
  );
}
