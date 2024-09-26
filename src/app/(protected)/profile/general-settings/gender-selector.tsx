"use client";

import { UserSettings } from "@prisma/client";
import { useEffect, useState } from "react";
import { Icon } from "~/components/ui/app-icon";
import { FormControl, FormItem, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export type AllowedGenders = "not-specified" | "male" | "female" | "non-binary";

const allowedGenders: AllowedGenders[] = [
  "not-specified",
  "male",
  "female",
  "non-binary",
];

export interface GenderSelectorProps {
  gender: UserSettings["sex"];
  onValueChange: (value: UserSettings["sex"]) => void;
}

export const GenderSelector = (props: GenderSelectorProps) => {
  const { gender, onValueChange } = props;
  const resolvedGenderFromProps = (
    allowedGenders.includes(gender as AllowedGenders)
      ? gender
      : gender === null
      ? "not-specified"
      : "other"
  ) as AllowedGenders | "other";

  const [selectedGender, setSelectedGender] = useState<
    AllowedGenders | "other"
  >(resolvedGenderFromProps);

  const [customGender, setCustomGender] = useState<string>(gender || "");

  useEffect(() => {
    if (selectedGender === "not-specified") {
      onValueChange(null);
    } else if (selectedGender === "other") {
      if (customGender.trim().length === 0) {
        onValueChange(null);
      } else {
        onValueChange(customGender);
      }
    } else {
      onValueChange(selectedGender);
    }
  }, [selectedGender, customGender, onValueChange]);

  return (
    <>
      <FormItem>
        <FormLabel>
          <Icon name="PersonStanding" /> Gender
        </FormLabel>
        <FormControl>
          <Select
            value={selectedGender}
            onValueChange={(v) => setSelectedGender(v as AllowedGenders)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Please specify your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-specified">
                Prefer not to specify
              </SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non binary</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
      {selectedGender === "other" && (
        <FormItem>
          <FormLabel>Please specify</FormLabel>
          <FormControl>
            <Input
              value={customGender}
              onChange={(e) => setCustomGender(e.target.value)}
            />
          </FormControl>
        </FormItem>
      )}
    </>
  );
};
