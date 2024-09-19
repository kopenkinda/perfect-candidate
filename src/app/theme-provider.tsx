"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { PropsWithChildren, useEffect } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <InnerTheme>{children}</InnerTheme>
    </NextThemesProvider>
  );
}

const getThemeName = (name?: string) => {
  if (name === "dark") {
    return "dim";
  } else {
    return "bumblebee";
  }
};

const InnerTheme = ({ children }: PropsWithChildren) => {
  const { theme, resolvedTheme } = useTheme();
  useEffect(() => {
    if (theme === "system") {
      document.documentElement.dataset.theme = getThemeName(resolvedTheme);
    } else {
      document.documentElement.dataset.theme = getThemeName(theme);
    }
    return;
  }, [theme, resolvedTheme]);
  return <>{children}</>;
};
