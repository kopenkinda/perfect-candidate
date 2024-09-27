"use server";

import { UserSettings } from "@prisma/client";
import { db, UnmodifiableTableProperties } from ".";
import { userSettings } from "~/drizzle/schema";

export const getUserSettings = async (userId: string) => {
  const settings = await db.query.userSettings.findFirst({
    where: (row, { eq }) => eq(row.userId, userId),
  });
  if (settings) {
    return settings;
  }
  const [created] = await db
    .insert(userSettings)
    .values({ userId, age: 18 })
    .returning();
  return created;
};

export type ModifiableUserSettings = keyof Omit<
  UserSettings,
  UnmodifiableTableProperties
>;

export const updateUserSettings = async <T extends ModifiableUserSettings>(
  userId: string,
  key: T,
  value: UserSettings[T]
) => {
  return db
    .insert(userSettings)
    .values({
      userId,
      [key]: value,
      age: 18,
    })
    .onConflictDoUpdate({
      target: userSettings.userId,
      set: { [key]: value },
    });
};
