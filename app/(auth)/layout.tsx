"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import DarkModeSwitcher from "@/components/shared/dark-mode-switcher";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          formButtonPrimary: "primary-gradient border-primary-500",
          footerActionLink: "primary-text-gradient hover:text-primary-500",
        },
      }}
    >
      <div className="flex min-h-screen w-full items-center justify-center">
        {children}
        <DarkModeSwitcher />
      </div>
    </ClerkProvider>
  );
}
