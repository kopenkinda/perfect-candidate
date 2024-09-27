"use client";

import type { UserLanguage } from "~/drizzle/schema";
import { useEffect, useState } from "react";
import { Icon } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";
import {
  createLanguageAction,
  deleteLanguageAction,
  updateLanguageAction,
} from "./language.actions";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useDebounce } from "@uidotdev/usehooks";

export interface LanguageManagerProps {
  languages: UserLanguage[];
}

export const LanguageManager = (props: LanguageManagerProps) => {
  const [languages, setLanguages] = useState(props.languages);

  const createLanguage = async () => {
    const created = await createLanguageAction();
    if (!created) {
      return;
    }
    setLanguages([...languages, created]);
  };

  const deleteLanguage = async (languageId: string) => {
    await deleteLanguageAction(languageId);
    setLanguages(languages.filter((l) => l.id !== languageId));
  };

  return (
    <div className="space-y-2">
      {languages.map((language) => {
        return (
          <LanguageRow
            language={language}
            delete={deleteLanguage}
            key={language.id}
          />
        );
      })}
      {languages.length === 0 && (
        <div className="text-gray-500">No languages added</div>
      )}
      <Button
        className="w-full"
        onClick={createLanguage}
        disabled={languages.length >= 5}
      >
        <Icon name="Plus" />
      </Button>
    </div>
  );
};

const LanguageRow = (props: {
  language: UserLanguage;
  delete: (languageId: string) => void;
}) => {
  const [language, setLanguage] = useState(props.language.language);
  const [level, setLevel] = useState(props.language.level);
  const debouncedLanguage = useDebounce(language, 300);

  useEffect(() => {
    const handler = async () => {
      if (
        debouncedLanguage === props.language.language &&
        level === props.language.level
      ) {
        return;
      }
      await updateLanguageAction(props.language.id, {
        language: debouncedLanguage,
        level,
      });
    };

    handler();
  }, [debouncedLanguage, level, props.language]);

  return (
    <div className="grid grid-cols-[1fr_theme('size.24')_auto] gap-1">
      <Input
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        placeholder="Ex: English"
        className="grow"
      />
      <Select
        value={level}
        onValueChange={(v) => setLevel(v as typeof props.language.level)}
      >
        <SelectTrigger className="max-w-[100px]">
          <SelectValue placeholder="level" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value="NATIVE">Native</SelectItem>
          <SelectItem value="C2">C2</SelectItem>
          <SelectItem value="C1">C1</SelectItem>
          <SelectItem value="B2">B2</SelectItem>
          <SelectItem value="B1">B1</SelectItem>
          <SelectItem value="A2">A2</SelectItem>
          <SelectItem value="A1">A1</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="destructive"
        size='icon'
        onClick={() => props.delete(props.language.id)}
      >
        <Icon name="Trash" />
      </Button>
    </div>
  );
};
