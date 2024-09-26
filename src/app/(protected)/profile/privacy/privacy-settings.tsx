import { auth } from "~/auth";
import { getUserPrivacySettings } from "~/lib/db/privacy";
import { AppSectionContent } from "../../app-section";
import { PrivacyToggle } from "./privacy-toggle";

export const PrivacySettings = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }
  const settings = await getUserPrivacySettings(session.user.id);
  return (
    <>
      <AppSectionContent className="space-y-2">
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
          icon="PersonStanding"
          label="Share my gender"
          pkey="sex"
          checked={settings.sex}
        />
      </AppSectionContent>
    </>
  );
};
