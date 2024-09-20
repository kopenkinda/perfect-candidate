"use client";

import { useState } from "react";
import { Toggle, ToggleLabel, ToggleLabelText } from "~/components/ui/toggle";
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

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    await updatePrivacy(props.pkey, checked);
    setChecked(checked);
  };

  return (
    <ToggleLabel>
      <ToggleLabelText className="flex gap-1 items-center">
        <Icon name={props.icon} />
        {props.label}
      </ToggleLabelText>
      <Toggle variant="success" checked={checked} onChange={onChange} />
    </ToggleLabel>
  );
};
