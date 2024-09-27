import { sql } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const userLanguageLevel = pgEnum("UserLanguageLevel", [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "NATIVE",
]);
export type UserLanguageLevel = (typeof userLanguageLevel.enumValues)[number];

export const userSkillType = pgEnum("UserSkillType", ["HARD", "SOFT", "OTHER"]);
export type UserSkillType = (typeof userSkillType.enumValues)[number];

export const userSettings = pgTable(
  "UserSettings",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id").notNull(),
    age: integer("age").notNull(),
    sex: text("sex"),
    location: text("location"),
    phone: text("phone"),
    createdAt: timestamp("created_at", { precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex("UserSettings_user_id_key").using(
        "btree",
        table.userId.asc().nullsLast()
      ),
      userSettingsUserIdFkey: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "UserSettings_user_id_fkey",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  }
);

export const userPrivacy = pgTable(
  "UserPrivacy",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id").notNull(),
    email: boolean("email").default(true).notNull(),
    age: boolean("age").default(true).notNull(),
    sex: boolean("sex").default(true).notNull(),
    phone: boolean("phone").default(true).notNull(),
    location: boolean("location").default(true).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex("UserPrivacy_user_id_key").using(
        "btree",
        table.userId.asc().nullsLast()
      ),
      userPrivacyUserIdFkey: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "UserPrivacy_user_id_fkey",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  }
);

export const userExperience = pgTable(
  "UserExperience",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    startDate: timestamp("start_date", {
      precision: 3,
      mode: "string",
    }).notNull(),
    endDate: timestamp("end_date", { precision: 3, mode: "string" }),
    current: boolean("current").default(false).notNull(),
    visible: boolean("visible").default(true).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("UserExperience_user_id_idx").using(
        "btree",
        table.userId.asc().nullsLast()
      ),
      userExperienceUserIdFkey: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "UserExperience_user_id_fkey",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  }
);

export const userLanguage = pgTable(
  "UserLanguage",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id").notNull(),
    language: text("language").notNull(),
    level: userLanguageLevel("level").notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("UserLanguage_user_id_idx").using(
        "btree",
        table.userId.asc().nullsLast()
      ),
      userLanguageUserIdFkey: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "UserLanguage_user_id_fkey",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  }
);

export const userSkill = pgTable(
  "UserSkill",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: text("name").notNull(),
    type: userSkillType("type").notNull(),
    userId: uuid("user_id").notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("UserSkill_user_id_idx").using(
        "btree",
        table.userId.asc().nullsLast()
      ),
      userSkillUserIdFkey: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "UserSkill_user_id_fkey",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  }
);

export const user = pgTable(
  "User",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: text("name"),
    email: text("email"),
    emailVerified: timestamp("email_verified_at", {
      precision: 3,
      mode: "string",
    }),
    image: text("image"),
    password: text("password"),
    credits: integer("credits").default(10).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("User_email_key").using(
        "btree",
        table.email.asc().nullsLast()
      ),
    };
  }
);

export const account = pgTable(
  "Account",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id").notNull(),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
    createdAt: timestamp("created_at", { precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      providerProviderAccountIdKey: uniqueIndex(
        "Account_provider_provider_account_id_key"
      ).using(
        "btree",
        table.provider.asc().nullsLast(),
        table.providerAccountId.asc().nullsLast()
      ),
      userIdIdx: index("Account_user_id_idx").using(
        "btree",
        table.userId.asc().nullsLast()
      ),
      accountUserIdFkey: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "Account_user_id_fkey",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  }
);

export const verificationToken = pgTable(
  "VerificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "string" }).notNull(),
  },
  (table) => {
    return {
      identifierTokenKey: uniqueIndex(
        "VerificationToken_identifier_token_key"
      ).using(
        "btree",
        table.identifier.asc().nullsLast(),
        table.token.asc().nullsLast()
      ),
    };
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  userLanguageLevel,
  userSkillType,
  userSettings,
  verificationToken,
  userPrivacy,
  userExperience,
  userLanguage,
  user,
  account,
  userSkill,
};
