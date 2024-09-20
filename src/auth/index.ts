import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import { db } from "../lib/db";
import { authConifg } from "./config";

const mergedConfig = {
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  ...authConifg,
} satisfies NextAuthConfig;

export const {
  auth,
  handlers,
  signIn: naSignIn,
  signOut: naSignOut,
} = NextAuth(mergedConfig);
