"use client";

import { useState } from "react";
import { Toggle } from "~/components/ui/toggle";
import { PrivacyKey } from "~/lib/db/privacy";
import { updatePrivacy } from "./privacy.actions";
import { Icon, IconName } from "~/components/ui/app-icon";

export interface PrivacyToggleProps {
  icon: IconName;
  checked: boolean;
  pkey: PrivacyKey;
  label: string;
}

export const PrivacyToggle = (props: PrivacyToggleProps) => {
  const [checked, setChecked] = useState(props.checked);

  const onChange = async (checked: boolean) => {
    await updatePrivacy(props.pkey, checked);
    setChecked(checked);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex gap-1 items-center">
        <Icon name={props.icon} />
        {props.label}
      </span>
      <Toggle pressed={checked} onPressedChange={onChange}>
        <Icon name={checked ? "Check" : "X"} />
      </Toggle>
    </div>
  );
};
