import { UserSkillType } from "@prisma/client";
import { db } from ".";

export const getUserSkills = async (userId: string) => {
  const skills = await db.userSkill.findMany({ where: { userId } });
  const groupped = skills.reduce(
    (acc, skill) => {
      acc[skill.type].push(skill);
      return acc;
    },
    {
      HARD: [],
      SOFT: [],
      OTHER: [],
    } as Record<UserSkillType, typeof skills>
  );
  return groupped;
};

export const countUserSkillsByType = async (
  userId: string,
  type: UserSkillType
) => {
  return db.userSkill.count({ where: { userId, type } });
};

export const addUserSkill = async (
  userId: string,
  type: UserSkillType,
  name: string
) => {
  return await db.userSkill.create({ data: { userId, type, name } });
};

export const deleteUserSkill = async (userId: string, id: string) => {
  return await db.userSkill.delete({ where: { userId, id } });
};

export const updateUserSkill = async (
  userId: string,
  id: string,
  name: string
) => {
  return await db.userSkill.update({ where: { userId, id }, data: { name } });
};
