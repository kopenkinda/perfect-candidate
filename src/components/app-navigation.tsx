import Link from "next/link";
import { ThemeToggle } from "~/app/theme-toggle";
import { user } from "~/auth";
import { AppNavigationUserSection } from "./app-navigation-user-section";
import { Logo } from "./logo";

export const AppNavigation = async () => {
  const session = await user();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 z-50">
      <nav className="text-lg font-medium flex flex-row items-center gap-5 md:text-sm lg:gap-6">
        <Link
          href={session ? "/home" : "/"}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Logo className="w-6 h-6" />
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
