"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export const AppNavigationUserSection = () => {
  const session = useSession();
  if (session.status === "unauthenticated") {
    return (
      <Button asChild>
        <Link href="/signin">Sign in</Link>
      </Button>
    );
  }
  return null;
};
