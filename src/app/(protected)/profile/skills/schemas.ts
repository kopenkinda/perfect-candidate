import { z } from "zod";

export const LONGEST_SKILL_NAME =
  "Exceptional Written and Verbal Communication Tailored to Varied Audiences Including Technical and Non-Technical Stakeholders";

export const UserSkillSchema = z.object({
  name: z
    .string()
    .min(1, "Skill name is required")
    .max(LONGEST_SKILL_NAME.length, "Skill name is too long"),
});

export type UserSkillForm = z.infer<typeof UserSkillSchema>;
