"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Icon } from "~/components/ui/app-icon";
import { useUser } from "~/hooks/use-user";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "~/components/ui/dropdown";

export const AppNavigationUserSection = () => {
  const session = useSession();
  const user = useUser();
  if (session.status === "unauthenticated") {
    return (
      <Button asChild>
        <Link href="/signin">Sign in</Link>
      </Button>
    );
  }
  if (session.status === "loading") {
    return null;
  }
  return (
    <Dropdown vertical="bottom" horizontal="end">
      <DropdownTrigger variant="outline">
        <Icon name="Wallet" />
        <span>{user?.credits}</span>
      </DropdownTrigger>
      <DropdownContent className="w-32 gap-2">
        <Button asChild size="sm" variant="primary">
          <DropdownItem>Buy credits</DropdownItem>
        </Button>
        <Button asChild onClick={() => signOut()} size="sm">
          <DropdownItem>Sign out</DropdownItem>
        </Button>
      </DropdownContent>
    </Dropdown>
  );
};
