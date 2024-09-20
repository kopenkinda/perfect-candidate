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
import { naSignIn } from "~/auth";
import { Button } from "~/components/ui/button";
import { Divider } from "~/components/ui/divider";
import { loginWithProvider } from "./actions";

const AuthLayout = function ({
  children,
  ...rest
}: Readonly<{ children?: React.ReactNode }>): JSX.Element {
  const path = usePathname();
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") ?? undefined;
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
          <form action={loginWithProvider} className="flex gap-2 mb-2">
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

          {path.includes("signin") ? (
            <Button asChild variant="ghost" size="full" className="underline">
              <Link href="/signup">Dont have an account?</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="full" className="underline">
              <Link href="/signin">Already have an account?</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
