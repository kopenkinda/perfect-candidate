"use client";

import {
  SiGithub as GithubIcon,
  SiGoogle as GoogleIcon,
  SiLinkedin as LinkedInIcon,
} from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { loginWithProvider } from "./actions";

const AuthLayout = function ({
  children,
}: Readonly<{ children?: React.ReactNode }>): JSX.Element {
  const pathname = usePathname();
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") ?? undefined;

  const isOnSignIn = pathname.includes("signin");
  const isOnError = pathname === "/auth-error";

  return (
    <div className="w-full h-[calc(100svh-theme('size.16'))] lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div>{children}</div>
          {!isOnError && (
            <>
              <div>
                <Separator className="mb-4" />
                <form action={loginWithProvider} className="flex gap-2">
                  <input type="hidden" name="callbackUrl" value={callbackUrl} />
                  <Button
                    className="grow"
                    type="submit"
                    value="google"
                    name="provider"
                  >
                    <GoogleIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    className="grow"
                    type="submit"
                    value="linkedin"
                    name="provider"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    className="grow"
                    type="submit"
                    value="github"
                    name="provider"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </Button>
                </form>
              </div>
              <div className="mt-4 text-center text-sm">
                {isOnSignIn ? (
                  <span>Don&apos;t have an account? </span>
                ) : (
                  <span>Already have an account? </span>
                )}
                <Link
                  href={isOnSignIn ? "/signup" : "/signin"}
                  className="underline"
                >
                  Sign {isOnSignIn ? "up" : "in"}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/images/auth-bg.jpg"
          alt="Authentication background"
          priority
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
