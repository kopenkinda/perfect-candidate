"use server";

import bcrypt from "bcryptjs";
import { db, getUserByEmail } from "~/lib/db";
import {
  SignInFormSchema,
  SignInFormValues,
  SignUpFormSchema,
  SignUpFormValues,
} from "./schemas";
import { naSignIn } from "~/auth";
import { routes } from "~/auth/routes";
import { AuthError } from "next-auth";

export type AuthActionResult =
  | {
      success: true;
      message?: string;
    }
  | {
      success: false;
      error: string;
    };

export const register = async (
  data: SignUpFormValues
): Promise<AuthActionResult> => {
  const validation = SignUpFormSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }
  const hashedPassword = await hashPassword(data.password.base);
  const userExists = await getUserByEmail(data.email);
  if (userExists) {
    return { success: false, error: "This email has already been used" };
  }
  await db.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });
  return { success: true };
};

export const login = async (
  data: SignInFormValues,
  callbackUrl?: string
): Promise<AuthActionResult> => {
  const validation = SignInFormSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }
  try {
    await naSignIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: callbackUrl || routes.DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      if (error.name === "PasswordNotSetException") {
        return {
          success: false,
          error:
            "Please log in with the social media you used to register your account",
        };
      }
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid credentials" };
        default:
          return { success: false, error: "Something went wrong" };
      }
    }
    throw error;
  }
  return { success: true };
};

export const loginWithProvider = async (data: FormData) => {
  const provider = data.get("provider");
  if (!provider) {
    return;
  }
  const callbackUrl = (data.get("callbackUrl") as string) ?? undefined;
  await naSignIn(provider as string, {
    redirectTo: callbackUrl || routes.DEFAULT_LOGIN_REDIRECT,
  });
};

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};
