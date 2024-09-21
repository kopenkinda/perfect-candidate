import { auth } from "~/auth";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Divider } from "~/components/ui/divider";
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
      <CardContent>
        <CardTitle>General settings</CardTitle>
        <Divider className="my-0" align="start">
          Account information
        </Divider>
        <UserInformationForm
          info={{
            name: userInfo.name ?? "",
            email: userInfo.email ?? "",
          }}
        />
        <Divider className="mb-0" align="start">
          Personal information
        </Divider>
        <UserSettings settings={settings} />
      </CardContent>
    </Card>
  );
};
