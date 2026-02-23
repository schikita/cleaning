import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const protectedPaths = [
    "/performer/dashboard",
    "/performer/profile",
    "/client/dashboard",
    "/client/profile",
  ];

  const isProtected = protectedPaths.some((p) =>
    pathname === p || pathname.startsWith(`${p}/`)
  );

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === "/login" || pathname === "/signup") && isLoggedIn) {
    const role = req.auth?.user?.role;
    const dashboard = role === "performer" ? "/performer/dashboard" : "/client/dashboard";
    return NextResponse.redirect(new URL(dashboard, req.url));
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const role = req.auth?.user?.role;
    if (!isLoggedIn || role !== "admin") {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/admin/login" && isLoggedIn) {
    const role = req.auth?.user?.role;
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  // Исключаем /admin/login — страница обрабатывает сама (редирект админа в page)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|fonts|admin/login|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
