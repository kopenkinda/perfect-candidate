"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, IconName } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";
import { FeedbackButton } from "./feedback-button";
import { cn } from "~/lib/utils";

export function ApplicationShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  return (
    <div className="flex">
      <aside className="w-[theme('size.52')] border-r h-[calc(100svh-theme('size.16'))] sticky top-[theme('size.16')] flex flex-col">
        <SidebarLink
          pathname={pathname}
          href="/home"
          icon="House"
          text="Home"
        />
        <SidebarLink
          pathname={pathname}
          href="/profile"
          icon="User"
          text="Profile"
        />
        <SidebarLink pathname={pathname} href="/cv" icon="Files" text="CV's" />
        <div className="mt-auto border-t">
          <FeedbackButton />
        </div>
      </aside>
      <div className="w-[calc(100vw-theme('size.52'))] px-4 pt-2 pb-4">
        {children}
      </div>
    </div>
  );
}

const SidebarLink = ({
  href,
  icon,
  pathname,
  text,
}: {
  pathname: string;
  icon: IconName;
  href: string;
  text: string;
}) => {
  const isActive = pathname.startsWith(href);

  return (
    <Button
      className={cn("rounded-none justify-start items-center gap-2", {
        "w-[100%+1px] -mr-px": isActive,
      })}
      variant={isActive ? "secondary" : "ghost"}
      asChild
    >
      <Link href={href}>
        <Icon name={icon} />
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </Link>
    </Button>
  );
};
