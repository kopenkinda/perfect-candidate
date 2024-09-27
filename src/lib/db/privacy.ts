"use server";

import { type UserPrivacy, userPrivacy } from "~/drizzle/schema";
import { db, UnmodifiableTableProperties } from ".";
import { getUserById } from "./user";
import { eq } from "drizzle-orm";

export const getUserPrivacySettings = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error("user not found");
  }
  const found = await db.query.userPrivacy.findFirst({
    where: (row, { eq }) => eq(row.userId, user.id),
  });
  if (found) {
    return found;
  }
  const [created] = await db
    .insert(userPrivacy)
    .values({
      userId: user.id,
    })
    .returning();
  return created;
};

export type PrivacyKey = keyof Omit<UserPrivacy, UnmodifiableTableProperties>;

export const updateUserPrivacy = async (
  userId: string,
  key: PrivacyKey,
  value: boolean
) => {
  const exists = await db.query.userPrivacy.findFirst({
    where: (row, { eq }) => eq(row.userId, userId),
  });
  if (exists) {
    await db
      .update(userPrivacy)
      .set({ [key]: value })
      .where(eq(userPrivacy.userId, userId));
  } else {
    await db.insert(userPrivacy).values({ userId, [key]: value });
  }
};
