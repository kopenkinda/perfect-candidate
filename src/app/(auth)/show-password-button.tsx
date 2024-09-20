import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
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
      size="square"
      variant="ghost"
      className="-mr-4"
      type="button"
      onClick={() => control((showing) => !showing)}
    >
      {showing ? (
        <EyeOffIcon className="w-4 h-4" />
      ) : (
        <EyeIcon className="w-4 h-4" />
      )}
    </Button>
  );
};
