import { auth } from "~/auth";
import { getUserSettings } from "~/lib/db/settings";
import { getUserById } from "~/lib/db/user";
import { AppSectionContent } from "../../app-section";
import { UserInformationForm } from "./user-information-form";
import { UserSettings } from "./user-settings-form";

export const GeneralSettings = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }
  const userInfo = (await getUserById(session.user.id))!;
  const settings = await getUserSettings(session.user.id);

  return (
    <>
      <AppSectionContent>
        <b className="mb-2 inline-block">Account information</b>
        <UserInformationForm
          info={{
            name: userInfo.name ?? "",
            email: userInfo.email ?? "",
          }}
        />
        <b className="mb-2 mt-4 inline-block">Personal information</b>
        <UserSettings settings={settings} />
      </AppSectionContent>
    </>
  );
};
