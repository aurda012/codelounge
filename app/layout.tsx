import type { Metadata } from "next";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import React from "react";
import "./globals.css";
import "../styles/prism.css";
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
  title: "CodeLounge",
  description:
    "A community-driven platform for asking and answering questions. Get Help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structure, and more.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
  keywords: keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${spaceGrotesk.variable} custom-scrollbar`}
      >
        <ThemeProvider
          attribute="class"
          // defaultTheme="light"
          enableSystem
          // disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
