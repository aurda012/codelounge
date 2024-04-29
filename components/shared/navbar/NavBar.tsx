"use client";

import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
// import GlobalSearch from "../search/GlobalSearch";
import MobileNav from "./MobileNav";

const NavBar = () => {
  const { theme } = useTheme();

  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1 ">
        <Image
          src={`/assets/images/logo-${theme === "dark" ? "dark" : "light"}.svg`}
          width={160}
          height={30}
          alt="DevFlow"
        />
      </Link>
      {/* <GlobalSearch /> */}
      <div className="flex-between gap-5">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9",
              },
              variables: {
                colorPrimary: "#1FA2FF",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default NavBar;
