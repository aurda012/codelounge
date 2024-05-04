import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ShortcutsMenu() {
  return (
    <div className="hidden sm:flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Shortcuts
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>Keyboard Shortcuts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Copy</span>
              <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Cut</span>
              <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Paste</span>
              <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Paste w/o Format</span>
              <DropdownMenuShortcut>⌘⇧V</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Undo</span>
              <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Redo</span>
              <DropdownMenuShortcut>⌘⇧Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Line Break</span>
              <DropdownMenuShortcut>⇧Enter</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Indent</span>
              <DropdownMenuShortcut>Tab</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Outdent</span>
              <DropdownMenuShortcut>⇧Tab</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
