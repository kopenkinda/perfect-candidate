"use client";

import type { UserSkill, UserSkillType } from "@prisma/client";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { UserSkillSchema } from "./schemas";
import {
  createSkillAction,
  deleteSkillAction,
  updateSkillAction,
} from "./skills.actions";

export interface SkillsManagerProps {
  skills: UserSkill[];
  type: UserSkillType;
  example?: string;
}

export const SkillsManager = ({ skills, ...props }: SkillsManagerProps) => {
  const router = useRouter();

  const createSkill = async () => {
    const created = await createSkillAction(props.type);
    if (created.success === false) {
      return;
    }
    router.refresh();
  };

  const deleteSkill = async (skillId: string) => {
    await deleteSkillAction(skillId);
    router.refresh();
  };

  return (
    <div className="space-y-2">
      {skills.map((skill) => {
        return (
          <SkillRow
            skill={skill}
            delete={deleteSkill}
            key={skill.id}
            example={props.example}
          />
        );
      })}
      {skills.length === 0 && (
        <div className="text-gray-500">No skills added</div>
      )}
      <Button
        className="w-full"
        onClick={createSkill}
        disabled={skills.length >= 15}
      >
        <Icon name="Plus" />
      </Button>
    </div>
  );
};

const SkillRow = (props: {
  skill: UserSkill;
  example?: string;
  delete: (languageId: string) => void;
}) => {
  const router = useRouter();
  const [name, setName] = useState(props.skill.name);
  const debouncedName = useDebounce(name, 300);

  useEffect(() => {
    const handler = async () => {
      const isValid = UserSkillSchema.safeParse({ name: debouncedName });
      if (!isValid.success) {
        return;
      }
      if (debouncedName === props.skill.name) {
        return;
      }
      await updateSkillAction(props.skill.id, debouncedName);
      router.refresh();
    };

    handler();
  }, [debouncedName, props.skill, router]);

  return (
    <div className="grid grid-cols-[1fr_auto] gap-1">
      <Input
        placeholder={props.example}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        variant="destructive"
        size="icon"
        onClick={() => props.delete(props.skill.id)}
      >
        <Icon name="Trash" />
      </Button>
    </div>
  );
};
