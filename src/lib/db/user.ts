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

export const getUserProfileCompletion = async (id: string): Promise<number> => {
  let completion = 0;
  const user = await db.user.findUnique({ where: { id } });
  if (!user) {
    return completion;
  }
  const userSettings = await db.userSettings.findUnique({
    where: { userId: id },
  });
  const privacySettings = await db.userPrivacy.findUnique({
    where: { userId: id },
  });
  const skillsCount = await db.userSkill.count({ where: { userId: id } });
  const languagesCount = await db.userLanguage.count({ where: { userId: id } });
  const workExperinceCount = await db.userExperience.count({
    where: { userId: id },
  });
  if (skillsCount > 0) {
    completion += 10;
  }
  if (languagesCount > 0) {
    completion += 10;
  }
  if (workExperinceCount > 0) {
    completion += 10;
  }
  if (user.email && privacySettings?.email) {
    completion += 10;
  }
  if (privacySettings?.age && userSettings?.age) {
    completion += 10;
  }
  if (privacySettings?.location && userSettings?.location) {
    completion += 10;
  }
  if (privacySettings?.phone && userSettings?.phone) {
    completion += 10;
  }
  if (privacySettings?.sex && userSettings?.sex) {
    completion += 10;
  }
  if (user.name) {
    completion += 10;
  }
  if (user.image) {
    completion += 10;
  }
  return completion;
};
