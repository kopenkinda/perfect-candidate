import { and, eq, sql } from "drizzle-orm";
import { userLanguage, type UserLanguageLevel } from "~/drizzle/schema";
import { db } from ".";

export const getUserLanguages = async (userId: string) => {
  return await db.query.userLanguage.findMany({
    where: (userLanguage, { eq }) => eq(userLanguage.userId, userId),
  });
};

export const countUserLanguages = async (userId: string) => {
  let count = 0;
  const [result] = await db
    .select({ count: sql<number>`cast(count(id) as integer)` })
    .from(userLanguage)
    .where(eq(userLanguage.userId, userId))
    .limit(1);
  if (result) {
    count = result.count;
  }
  return count;
};

export const createLanguageForUser = async (userId: string) => {
  return await db
    .insert(userLanguage)
    .values({ userId, language: "", level: "A1" });
};

export const updateLanguageForUser = async (
  userId: string,
  languageId: string,
  data: { language: string; level: UserLanguageLevel }
) => {
  return await db
    .update(userLanguage)
    .set(data)
    .where(
      and(eq(userLanguage.id, languageId), eq(userLanguage.userId, userId))
    );
};

export const deleteLanguageForUser = async (
  userId: string,
  languageId: string
) => {
  return await db
    .delete(userLanguage)
    .where(
      and(eq(userLanguage.id, languageId), eq(userLanguage.userId, userId))
    );
};
