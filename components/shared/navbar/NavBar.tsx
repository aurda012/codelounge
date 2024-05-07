"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { SignedIn, UserButton } from "@clerk/nextjs";
import dynamic from "next/dynamic";

const GlobalSearch = dynamic(() => import("../search/GlobalSearch"));
const MobileNav = dynamic(() => import("./MobileNav"));
import NavDarkMode from "./nav-dark-mode";

const NavBar = () => {
  const { theme } = useTheme();

  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1 ">
        <Image
          src={`/images/logo-${theme === "dark" ? "dark" : "light"}.svg`}
          width={160}
          height={30}
          alt="DevFlow"
        />
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <NavDarkMode />
        <SignedIn>
          <UserButton
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
