"use client";

import * as React from "react";
import { cn } from "~/lib/utils";

export type ToggleVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "info"
  | "error";

const ToggleVariantMap: Record<ToggleVariant, string> = {
  primary: "toggle-primary",
  secondary: "toggle-secondary",
  accent: "toggle-accent",
  success: "toggle-success",
  warning: "toggle-warning",
  info: "toggle-info",
  error: "toggle-error",
};

export type ToggleSize = "xs" | "sm" | "md" | "lg";

const ToggleSizeMap: Record<ToggleSize, string> = {
  xs: "toggle-xs",
  sm: "toggle-sm",
  md: "toggle-md",
  lg: "toggle-lg",
};

export interface ToggleProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: ToggleVariant;
  toggleSize?: ToggleSize;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, variant, toggleSize, ...props }, ref) => {
    const computedClassName = cn(
      "toggle",
      variant && ToggleVariantMap[variant],
      toggleSize && ToggleSizeMap[toggleSize],
      className
    );
    return (
      <input
        type="checkbox"
        className={computedClassName}
        {...props}
        ref={ref}
      />
    );
  }
);

Toggle.displayName = "Toggle";

export interface ToggleLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const ToggleLabel = React.forwardRef<HTMLLabelElement, ToggleLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="form-control">
        <label
          className={cn("label cursor-pointer", className)}
          {...props}
          ref={ref}
        >
          {children}
        </label>
      </div>
    );
  }
);

ToggleLabel.displayName = "ToggleLabel";

export const ToggleLabelText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, className, ...props }, ref) => {
  return (
    <span className={cn("label-text", className)} {...props} ref={ref}>
      {children}
    </span>
  );
});

ToggleLabelText.displayName = "ToggleLabelText";
