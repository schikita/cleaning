import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUserByEmail, verifyPassword } from "@/lib/auth-users";

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
  password: z
    .string()
    .min(1, "Введите пароль")
    .min(6, "Пароль минимум 6 символов"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = getUserByEmail(email);
        if (!user || !(await verifyPassword(password, user.passwordHash)))
          return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    authorized() {
      // Разрешаем все — редиректы обрабатывает middleware
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) || "client";
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
