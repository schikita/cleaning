import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Yandex from "next-auth/providers/yandex";
import { z } from "zod";
import { getUserByEmail, verifyPassword } from "@/lib/auth-users";
import { verifyAndConsumeCode } from "@/lib/auth-codes";

const authSecret =
  process.env.AUTH_SECRET ||
  (process.env.NODE_ENV === "development"
    ? "dev-secret-change-in-production-min-32-chars"
    : undefined);

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Введите email")
    .email("Некорректный email"),
  password: z.string().optional(),
  code: z.string().optional(),
});

async function syncOAuthUserWithBackend(user: {
  email?: string | null;
  name?: string | null;
  image?: string | null;
}) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl || !user.email) return null;

  const payload = {
    name: user.name || user.email,
    email: user.email.toLowerCase(),
    password: null,
    role: "client",
    avatar: user.image ?? null,
  };

  try {
    // Пытаемся создать пользователя
    const createRes = await fetch(`${backendUrl}/api/v1/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (createRes.ok) {
      return await createRes.json();
    }

    // Если уже существует — пробуем найти по email
    const detail = await createRes.json().catch(() => null);
    if (
      createRes.status === 400 &&
      detail &&
      typeof detail.detail === "string" &&
      detail.detail.toLowerCase().includes("email")
    ) {
      const listRes = await fetch(
        `${backendUrl}/api/v1/users?skip=0&limit=1000`,
      );
      if (listRes.ok) {
        const list = await listRes.json();
        const found = list.find(
          (u: { email?: string }) =>
            u.email && u.email.toLowerCase() === user.email!.toLowerCase(),
        );
        return found ?? null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    ...(process.env.YANDEX_CLIENT_ID && process.env.YANDEX_CLIENT_SECRET
      ? [
          Yandex({
            clientId: process.env.YANDEX_CLIENT_ID!,
            clientSecret: process.env.YANDEX_CLIENT_SECRET!,
          }),
        ]
      : []),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "Код", type: "text" },
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, code } = parsed.data;

        // Вход по коду из письма (без пароля)
        if (code && code.trim().length >= 4) {
          if (!verifyAndConsumeCode(email, code)) return null;
          const user = getUserByEmail(email);
          if (!user) return null;
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: undefined,
          };
        }

        // Резерв: вход по паролю (backend или старые пользователи с паролем)
        const password = parsed.data.password;
        if (!password) return null;

        const backendUrl = process.env.BACKEND_URL;
        if (backendUrl) {
          try {
            const res = await fetch(`${backendUrl}/api/v1/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });
            if (!res.ok) return null;
            const user = await res.json();
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              image: user.avatar,
            };
          } catch {
            return null;
          }
        }

        const user = getUserByEmail(email);
        if (!user || !(await verifyPassword(password, user.passwordHash)))
          return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: undefined,
        };
      },
    }),
  ],
  callbacks: {
    authorized() {
      // Разрешаем все — редиректы обрабатывает middleware
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        // OAuth-провайдеры: создаём/синхронизируем пользователя в backend
        if (account && account.provider !== "credentials") {
          const backendUser = await syncOAuthUserWithBackend({
            email: (user as { email?: string | null }).email,
            name: (user as { name?: string | null }).name,
            image: (user as { image?: string | null }).image,
          });
          if (backendUser) {
            token.id = backendUser.id;
            token.role = backendUser.role;
            token.picture =
              backendUser.avatar ??
              (user as { image?: string | null }).image ??
              null;
            return token;
          }
        }

        // По умолчанию — используем данные пользователя из провайдера
        token.id = (user as { id?: unknown }).id;
        token.role = (user as { role?: string | null }).role;
        token.picture = (user as { image?: string | null }).image ?? null;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) || "client";
        session.user.image = token.picture as string | null;
      }
      return session;
    },
  },
  secret: authSecret,
  trustHost: true,
  pages: {
    signIn: "/login",
  },
});
