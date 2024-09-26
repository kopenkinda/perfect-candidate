import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

export const AppSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    className={cn(
      "border-t-0 border-l-0 border-r-0 border-b-0 rounded-none",
      className
    )}
    {...props}
    ref={ref}
  />
));
AppSection.displayName = "AppSection";

export const AppSectionHeader = CardHeader;
export const AppSectionTitle = CardTitle;
export const AppSectionDescription = CardDescription;
export const AppSectionContent = CardContent;
export const AppSectionFooter = CardFooter;
