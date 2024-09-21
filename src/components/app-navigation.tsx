import { ThemeToggle } from "~/app/theme-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { AppNavigationUserSection } from "./app-navigation-user-section";
import { user } from "~/auth";

export const AppNavigation = async () => {
  const session = await user();
  return (
    <div className="p-2 sticky top-0 z-50">
      <div className="relative navbar bg-base-200 rounded-lg before:bg-base-100 before:w-full before:absolute before:-z-10 before:h-full before:-top-1/2 before:left-0">
        <div className="navbar-start">
          <ThemeToggle />
        </div>
        <div className="navbar-center">
          <Button variant="ghost" asChild>
            <Link
              href={session !== undefined ? "/home" : "/"}
              className="text-xl"
            >
              Perfect Candidate
            </Link>
          </Button>
        </div>
        <div className="navbar-end">
          <AppNavigationUserSection />
        </div>
      </div>
    </div>
  );
};
