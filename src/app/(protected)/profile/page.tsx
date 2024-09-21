import { PrivacySettings } from "./privacy/privacy-settings";
import { GeneralSettings } from "./general-settings/general-settings";
import { LanguageForm } from "./language/language-form";

export default function ProfilePage() {
  return (
    <div className="columns-1 md:columns-2 2xl:columns-3 gap-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
      <GeneralSettings />
      <PrivacySettings />
      <div />
      <LanguageForm />
    </div>
  );
}
