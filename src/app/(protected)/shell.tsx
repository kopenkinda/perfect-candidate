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
    <div className="flex flex-col lg:flex-row">
      <aside className="bg-background overflow-x-auto lg:w-[theme('size.52')] lg:border-r lg:border-b-0 border-b lg:h-[calc(100svh-theme('size.16'))] sticky top-[theme('size.16')] flex lg:flex-col">
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
        <div className="lg:mt-auto lg:border-t border-l lg:border-l-0 ml-2 lg:ml-0">
          <FeedbackButton />
        </div>
      </aside>
      <div className="lg:w-[calc(100vw-theme('size.52'))]">{children}</div>
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
        "lg:mb-0 lg:w-[calc(100%+1px)] lg:-mr-px": isActive,
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
