import { redirect } from "next/navigation";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }> | { callbackUrl?: string };
}) {
  const params = await (searchParams instanceof Promise ? searchParams : Promise.resolve(searchParams));
  const callbackUrl = params?.callbackUrl || "/admin";
  redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
}
