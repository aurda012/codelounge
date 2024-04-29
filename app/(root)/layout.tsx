"use client";

import DarkModeSwitcher from "@/components/shared/dark-mode-switcher";
import NavBar from "@/components/shared/navbar/NavBar";
import LeftSideBar from "@/components/shared/sidebar/LeftSideBar";
// import RightSideBar from "@/components/shared/sidebar/RightSideBar";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider>
      <main className="background-light850_dark100 relative">
        <NavBar />
        <div className="flex">
          <LeftSideBar />
          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </section>
          {/* <RightSideBar /> */}
        </div>
        <Toaster />
        <DarkModeSwitcher />
      </main>
    </ClerkProvider>
  );
};

export default Layout;
