import NextAuth from "next-auth";
import { authConifg } from "~/config/auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth(authConifg);
