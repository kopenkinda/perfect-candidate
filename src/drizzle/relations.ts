import { relations } from "drizzle-orm/relations";
import {
  account,
  user,
  userExperience,
  userLanguage,
  userPrivacy,
  userSettings,
  userSkill,
} from "./schema";

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(user, {
    fields: [userSettings.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  userSettings: many(userSettings),
  userPrivacies: many(userPrivacy),
  userExperiences: many(userExperience),
  userLanguages: many(userLanguage),
  accounts: many(account),
  userSkills: many(userSkill),
}));

export const userPrivacyRelations = relations(userPrivacy, ({ one }) => ({
  user: one(user, {
    fields: [userPrivacy.userId],
    references: [user.id],
  }),
}));

export const userExperienceRelations = relations(userExperience, ({ one }) => ({
  user: one(user, {
    fields: [userExperience.userId],
    references: [user.id],
  }),
}));

export const userLanguageRelations = relations(userLanguage, ({ one }) => ({
  user: one(user, {
    fields: [userLanguage.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const userSkillRelations = relations(userSkill, ({ one }) => ({
  user: one(user, {
    fields: [userSkill.userId],
    references: [user.id],
  }),
}));
