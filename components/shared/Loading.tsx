"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export const Loading = ({ message }: { message: string }) => {
  const { theme } = useTheme();
  console.log("loading component");
  return (
    <div className="z-[9999] fixed top-0 left-0 h-screen w-screen flex flex-col justify-center items-center backdrop-blur-sm bg-white/30 dark:bg-black/30">
      <Image
        src={`/images/${theme === "light" ? "logo-light" : "logo-dark"}.svg`}
        alt="Logo"
        width={156}
        height={38}
        // className="animate-spin duration-700"
      />
      {message && (
        <p className="paragraph-semibold text-dark200_light900 mt-5">
          {message}
        </p>
      )}
    </div>
  );
};
