import bcrypt from "bcryptjs";
import { AuthError, type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Linkedin from "next-auth/providers/linkedin";
import { SignInFormSchema } from "~/app/(auth)/schemas";
import { getUserByEmail } from "~/lib/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
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
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        return { id: user.id, email: user.email };
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
