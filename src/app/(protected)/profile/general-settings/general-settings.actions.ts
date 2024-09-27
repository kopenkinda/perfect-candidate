"use server";

import { User, UserSettings } from "~/drizzle/schema";
import { auth } from "~/auth";
import { ModifiableUserSettings, updateUserSettings } from "~/lib/db/settings";
import {
  ModifiableUserInformation,
  updateUserInformation,
} from "~/lib/db/user";

export const updateUserSettingsAction = async <
  T extends ModifiableUserSettings
>(
  key: T,
  value: UserSettings[T]
) => {
  const session = await auth();
  if (!session) {
    return null;
  }
  const { user } = session;
  return await updateUserSettings(user.id, key, value);
};

export const updateUserInformationAction = async <
  T extends ModifiableUserInformation
>(
  key: T,
  value: User[T]
) => {
  const session = await auth();
  if (!session) {
    return null;
  }
  const { user } = session;
  return await updateUserInformation(user.id, key, value);
};
