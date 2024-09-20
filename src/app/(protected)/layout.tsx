"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Divider } from "~/components/ui/divider";
import { FeedbackButton } from "./feedback-button";

export default function ApplicationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-7 gap-4 relative">
      <div className="col-span-7 md:col-span-2">
        <div className="sticky top-20">
          <Card bordered className="bg-base-200">
            <CardContent className="flex flex-row md:flex-col items-center gap-2 p-2 md:p-4">
              <Button
                className="md:btn-block grow"
                variant={pathname.startsWith("/home") ? "primary" : "outline"}
                asChild
              >
                <Link href="/home">
                  <Icon name="House" />
                  Home
                </Link>
              </Button>
              <Button
                className="md:btn-block grow"
                variant={
                  pathname.startsWith("/profile") ? "primary" : "outline"
                }
                asChild
              >
                <Link href="/profile">
                  <Icon name="User" />
                  Profile
                </Link>
              </Button>
              <Button
                className="md:btn-block grow"
                variant={pathname.startsWith("/cv") ? "primary" : "outline"}
                asChild
              >
                <Link href="/cv">
                  <Icon name="Files" />
                  CV's
                </Link>
              </Button>
              <Divider className="m-0 divider-horizontal md:divider-vertical" />
              <Button className="md:btn-block grow" variant="secondary" asChild>
                <Link href="/tips">
                  <Icon name="Lightbulb" />
                  Tips
                </Link>
              </Button>
            </CardContent>
          </Card>
          <FeedbackButton />
        </div>
      </div>
      <div className="col-span-7 md:col-span-5">{children}</div>
    </div>
  );
}
