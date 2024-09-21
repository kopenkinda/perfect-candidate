import * as React from "react";
import {
  ButtonSize,
  ButtonSizeMap,
  ButtonVariant,
  ButtonVariantMap,
} from "~/components/ui/button";
import { cn } from "~/lib/utils";

export type DropdownVertical = "top" | "bottom";

const DropdownVerticalMap: Record<DropdownVertical, string> = {
  top: "dropdown-top",
  bottom: "dropdown-bottom",
};

export type DropdownHorizontal = "left" | "right" | "end";

const DropdownHorizontalMap: Record<DropdownHorizontal, string> = {
  left: "dropdown-left",
  right: "dropdown-right",
  end: "dropdown-end",
};

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  vertical?: DropdownVertical;
  horizontal?: DropdownHorizontal;
  hoverable?: boolean;
  open?: boolean;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    { vertical, horizontal, hoverable, open, className, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "dropdown",
          vertical && DropdownVerticalMap[vertical],
          horizontal && DropdownHorizontalMap[horizontal],
          hoverable && "dropdown-hover",
          open && "dropdown-open",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";

export interface DropdownTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const DropdownTrigger = React.forwardRef<
  HTMLDivElement,
  DropdownTriggerProps
>(({ children, className, variant, size, ...props }, ref) => {
  return (
    <div
      ref={ref}
      tabIndex={0}
      role="button"
      {...props}
      className={cn(
        "btn",
        ButtonVariantMap[variant ?? "neutral"],
        size && ButtonSizeMap[size],
        className
      )}
    >
      {children}
    </div>
  );
});
DropdownTrigger.displayName = "DropdownTrigger";

export interface DropdownContentProps
  extends React.HTMLAttributes<HTMLUListElement> {}

export const DropdownContent = React.forwardRef<
  HTMLUListElement,
  DropdownContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      {...props}
      className={cn(
        "dropdown-content mt-2 menu bg-base-100 rounded-box border-neutral border z-10 p-2 shadow",
        className
      )}
    >
      {children}
    </ul>
  );
});

DropdownContent.displayName = "DropdownContent";

export interface DropdownItemProps
  extends React.HTMLAttributes<HTMLLIElement> {}

export const DropdownItem = React.forwardRef<HTMLLIElement, DropdownItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <li ref={ref} {...props}>
        {children}
      </li>
    );
  }
);
DropdownItem.displayName = "DropdownItem";
