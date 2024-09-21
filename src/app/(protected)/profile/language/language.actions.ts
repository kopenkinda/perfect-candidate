"use server";

import { UserLanguageLevel } from "@prisma/client";
import { user } from "~/auth";
import {
  countUserLanguages,
  createLanguageForUser,
  deleteLanguageForUser,
  updateLanguageForUser,
} from "~/lib/db/language";

export const createLanguageAction = async () => {
  const session = await user();
  if (!session) {
    return null;
  }
  const count = await countUserLanguages(session.id);
  if (count >= 5) {
    return null;
  }
  return await createLanguageForUser(session.id);
};

export const updateLanguageAction = async (
  languageId: string,
  data: { language: string; level: UserLanguageLevel }
) => {
  const session = await user();
  if (!session) {
    return null;
  }
  return await updateLanguageForUser(session.id, languageId, data);
};

export const deleteLanguageAction = async (languageId: string) => {
  const session = await user();
  if (!session) {
    return null;
  }
  return await deleteLanguageForUser(session.id, languageId);
};
