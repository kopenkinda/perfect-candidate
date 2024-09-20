import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import { AppNavigation } from "~/components/app-navigation";
import { themeConfig } from "~/config/theme.config";
import { auth } from "~/auth";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

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
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            value={{ light: themeConfig.light, dark: themeConfig.dark }}
          >
            <AppNavigation />
            <main className="p-4 pt-0">{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
