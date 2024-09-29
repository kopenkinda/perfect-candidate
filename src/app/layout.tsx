import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import { auth } from "~/auth";
import { AppNavigation } from "~/components/app-navigation";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { TRPCReactProvider } from "~/lib/trpc/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Perfect candidate",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            rel="shortcut icon"
            href="/images/logo.svg"
            type="image/x-icon"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TRPCReactProvider>
            <ThemeProvider defaultTheme="system" enableSystem attribute="class">
              <AppNavigation />
              <main>{children}</main>
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
