import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import { authConifg } from "~/config/auth.config";
import { db } from "./db";

const mergedConfig = {
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(db),
  ...authConifg,
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(mergedConfig);
