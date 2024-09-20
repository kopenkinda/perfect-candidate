import * as React from "react";
import { cn } from "~/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export type DividerVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "info"
  | "error";

const DividerVariantMap: Record<DividerVariant, string> = {
  neutral: "divider-neutral",
  primary: "divider-primary",
  secondary: "divider-secondary",
  accent: "divider-accent",
  success: "divider-success",
  warning: "divider-warning",
  info: "divider-info",
  error: "divider-error",
};

export type DividerOrientation = "horizontal" | "vertical";

const DividerOrientationMap: Record<DividerOrientation, string> = {
  horizontal: "divider-horizontal",
  vertical: "divider-vertical",
};

export type DividerAlignment = "start" | "end";

const DividerAlignmentMap: Record<DividerAlignment, string> = {
  start: "divider-start",
  end: "divider-end",
};

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  align?: DividerAlignment;
  asChild?: boolean;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ asChild, variant, orientation, align, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(
          "divider",
          variant && DividerVariantMap[variant],
          orientation && DividerOrientationMap[orientation],
          align && DividerAlignmentMap[align],
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);

Divider.displayName = "Divider";
