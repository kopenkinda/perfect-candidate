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
  ActionResult,
  CommonActionErrors,
  error,
  success,
} from "~/lib/actions.utils";

export const createSkillAction = async (
  type: UserSkillType
): Promise<
  ActionResult<
    CommonActionErrors.USER_NOT_FOUND | CommonActionErrors.LIMIT_EXCEEDED,
    ReturnType<typeof addUserSkill>
  >
> => {
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

export const updateSkillAction = async (
  id: string,
  name: string
): Promise<
  ActionResult<
    CommonActionErrors.USER_NOT_FOUND | CommonActionErrors.INVALID_INPUT,
    ReturnType<typeof updateUserSkill>
  >
> => {
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

export const deleteSkillAction = async (
  id: string
): Promise<
  ActionResult<
    CommonActionErrors.USER_NOT_FOUND,
    ReturnType<typeof deleteUserSkill>
  >
> => {
  const session = await user();
  if (!session) {
    return error(CommonActionErrors.USER_NOT_FOUND);
  }
  const res = await deleteUserSkill(session.id, id);
  return success(res);
};
