import React, { useMemo } from "react";
import { cn } from "~/lib/utils";
import { InputProps } from "./input";

export interface FormControlProps
  extends Omit<React.HTMLProps<HTMLLabelElement>, "children"> {
  children: React.ReactElement<InputProps>;
  label?: string;
  error?: string;
}

export const FormControl = React.forwardRef<HTMLLabelElement, FormControlProps>(
  ({ children, className, label, error, ...props }, ref) => {
    const hasError = error !== undefined;
    const child = useMemo(() => {
      return React.cloneElement(children, {
        variant: hasError ? "error" : children.props.variant,
      });
    }, [hasError, children]);
    return (
      <label className={cn("form-control", className)} {...props} ref={ref}>
        {label !== undefined && (
          <div className="label">
            <span
              className={cn("label-text", {
                "text-error": hasError,
              })}
            >
              {label}
            </span>
          </div>
        )}
        {child}
        {hasError && (
          <div className="label">
            <span
              className={cn("label-text-alt", {
                "text-error": hasError,
              })}
            >
              {error}
            </span>
          </div>
        )}
      </label>
    );
  }
);

FormControl.displayName = "FormControl";
