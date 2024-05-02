"use client";

import { Editor } from "@tiptap/react";
import { useState } from "react";
import { lowlight } from "lowlight";
import {
  CodeBlockIcon,
  ImageIcon,
  YouTubeIcon,
} from "@/components/editor/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import styles from "./Toolbar.module.css";
import { set } from "mongoose";
import { ScrollArea } from "../ui/scroll-area";

const languages = [
  {
    value: "arduino",
    label: "Arduino",
  },
  {
    value: "bash",
    label: "Bash",
  },
  {
    value: "c",
    label: "C",
  },
  {
    value: "cpp",
    label: "Cpp",
  },
  {
    value: "csharp",
    label: "C#",
  },
  {
    value: "css",
    label: "Css",
  },
  {
    value: "diff",
    label: "Diff",
  },
  {
    value: "go",
    label: "Go",
  },
  {
    value: "graphql",
    label: "Graphql",
  },
  {
    value: "ini",
    label: "Ini",
  },
  {
    value: "java",
    label: "Java",
  },
  {
    value: "javascript",
    label: "JavaScript",
  },
  {
    value: "json",
    label: "JSON",
  },
  {
    value: "kotlin",
    label: "Kotlin",
  },
  {
    value: "less",
    label: "Less",
  },
  {
    value: "lua",
    label: "Lua",
  },
  {
    value: "makefile",
    label: "Makefile",
  },
  {
    value: "markdown",
    label: "Markdown",
  },
  {
    value: "objectivec",
    label: "Objective-C",
  },
  {
    value: "perl",
    label: "Perl",
  },
  {
    value: "php",
    label: "Php",
  },
  {
    value: "php-template",
    label: "Php-template",
  },
  {
    value: "plaintext",
    label: "Plaintext",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "python-repl",
    label: "Python-repl",
  },
  {
    value: "r",
    label: "R",
  },
  {
    value: "ruby",
    label: "Ruby",
  },
  {
    value: "rust",
    label: "Rust",
  },
  {
    value: "scss",
    label: "Scss",
  },
  {
    value: "shell",
    label: "Shell",
  },
  {
    value: "sql",
    label: "Sql",
  },
  {
    value: "swift",
    label: "Swift",
  },
  {
    value: "typescript",
    label: "TypeScript",
  },
  {
    value: "vbnet",
    label: "VBnet",
  },
  {
    value: "wasm",
    label: "Wasm",
  },
  {
    value: "xml",
    label: "Xml",
  },
  {
    value: "yaml",
    label: "Yaml",
  },
];

type Props = {
  editor: Editor;
};

export function ToolbarMedia({ editor }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="p-2"
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            role="combobox"
            aria-expanded={open}
            aria-label="Code block"
          >
            <CodeBlockIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-72 w-48">
                {languages.map((lang) => (
                  <CommandItem
                    key={lang.value}
                    value={lang.value}
                    onSelect={(currentValue) => {
                      editor
                        .chain()
                        .focus()
                        .setCodeBlock({ language: currentValue })
                        .run();
                      setOpen(false);
                    }}
                  >
                    {lang.label}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        className="p-2"
        variant="ghost"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setImageUpload().run();
        }}
        disabled={!editor.can().chain().setImage({ src: "" }).run()}
        data-active={editor.isActive("image") ? "is-active" : undefined}
        aria-label="Image"
      >
        <ImageIcon />
      </Button>
    </>
  );
}
