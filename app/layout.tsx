import type { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  generator: "CodeLounge",
  applicationName: "CodeLounge",
  referrer: "origin-when-cross-origin",
  title: "CodeLounge",
  description:
    "Welcome to CodeLounge, the go-to destination for programming enthusiasts and developers. A community-driven platform for discovering and sharing programming knowledge with fellow developers. Find answers to your coding problems, ask questions, engage with a vibrant community, explore comprehensive tutorials, and collaborate on innovative projects. Join the community today!",
  keywords: keywords,
  metadataBase: new URL("https://codelounge.vercel.app"),
  openGraph: {
    title: "CodeLounge",
    description:
      "Welcome to CodeLounge, the go-to destination for programming enthusiasts and developers. A community-driven platform for discovering and sharing programming knowledge with fellow developers. Find answers to your coding problems, ask questions, engage with a vibrant community, explore comprehensive tutorials, and collaborate on innovative projects. Join the community today!",
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
      "Welcome to CodeLounge, the go-to destination for programming enthusiasts and developers. A community-driven platform for discovering and sharing programming knowledge with fellow developers. Find answers to your coding problems, ask questions, engage with a vibrant community, explore comprehensive tutorials, and collaborate on innovative projects. Join the community today!",
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
      me: ["my-email", "my-link"],
    },
  },
  category: "programming",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} custom-scrollbar`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
