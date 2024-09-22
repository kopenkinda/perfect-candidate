import { PrivacySettings } from "./privacy/privacy-settings";
import { GeneralSettings } from "./general-settings/general-settings";
import { LanguageForm } from "./language/language-form";
import { SkillsForm } from "./skills/skills-form";

export default function ProfilePage() {
  return (
    <div className="grid lg:grid-cols-2 gap-2 [&>div>*]:mb-2">
      <div>
        <GeneralSettings />
        <SkillsForm />
      </div>
      <div>
        <PrivacySettings />
        <LanguageForm />
      </div>
    </div>
  );
}
