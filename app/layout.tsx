import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import React from "react";
import "./globals.css";
import "@/styles/prism.css";
import { keywords } from "@/constants/metadata";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} custom-scrollbar`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <NextTopLoader
            showSpinner={false}
            color="#1FA2FF"
            shadow="0 0 10px #1FA2FF,0 0 5px #1FA2FF"
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  generator: "CodeLounge",
  applicationName: "CodeLounge",
  referrer: "origin-when-cross-origin",
  title: "CodeLounge",
  description:
    "Find answers to your coding problems. CodeLounge is a community-driven platform designed to empower developers worldwide. Ask questions, engage with the community and collaborate on projects.",
  keywords: keywords,
  metadataBase: new URL("https://codelounge.vercel.app"),
  openGraph: {
    title: "CodeLounge",
    description:
      "Find answers to your coding problems. CodeLounge is a community-driven platform designed to empower developers worldwide. Ask questions, engage with the community and collaborate on projects.",
    url: "https://codelounge.vercel.app",
    siteName: "CodeLounge",
    images: [
      {
        url: "https://codelounge.vercel.app/images/og-image-1200x628.png", // Must be an absolute URL
        width: 1200,
        height: 628,
        alt: "CodeLounge OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeLounge",
    description:
      "Find answers to your coding problems. CodeLounge is a community-driven platform designed to empower developers worldwide. Ask questions, engage with the community and collaborate on projects.",
    images: ["https://codelounge.vercel.app/images/og-image-1200x628.png"], // Must be an absolute URL
  },
  icons: {
    icon: "/images/site-logo.svg",
    shortcut: "/images/favicon-32x32.png",
    apple: "/images/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: false,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
    },
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["my-link"],
    },
  },
  category: "software development",
};
