import { auth } from "~/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import { getUserSettings } from "~/lib/db/settings";
import { UserInformationForm } from "./user-information-form";
import { getUserById } from "~/lib/db/user";

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
        <CardDescription>Some basic information about you.</CardDescription>
        <UserInformationForm
          info={{
            name: userInfo.name ?? "",
            email: userInfo.email ?? "",
          }}
        />
      </CardContent>
    </Card>
  );
};
