import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const authSecret =
  process.env.AUTH_SECRET ||
  (process.env.NODE_ENV === "development"
    ? "dev-secret-change-in-production-min-32-chars"
    : undefined);

/**
 * The client-side login page calls the FastAPI backend directly,
 * then passes the resulting token + user data to NextAuth via signIn().
 * This avoids the Node.js → Python networking issue on Windows.
 */
const credentialsSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.string(),
  accessToken: z.string(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        id: { type: "text" },
        email: { type: "text" },
        name: { type: "text" },
        role: { type: "text" },
        accessToken: { type: "text" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        return {
          id: parsed.data.id,
          email: parsed.data.email,
          name: parsed.data.name,
          role: parsed.data.role,
          accessToken: parsed.data.accessToken,
        };
      },
    }),
  ],
  callbacks: {
    authorized() {
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) || "client";
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: authSecret,
  trustHost: true,
  pages: {
    signIn: "/login",
  },
});
