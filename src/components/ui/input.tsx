import * as React from "react";

import { cn } from "~/lib/utils";

export type InputVariant =
  | "bordered"
  | "ghost"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

const InputVariantMap = {
  bordered: "input-bordered",
  ghost: "input-ghost",
  primary: "input-primary",
  secondary: "input-secondary",
  accent: "input-accent",
  info: "input-info",
  success: "input-success",
  warning: "input-warning",
  error: "input-error",
} as Record<InputVariant, string>;

export type InputSize = "xs" | "sm" | "md" | "lg";

const InputSizeMap = {
  xs: "input-xs",
  sm: "input-sm",
  md: "input-md",
  lg: "input-lg",
} as Record<InputSize, string>;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  start?: React.ReactNode;
  end?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant = "bordered", type, inputSize, start, end, ...props },
    ref
  ) => {
    const computedClassName = cn(
      "input",
      { "flex items-center gap-2": (start || end) !== undefined },
      InputVariantMap[variant],
      inputSize && InputSizeMap[inputSize],
      className
    );
    if (start || end) {
      return (
        <label className={computedClassName}>
          {start}
          <input type={type} ref={ref} className="grow" {...props} />
          {end}
        </label>
      );
    }
    return (
      <input type={type} className={computedClassName} ref={ref} {...props} />
    );
  }
);

Input.displayName = "Input";
