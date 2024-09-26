import {
  AppSection,
  AppSectionDescription,
  AppSectionHeader,
  AppSectionTitle,
} from "../app-section";
import { GeneralSettings } from "./general-settings/general-settings";
import { LanguageForm } from "./language/language-form";
import { PrivacySettings } from "./privacy/privacy-settings";
import { SkillsForm } from "./skills/skills-form";

export default function ProfilePage() {
  return (
    <div className="grid lg:grid-cols-12">
      <AppSection className="lg:border-r border-b lg:col-span-6 col-span-12">
        <AppSectionHeader>
          <AppSectionTitle>General settings</AppSectionTitle>
          <AppSectionDescription>
            Manage your general settings.
          </AppSectionDescription>
        </AppSectionHeader>
        <GeneralSettings />
      </AppSection>
      <AppSection className="border-b lg:col-span-6 col-span-12">
        <AppSectionHeader>
          <AppSectionTitle>Privacy settings</AppSectionTitle>
          <AppSectionDescription>
            Manage what information you share in your CV.
          </AppSectionDescription>
        </AppSectionHeader>
        <PrivacySettings />
      </AppSection>
      <AppSection className="lg:border-r border-b lg:col-span-5 col-span-12">
        <AppSectionHeader>
          <AppSectionTitle>Languages</AppSectionTitle>
          <AppSectionDescription>
            Manage the languages you speak.
          </AppSectionDescription>
        </AppSectionHeader>
        <LanguageForm />
      </AppSection>
      <AppSection className="lg:border-r border-b lg:col-span-7 col-span-12">
        <AppSectionHeader>
          <AppSectionTitle>Skills</AppSectionTitle>
          <AppSectionDescription>
            Manage your skills and expertise.
          </AppSectionDescription>
        </AppSectionHeader>
        <SkillsForm />
      </AppSection>
      <AppSection className="lg:col-span-12 border-b col-span-12">
        <AppSectionHeader>
          <AppSectionTitle>Work experience</AppSectionTitle>
          <AppSectionDescription>
            Add your work experience to your CV.
          </AppSectionDescription>
        </AppSectionHeader>
      </AppSection>
    </div>
  );
}
