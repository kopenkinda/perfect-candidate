import Link from "next/link";
import { AppNavigationUserSection } from "./app-navigation-user-section";
import { Icon } from "./ui/app-icon";
import { user } from "~/auth";
import { ThemeToggle } from "~/app/theme-toggle";

export const AppNavigation = async () => {
  const session = await user();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href={session ? "/home" : "/"}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Icon name="File" />
          <span className="sr-only">Perfect candidate</span>
        </Link>
        <Link
          href="/tips"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Tips
        </Link>
      </nav>
      <div className="flex w-full items-center gap-2 md:ml-auto justify-end">
        <ThemeToggle />
        <AppNavigationUserSection />
      </div>
    </header>
  );
};
