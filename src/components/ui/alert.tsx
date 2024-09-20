import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/lib/utils";
import { Icon } from "./app-icon";

export type AlertVariant = "info" | "success" | "warning" | "error";

const AlertVariantMap: Record<AlertVariant, string> = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  asChild?: boolean;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn("alert", variant && AlertVariantMap[variant], className)}
        {...props}
        ref={ref}
      >
        {variant === undefined && <Icon name="Info" />}
        {variant === "info" && <Icon name="Info" />}
        {variant === "success" && <Icon name="CircleCheck" />}
        {variant === "warning" && <Icon name="TriangleAlert" />}
        {variant === "error" && <Icon name="CircleX" />}
        {children}
      </Comp>
    );
  }
);

Alert.displayName = "Alert";
