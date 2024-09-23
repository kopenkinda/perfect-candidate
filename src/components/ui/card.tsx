import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  asChild?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, bordered, ...props }, ref) => {
    const Comp = props.asChild ? Slot : "div";
    return (
      <Comp
        className={cn(
          "card bg-base-200",
          { "card-bordered": bordered },
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);
Card.displayName = "Card";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    const Comp = props.asChild ? Slot : "div";
    return (
      <Comp className={cn("card-body p-4", className)} {...props} ref={ref} />
    );
  }
);
CardContent.displayName = "CardContent";

export interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const CardTitle = React.forwardRef<HTMLSpanElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    const Comp = props.asChild ? Slot : "span";
    return (
      <Comp className={cn("card-title", className)} {...props} ref={ref} />
    );
  }
);
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  const Comp = props.asChild ? Slot : "p";
  return (
    <Comp className={cn("text-foreground", className)} {...props} ref={ref} />
  );
});
CardDescription.displayName = "CardDescription";
