"use client";

import Image from "next/image";
import * as React from "react";
import { Button } from "~/components/ui/button";
import { Divider } from "~/components/ui/divider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SiGoogle as GoogleIcon,
  SiLinkedin as LinkedInIcon,
  SiGithub as GithubIcon,
} from "@icons-pack/react-simple-icons";

const AuthLayout = function ({
  children,
}: Readonly<{ children?: React.ReactNode }>): JSX.Element {
  const path = usePathname();
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="bg-base-200 rounded-box grid grid-cols-2 max-w-3xl mt-12 w-full overflow-hidden">
        <div className="col-span-2 sm:col-span-1">
          <Image
            src="/images/auth-bg.jpg"
            alt="Authentication background"
            className="object-cover w-full h-full sm:order-2"
            priority
            width={960}
            height={640}
          />
        </div>
        <div className="col-span-2 sm:col-span-1 p-4 sm:-order-1">
          {children}
          <Divider>or</Divider>
          <div className="flex gap-2 mb-2">
            {/* TODO: Implement OAuth providers */}
            <Button className="grow">
              <GoogleIcon className="w-4 h-4" />
            </Button>
            <Button className="grow">
              <LinkedInIcon className="w-4 h-4" />
            </Button>
            <Button className="grow">
              <GithubIcon className="w-4 h-4" />
            </Button>
          </div>
          {path.includes("signin") ? (
            <Button asChild variant="ghost" wide="full" className="underline">
              <Link href="/signup">Dont have an account?</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" wide="full" className="underline">
              <Link href="/signin">Already have an account?</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
