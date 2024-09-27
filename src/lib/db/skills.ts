import { db } from ".";
import { and, eq, sql } from "drizzle-orm";
import { userSkill, type UserSkillType } from "~/drizzle/schema";

export const getUserSkills = async (userId: string) => {
  const skills = await db.query.userSkill.findMany({
    where: (row, { eq }) => eq(row.userId, userId),
  });
  console.log(skills);
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
  let count = 0;
  const [row] = await db
    .select({
      count: sql<number>`cast(count(${userSkill.id}) as integer)`,
    })
    .from(userSkill)
    .where(and(eq(userSkill.userId, userId), eq(userSkill.type, type)));
  if (row) {
    count = row.count;
  }
  return count;
};

export const addUserSkill = async (
  userId: string,
  type: UserSkillType,
  name: string
) => {
  return await db.insert(userSkill).values({ userId, type, name });
};

export const deleteUserSkill = async (userId: string, id: string) => {
  return await db.delete(userSkill).where(eq(userSkill.userId, userId));
};

export const updateUserSkill = async (
  userId: string,
  id: string,
  name: string
) => {
  return await db
    .update(userSkill)
    .set({ name })
    .where(and(eq(userSkill.userId, userId), eq(userSkill.id, id)));
};
