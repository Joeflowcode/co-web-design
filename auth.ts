import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import bcrypt from "bcryptjs";

const DEMO_USER = {
  id: "demo",
  name: "Demo User",
  email: "demo@executiveos.ai",
  password: bcrypt.hashSync("demo1234", 10),
  role: "demo" as const,
};

// In production, replace with Supabase or your DB lookup
async function getUser(email: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD_HASH;
  if (adminEmail && adminPassword && email === adminEmail) {
    return { id: "admin", name: "Admin", email: adminEmail, password: adminPassword, role: "admin" as const };
  }
  if (email === DEMO_USER.email) return DEMO_USER;
  return null;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = z.object({
          email: z.string().email(),
          password: z.string().min(4),
        }).safeParse(credentials);

        if (!parsed.success) return null;

        const user = await getUser(parsed.data.email);
        if (!user) return null;

        const valid = await bcrypt.compare(parsed.data.password, user.password);
        if (!valid) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? "user";
      return token;
    },
    session({ session, token }) {
      if (session.user) (session.user as { role?: string }).role = token.role as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET ?? "dev-secret-change-in-production",
});
