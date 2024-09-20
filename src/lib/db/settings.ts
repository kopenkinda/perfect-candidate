"use server";

import { UserSettings } from "@prisma/client";
import { db, UnmodifiableTableProperties } from ".";

export const getUserSettings = async (userId: string) => {
  const settings = await db.userSettings.findUnique({ where: { userId } });
  if (settings) {
    return settings;
  }
  return db.userSettings.create({ data: { userId, age: 18 } });
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
  return db.userSettings.upsert({
    where: { userId },
    create: { userId, [key]: value, age: 18 },
    update: { [key]: value },
  });
};
