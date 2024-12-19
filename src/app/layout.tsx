import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, UserButton } from '@clerk/nextjs'
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Logo from "@/components/Logo";
import DesignerContextProvider from "@/components/contexts/DesignerContext";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap", // Ensures consistent font rendering
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextTopLoader />
          {/* Wrap client-side components in ThemeProvider */}
          <DesignerContextProvider>

            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
                <nav className="flex justify-between border-b items-center border-border h-[60px] px-4 py-2">
                  <Logo />
                  <div className="flex gap-4 items-center">
                    <ThemeSwitcher />
                    <UserButton afterSwitchSessionUrl='/sign-in' />
                  </div>
                </nav>
                <main className="flex size-full flex-grow">
                  {children}
                  <Toaster />
                  <Analytics />
                </main>
              </div>

            </ThemeProvider>
          </DesignerContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
