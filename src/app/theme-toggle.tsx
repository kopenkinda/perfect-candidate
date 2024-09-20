"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";
import { themeConfig } from "~/config/theme.config";
import { cn } from "~/lib/utils";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDarkMode =
    resolvedTheme === themeConfig.dark || resolvedTheme === "dark";

  return (
    <Button
      size="square"
      variant="ghost"
      asChild
      onClick={() =>
        setTheme(isDarkMode ? themeConfig.light : themeConfig.dark)
      }
    >
      <label className={cn("swap swap-rotate", { "swap-active": isDarkMode })}>
        <Icon name="Sun" className="swap-on" />
        <Icon name="Moon" className="swap-off" />
        <span className="sr-only">Toggle theme</span>
      </label>
    </Button>
  );
}
