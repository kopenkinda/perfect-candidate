"use server";

import { eq, sql } from "drizzle-orm";
import { User } from "next-auth";
import {
  user,
  userExperience,
  userLanguage,
  userSkill,
} from "~/drizzle/schema";
import { db, UnmodifiableTableProperties } from ".";
import { getUserPrivacySettings } from "./privacy";
import { getUserSettings } from "./settings";

export const getUserByEmail = async (email: string) => {
  return await db.query.user.findFirst({
    where: (row, { eq }) => eq(row.email, email),
  });
};

export const getUserById = async (id: string) => {
  return await db.query.user.findFirst({
    where: (row, { eq }) => eq(row.id, id),
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
  const [updated] = await db
    .update(user)
    .set({
      [key]: value,
    })
    .where(eq(user.id, id))
    .returning();
  return updated;
};

export const getUserProfileCompletion = async (id: string): Promise<number> => {
  let completion = 0;
  const user = await getUserById(id);
  if (!user) {
    return completion;
  }
  const userSettings = await getUserSettings(id);
  const privacySettings = await getUserPrivacySettings(id);

  const [counts] = await db
    .select({
      skillsCount: sql<number>`cast(count(${userSkill.id}) as integer)`,
      languagesCount: sql<number>`COUNT(${userLanguage.id})`,
      workExperienceCount: sql<number>`COUNT(${userExperience.id})`,
    })
    .from(userSkill)
    .leftJoin(userLanguage, eq(userSkill.userId, userLanguage.userId))
    .leftJoin(userExperience, eq(userSkill.userId, userExperience.userId))
    .where(eq(userSkill.userId, id));

  if (!counts) {
    return completion;
  }

  const { skillsCount, languagesCount, workExperienceCount } = counts;

  if (skillsCount > 0) {
    completion += 10;
  }
  if (languagesCount > 0) {
    completion += 10;
  }
  if (workExperienceCount > 0) {
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
