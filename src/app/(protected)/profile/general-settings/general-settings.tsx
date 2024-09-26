import { auth } from "~/auth";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getUserSettings } from "~/lib/db/settings";
import { getUserById } from "~/lib/db/user";
import { UserInformationForm } from "./user-information-form";
import { UserSettings } from "./user-settings-form";

export const GeneralSettings = async ({
  className,
}: {
  className?: string;
}) => {
  const session = await auth();
  if (!session) {
    return null;
  }
  const userInfo = (await getUserById(session.user.id))!;
  const settings = await getUserSettings(session.user.id);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>General settings</CardTitle>
      </CardHeader>
      <CardContent>
        <b className='mb-2 inline-block'>Account information</b>
        <UserInformationForm
          info={{
            name: userInfo.name ?? "",
            email: userInfo.email ?? "",
          }}
        />
        <b className='mb-2 mt-4 inline-block'>Personal information</b>
        <UserSettings settings={settings} />
      </CardContent>
    </Card>
  );
};
