"use server";

import { eq } from "drizzle-orm";
import { db, UnmodifiableTableProperties } from ".";
import { userSettings, type UserSettings } from "~/drizzle/schema";

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
  const exists = await getUserSettings(userId);
  if (!exists) {
    await db.insert(userSettings).values({ userId, age: 18, [key]: value });
  } else {
    await db
      .update(userSettings)
      .set({ userId, age: 18, [key]: value })
      .where(eq(userSettings.userId, userId));
  }
};
