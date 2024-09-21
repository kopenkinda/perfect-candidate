"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import { Icon } from "./ui/app-icon";
import { useUser } from "~/hooks/use-user";

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
    <>
      <Button className="mr-1" variant='outline'>
        <Icon name="Wallet" />
        {user?.credits}
      </Button>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  );
};
