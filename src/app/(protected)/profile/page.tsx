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
    <div className="grid lg:grid-cols-2 gap-2 [&>div>*]:mb-2">
      <GeneralSettings />
      <PrivacySettings />
      <LanguageForm className="lg:col-span-2" />
      <SkillsForm className="lg:col-span-2" />
      <Card className="lg:col-span-2">
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
