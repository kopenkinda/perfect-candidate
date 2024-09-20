import type { LucideProps } from "lucide-react";
import { icons } from "lucide-react";
import { cn } from "~/lib/utils";

export type IconName = keyof typeof icons;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
  const LucideIcon = icons[name];
  return <LucideIcon className={cn("w-4 h-4", className)} {...props} />;
};
