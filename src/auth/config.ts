import { compareSync } from "bcrypt-edge";
import { AuthError, type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Linkedin from "next-auth/providers/linkedin";
import { SignInFormSchema } from "~/app/(auth)/schemas";
import { getUserByEmail } from "~/lib/db/user";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      credits: number;
    } & DefaultSession["user"];
  }

  interface User {
    credits: number;
  }
}

export class PasswordNotSetException extends AuthError {
  name = "PasswordNotSetException";
  code = "PASSWORD_NOT_SET";
}

const credentials = Credentials({
  async authorize(credentials) {
    const validated = SignInFormSchema.safeParse({
      email: credentials.email,
      password: credentials.password,
    });
    if (validated.success) {
      const { email, password } = validated.data;
      const user = await getUserByEmail(email);
      if (!user) {
        return null;
      }
      if (user.password == null) {
        throw new PasswordNotSetException();
      }
      const passwordsMatch = compareSync(password, user.password);
      if (passwordsMatch) {
        return { id: user.id, email: user.email, credits: user.credits };
      }
    }
    return null;
  },
});

const github = Github({ allowDangerousEmailAccountLinking: true });
const google = Google({ allowDangerousEmailAccountLinking: true });
const linkedin = Linkedin({ allowDangerousEmailAccountLinking: true });

export const authConifg: Pick<NextAuthConfig, "providers"> = {
  providers: [credentials, github, google, linkedin],
};
