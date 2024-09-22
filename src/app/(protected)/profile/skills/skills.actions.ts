"use server";

import { UserSkillType } from "@prisma/client";
import { user } from "~/auth";
import {
  addUserSkill,
  countUserSkillsByType,
  deleteUserSkill,
  updateUserSkill,
} from "~/lib/db/skills";
import { UserSkillSchema } from "./schemas";
import {
  Action,
  CommonActionErrors,
  error,
  success,
} from "~/lib/actions.utils";

export const createSkillAction: Action<
  CommonActionErrors.USER_NOT_FOUND | CommonActionErrors.LIMIT_EXCEEDED,
  typeof addUserSkill
> = async (type: UserSkillType) => {
  const session = await user();
  if (!session) {
    return error(CommonActionErrors.USER_NOT_FOUND);
  }
  const count = await countUserSkillsByType(session.id, type);
  if (count >= 15) {
    return error(CommonActionErrors.LIMIT_EXCEEDED);
  }
  const res = await addUserSkill(session.id, type, "");
  return success(res);
};

export const updateSkillAction: Action<
  CommonActionErrors.USER_NOT_FOUND | CommonActionErrors.INVALID_INPUT,
  typeof updateUserSkill
> = async (id: string, name: string) => {
  const session = await user();
  if (!session) {
    return error(CommonActionErrors.USER_NOT_FOUND);
  }
  const skill = UserSkillSchema.safeParse({ name });
  if (!skill.success) {
    return error(CommonActionErrors.INVALID_INPUT);
  }
  const res = await updateUserSkill(session.id, id, skill.data.name);
  return success(res);
};

export const deleteSkillAction: Action<
  CommonActionErrors.USER_NOT_FOUND,
  typeof deleteUserSkill
> = async (id: string) => {
  const session = await user();
  if (!session) {
    return error(CommonActionErrors.USER_NOT_FOUND);
  }
  const res = await deleteUserSkill(session.id, id);
  return success(res);
};
