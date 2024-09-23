"use server";

import { auth } from "~/auth";
import { PrivacyKey, updateUserPrivacy } from "~/lib/db/privacy";

export const updatePrivacy = async (pkey: PrivacyKey, value: boolean) => {
  const session = await auth();
  if (!session) {
    throw new Error("not authenticated");
  }
  const { user } = session;
  await updateUserPrivacy(user.id, pkey, value);
};
