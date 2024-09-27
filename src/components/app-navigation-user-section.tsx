"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Icon } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useUser } from "~/hooks/use-user";

export const AppNavigationUserSection = () => {
  const session = useUser();
  if (session === undefined) {
    return (
      <Button asChild>
        <Link href="/signin">Sign in</Link>
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-1">
          <Icon name="Wallet" />
          <span>{session.credits}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild disabled>
          <Link href="/payments">Buy credits</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
