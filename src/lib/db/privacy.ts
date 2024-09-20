"use server";

import { UserPrivacy } from "@prisma/client";
import { db } from ".";
import { getUserById } from "./user";

export const getUserPrivacySettings = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error("user not found");
  }
  const found = await db.userPrivacy.findUnique({
    where: { userId: user.id },
  });
  if (found) {
    return found;
  }
  return await db.userPrivacy.create({
    data: { userId: user.id },
  });
};

export type PrivacyKey = keyof Omit<
  UserPrivacy,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export const updateUserPrivacy = async (
  userId: string,
  key: PrivacyKey,
  value: boolean
) => {
  await db.userPrivacy.upsert({
    where: { userId },
    create: { userId, [key]: value },
    update: { userId, [key]: value },
  });
};
