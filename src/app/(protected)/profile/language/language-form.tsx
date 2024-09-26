import { user } from "~/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getUserLanguages } from "~/lib/db/language";
import { LanguageManager } from "./language-manager";
import { AppSectionContent } from "../../app-section";

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
