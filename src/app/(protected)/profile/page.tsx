import { PrivacySettings } from "./privacy/privacy-settings";
import { GeneralSettings } from "./general-settings/general-settings";
import { LanguageForm } from "./language/language-form";

export default function ProfilePage() {
  return (
    <div className="grid lg:grid-cols-2 gap-2">
      <div>
        <GeneralSettings />
      </div>
      <div className="[&>*]:mb-2">
        <PrivacySettings />
        <LanguageForm />
      </div>
      <div />
    </div>
  );
}
