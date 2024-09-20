"use server";

import { User } from "next-auth";
import { db, UnmodifiableTableProperties } from ".";

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
  });
};

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
  });
};

export type ModifiableUserInformation = keyof Omit<
  User,
  UnmodifiableTableProperties | "image"
>;

export const updateUserInformation = async <
  T extends ModifiableUserInformation
>(
  id: string,
  key: T,
  value: User[T]
) => {
  return await db.user.update({
    where: { id },
    data: {
      [key]: value,
    },
  });
};
