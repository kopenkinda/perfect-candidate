import { MiddlewareConfig } from "next/server";
import { auth } from "~/auth";
import { routes } from "./auth/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isOnApiAuthRoute = nextUrl.pathname.startsWith(routes.auth.apiPrefix);
  const isOnAuthRoute = routes.auth.routes.includes(nextUrl.pathname);
  const isOnPublicRoute = routes.publicRoutes.includes(nextUrl.pathname);

  if (isOnApiAuthRoute) {
    return;
  }

  if (isOnAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(routes.DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isOnPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(routes.LOGIN + "?callbackUrl=" + encodedCallbackUrl, nextUrl)
    );
  }

  return;
});

export const config: MiddlewareConfig = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
