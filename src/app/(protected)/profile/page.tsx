import { PrivacySettings } from "./privacy/privacy-settings";
import { GeneralSettings } from "./general-settings/general-settings";

export default function ProfilePage() {
  return (
    <div className="columns-1 md:columns-2 2xl:columns-3 gap-4">
      <GeneralSettings className="mb-4 break-inside-avoid" />
      <PrivacySettings className="mb-4 break-inside-avoid" />
    </div>
  );
}
