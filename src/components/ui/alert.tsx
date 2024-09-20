import { Slot } from "@radix-ui/react-slot";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  XCircleIcon,
} from "lucide-react";
import * as React from "react";
import { cn } from "~/lib/utils";

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
        {variant === undefined && <InfoIcon className="w-4 h-4" />}
        {variant === "info" && <InfoIcon className="w-4 h-4" />}
        {variant === "success" && <CheckCircleIcon className="w-4 h-4" />}
        {variant === "warning" && <AlertTriangleIcon className="w-4 h-4" />}
        {variant === "error" && <XCircleIcon className="w-4 h-4" />}
        {children}
      </Comp>
    );
  }
);

Alert.displayName = "Alert";
