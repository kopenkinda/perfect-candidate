"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
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
        <SunIcon className="h-[1.2rem] w-[1.2rem] swap-on" />
        <MoonIcon className="h-[1.2rem] w-[1.2rem] swap-off" />
        <span className="sr-only">Toggle theme</span>
      </label>
    </Button>
  );
}
