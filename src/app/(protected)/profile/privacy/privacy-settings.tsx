import { auth } from "~/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import { PrivacyToggle } from "./privacy-toggle";
import { getUserPrivacySettings } from "~/lib/db/privacy";

export const PrivacySettings = async ({
  className,
}: {
  className?: string;
}) => {
  const session = await auth();
  if (!session) {
    return null;
  }
  const settings = await getUserPrivacySettings(session.user.id);
  return (
    <Card className={className}>
      <CardContent>
        <CardTitle>Privacy settings</CardTitle>
        <CardDescription>
          Manage what information you share in your CV.
        </CardDescription>
        <PrivacyToggle
          icon="Calendar"
          label="Share my age"
          pkey="age"
          checked={settings.age}
        />
        <PrivacyToggle
          icon="AtSign"
          label="Share my email"
          pkey="email"
          checked={settings.email}
        />
        <PrivacyToggle
          icon="MapPin"
          label="Share my location"
          pkey="location"
          checked={settings.location}
        />
        <PrivacyToggle
          icon="Phone"
          label="Share my phone"
          pkey="phone"
          checked={settings.phone}
        />
        <PrivacyToggle
          icon="User"
          label="Share my gender"
          pkey="sex"
          checked={settings.sex}
        />
      </CardContent>
    </Card>
  );
};
