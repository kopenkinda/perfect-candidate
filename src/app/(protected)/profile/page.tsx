import { PrivacySettings } from "./privacy/privacy-settings";
import { GeneralSettings } from "./general-settings/general-settings";

export default function ProfilePage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <GeneralSettings className="col-span-12 md:col-span-8" />
      <PrivacySettings className="col-span-12 md:col-span-4" />
    </div>
  );
}
