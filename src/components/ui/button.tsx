import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "~/lib/utils";

export type ButtonVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "ghost"
  | "link"
  | "outline"
  | "glass";

const ButtonVariantMap = {
  neutral: "btn-neutral",
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
  ghost: "btn-ghost",
  link: "btn-link",
  outline: "btn-outline",
  glass: "glass",
} satisfies Record<ButtonVariant, string>;

export type ButtonSize = "lg" | "md" | "sm" | "xs" | "square" | "circle";

const ButtonSizeMap = {
  lg: "btn-lg",
  md: "btn-md",
  sm: "btn-sm",
  xs: "btn-xs",
  square: "btn-square",
  circle: "btn-circle",
} satisfies Record<ButtonSize, string>;

export type ButtonWidthType = "full" | "wide";

const ButtonWidthMap = {
  full: "btn-full",
  wide: "btn-wide",
} satisfies Record<ButtonWidthType, string>;

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  wide?: ButtonWidthType;
};

// glass	Modifier	Button with a glass effect
export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button"> & ButtonProps
>((props, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "btn",
        ButtonVariantMap[props.variant ?? "neutral"],
        props.size && ButtonSizeMap[props.size],
        props.wide && ButtonWidthMap[props.wide]
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";
