"use client";

import { Surface } from "../../ui/Surface";
import { Toolbar } from "../../ui/Toolbar";
import { Icon } from "../../ui/Icon";
import { useTheme } from "next-themes";

const NavDarkMode = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Surface className="flex items-center gap-1 z-[99999] p-1 rounded-[5px]">
      <Toolbar.Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        // active={theme === "light"}
        className="rounded-[5px]"
      >
        <Icon name={`${theme === "dark" ? "Sun" : "Moon"}`} />
      </Toolbar.Button>
    </Surface>
  );
};
export default NavDarkMode;
