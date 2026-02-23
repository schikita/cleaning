"use client";

import { useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/performer/dashboard";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <LoginForm callbackUrl={callbackUrl} showSignupLink={true} />
    </div>
  );
}
