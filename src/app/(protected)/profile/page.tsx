import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import { GeneralSettings } from "./general-settings/general-settings";
import { LanguageForm } from "./language/language-form";
import { PrivacySettings } from "./privacy/privacy-settings";
import { SkillsForm } from "./skills/skills-form";

export default function ProfilePage() {
  return (
    <div className="columns-2 [&>div>*]:mb-2 [&>*]:break-inside-avoid">
      <div>
        <GeneralSettings />
        <PrivacySettings />
      </div>
      <div>
        <LanguageForm />
        <SkillsForm />
      </div>
      <Card className='[column-all]'>
        <CardContent>
          <CardTitle>Work experience</CardTitle>
          <CardDescription>
            Add your work experience to your CV.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
