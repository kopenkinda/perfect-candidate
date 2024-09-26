"use client";

import Link from "next/link";
import { Icon } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";
import { useUser } from "~/hooks/use-user";
import { getUserProfileCompletion } from "~/lib/db/user";
import { cn } from "~/lib/utils";
import {
  AppSection,
  AppSectionDescription,
  AppSectionHeader,
  AppSectionTitle,
} from "./app-section";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export interface UserProfileCompletionProps {
  className?: string;
}

export const UserProfileCompletion = (props: UserProfileCompletionProps) => {
  const session = useUser();
  const pathname = usePathname();
  const [completion, setCompletion] = useState<number>(0);
  useEffect(() => {
    if (pathname === "/profile" || !session) {
      return;
    }
    getUserProfileCompletion(session.id)
      .then((completion) => {
        setCompletion(completion);
      })
      .catch(console.error);
  }, [completion, session, pathname]);

  if (pathname === "/profile") {
    return null;
  }

  if (!session) {
    return null;
  }

  if (completion === 100) {
    return null;
  }

  return (
    <AppSection
      className={cn(
        "border-b flex flex-col lg:flex-row items-center justify-between lg:pr-6",
        props.className
      )}
    >
      <AppSectionHeader className="lg:pb-6 pb-2">
        <AppSectionTitle>Your profile is incomplete</AppSectionTitle>
        <AppSectionDescription>
          Complete your profile to get the most out of our platform.
        </AppSectionDescription>
      </AppSectionHeader>
      <Button asChild variant="secondary">
        <Link
          href="/profile"
          className="flex items-center gap-2 mb-6 lg:mb-0 w-[calc(100%-theme('spacing.12'))] lg:w-auto"
        >
          Complete profile <Icon name="ArrowRight" />
        </Link>
      </Button>
    </AppSection>
  );
};
