"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { naSignIn } from "~/auth";
import { routes } from "~/auth/routes";
import {
  ActionResult,
  error,
  NonExclusiveString,
  success,
} from "~/lib/actions.utils";
import { db } from "~/lib/db";
import { getUserByEmail } from "~/lib/db/user";
import {
  SignInFormSchema,
  SignInFormValues,
  SignUpFormSchema,
  SignUpFormValues,
} from "./schemas";

export const register = async (
  data: SignUpFormValues
): Promise<
  ActionResult<"This email has already been used" | NonExclusiveString, null>
> => {
  const validation = SignUpFormSchema.safeParse(data);
  if (!validation.success) {
    return error(validation.error.message);
  }
  const hashedPassword = await hashPassword(data.password);
  const userExists = await getUserByEmail(data.email);
  if (userExists) {
    return error("This email has already been used");
  }
  await db.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });
  return success(null);
};

export const login = async (
  data: SignInFormValues,
  callbackUrl?: string
): Promise<
  ActionResult<
    | "Please log in with the social media you used to register your account"
    | "Invalid credentials"
    | "Something went wrong"
    | NonExclusiveString,
    null
  >
> => {
  const validation = SignInFormSchema.safeParse(data);
  if (!validation.success) {
    return error(validation.error.message);
  }
  try {
    await naSignIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: callbackUrl || routes.DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof AuthError) {
      if (err.name === "PasswordNotSetException") {
        return error(
          "Please log in with the social media you used to register your account"
        );
      }
      switch (err.type) {
        case "CredentialsSignin":
          return error("Invalid credentials");
        default:
          return error("Something went wrong");
      }
    }
    throw err;
  }
  return success(null);
};

export const loginWithProvider = async (
  data: FormData
): Promise<ActionResult<"Provider is required", null>> => {
  const provider = data.get("provider");
  if (!provider) {
    return error("Provider is required");
  }
  const callbackUrl = (data.get("callbackUrl") as string) ?? undefined;
  await naSignIn(provider as string, {
    redirectTo: callbackUrl || routes.DEFAULT_LOGIN_REDIRECT,
  });
  return success(null);
};

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};
