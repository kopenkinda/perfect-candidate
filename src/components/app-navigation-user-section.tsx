"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";

export const AppNavigationUserSection = () => {
  const session = useSession();
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
  return <Button onClick={() => signOut()}>Sign out</Button>;
};
