import { user } from "~/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import { getUserLanguages } from "~/lib/db/language";
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
    <Card className={className}>
      <CardContent>
        <CardTitle>Languages</CardTitle>
        <CardDescription>Manage the languages you speak.</CardDescription>
        <LanguageManager languages={languages} />
      </CardContent>
    </Card>
  );
};
