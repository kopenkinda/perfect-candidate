import { user } from "~/auth";
import { getUserLanguages } from "~/lib/db/language";
import { AppSectionContent } from "../../app-section";
import { LanguageManager } from "./language-manager";

export interface LanguageFormProps {
  className?: string;
}

export const LanguageForm = async ({ className }: LanguageFormProps) => {
  const session = await user();
  if (!session) {
    return null;
  }
  const languages = await getUserLanguages(session.id);
  return (
    <>
      <AppSectionContent className={className}>
        <LanguageManager languages={languages} />
      </AppSectionContent>
    </>
  );
};
