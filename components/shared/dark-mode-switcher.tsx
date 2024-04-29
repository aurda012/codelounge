"use-client";

import { Surface } from "../ui/Surface";
import { Toolbar } from "../ui/Toolbar";
import { Icon } from "../ui/Icon";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";

const DarkModeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  const Switcher = createPortal(
    <Surface className="flex items-center gap-1 fixed bottom-4 right-[calc(50vw-41px)] sm:bottom-6 sm:right-6 z-[99999] p-1 rounded-[5px]">
      <Toolbar.Button
        onClick={() => setTheme("light")}
        active={theme === "light"}
        className="rounded-[5px]"
      >
        <Icon name="Sun" />
      </Toolbar.Button>
      <Toolbar.Button
        onClick={() => setTheme("dark")}
        active={theme === "dark"}
        className="rounded-[5px]"
      >
        <Icon name="Moon" />
      </Toolbar.Button>
    </Surface>,
    document.body
  );
  return <>{Switcher}</>;
};
export default DarkModeSwitcher;
