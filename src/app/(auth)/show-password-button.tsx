import * as React from "react";
import { Icon } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";

export const ShowPasswordButton = ({
  showing,
  control,
}: {
  showing: boolean;
  control: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="absolute right-0 top-0"
      type="button"
      onClick={() => control((showing) => !showing)}
    >
      {showing ? <Icon name="EyeOff" /> : <Icon name="Eye" />}
    </Button>
  );
};
