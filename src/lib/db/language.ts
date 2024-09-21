import { UserLanguageLevel } from "@prisma/client";
import { db } from ".";

export const getUserLanguages = async (userId: string) => {
  return await db.userLanguage.findMany({
    where: { userId },
  });
};

export const countUserLanguages = async (userId: string) => {
  return await db.userLanguage.count({
    where: { userId },
  });
};

export const createLanguageForUser = async (userId: string) => {
  return await db.userLanguage.create({
    data: {
      userId,
      language: "",
      level: "A1",
    },
  });
};

export const updateLanguageForUser = async (
  userId: string,
  languageId: string,
  data: { language: string; level: UserLanguageLevel }
) => {
  return await db.userLanguage.update({
    where: { id: languageId, userId },
    data,
  });
};

export const deleteLanguageForUser = async (
  userId: string,
  languageId: string
) => {
  return await db.userLanguage.delete({
    where: { id: languageId, userId },
  });
};
