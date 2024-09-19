import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export const authConifg = { providers: [Credentials] } satisfies NextAuthConfig;
