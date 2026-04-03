import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { comparePassword, ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/auth";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.toString();
        const password = credentials.password.toString();

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return null; // No user found
        if (!user.password) return null; // OAuth only account

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.profilePicture,
        };
      },
    }),
    Credentials({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Admin Email", type: "email" },
        password: { label: "Admin Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        if (
          credentials.email === ADMIN_EMAIL &&
          credentials.password === ADMIN_PASSWORD
        ) {
          return { id: "admin", name: "Admin", email: ADMIN_EMAIL, role: "admin" } as any;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const email = user.email!;
          let existingUser = await prisma.user.findUnique({ where: { email } });

          if (existingUser) {
            if (!existingUser.googleId) {
              await prisma.user.update({
                where: { id: existingUser.id },
                data: { googleId: account.providerAccountId, profilePicture: user.image },
              });
            }
          } else {
            existingUser = await prisma.user.create({
              data: {
                name: user.name || "Google User",
                email: email,
                googleId: account.providerAccountId,
                profilePicture: user.image,
                isVerified: true,
              },
            });
          }
          return true;
        } catch (error: any) {
          console.error("Google signin error", error);
          return `/login?error=${encodeURIComponent(error.message || "Failed to sign in via Google")}`;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          const email = user.email!;
          const existingUser = await prisma.user.findUnique({ where: { email } });
          if (existingUser) {
            token.id = existingUser.id;
          } else {
            token.id = user.id;
          }
        } else {
          token.id = user.id;
        }
        token.role = (user as any).role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
