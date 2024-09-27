import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import schema from "~/drizzle/schema";
import { db } from "~/lib/db";
import { getUserById } from "~/lib/db/user";
import { authConifg } from "./config";

const mergedConfig = {
  pages: {
    signIn: "/signin",
    error: "/auth-error",
  },
  adapter: DrizzleAdapter(db, {
    // @ts-expect-error adapter is not typed correctly
    accountsTable: schema.account,
    // @ts-expect-error adapter is not typed correctly
    usersTable: schema.user,
  }),
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.credits && session.user) {
        session.user.credits = token.credits as number;
      }
      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) {
        return token;
      }
      const user = await getUserById(token.sub);
      if (!user) {
        return token;
      }
      token.credits = user.credits;
      return token;
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

export const user = async () => {
  return (await auth())?.user;
};
