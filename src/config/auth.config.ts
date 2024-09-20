import Credentials from "next-auth/providers/credentials";
import {
  CredentialsSignin,
  DefaultSession,
  type NextAuthConfig,
} from "next-auth";
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

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

const credentials = Credentials({
  credentials: {
    username: { label: "Username" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (
      credentials.username === undefined ||
      credentials.password === undefined
    ) {
      throw new InvalidLoginError();
    }
    // const user = await findUserByCredentials(credentials);
    throw new InvalidLoginError();
  },
});

export const authConifg: Pick<NextAuthConfig, "providers"> = {
  providers: [credentials],
};

export const providerMap = authConifg.providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");
