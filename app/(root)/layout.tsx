import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import dynamic from "next/dynamic";
const NavBar = dynamic(() => import("@/components/shared/navbar/NavBar"));
const LeftSideBar = dynamic(
  () => import("@/components/shared/sidebar/LeftSideBar")
);
const RightSideBar = dynamic(
  () => import("@/components/shared/sidebar/RightSideBar")
);
import { Toaster } from "@/components/ui/toaster";

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
          <RightSideBar />
        </div>
        <Toaster />
      </main>
    </ClerkProvider>
  );
};

export default Layout;
