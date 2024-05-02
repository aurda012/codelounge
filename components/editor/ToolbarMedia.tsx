import { Editor } from "@tiptap/react";
import { useState } from "react";
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
import styles from "./Toolbar.module.css";

type Props = {
  editor: Editor;
};

export function ToolbarMedia({ editor }: Props) {
  function addImage(url: string) {
    if (!url.length) {
      return;
    }
    editor.chain().setImageUpload().run();
    // editor.chain().setImage({ src: url }).run();
  }

  return (
    <>
      <Button
        className="p-2"
        variant="ghost"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCodeBlock().run();
        }}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        data-active={editor.isActive("codeBlock") ? "is-active" : undefined}
        aria-label="Code block"
      >
        <CodeBlockIcon />
      </Button>

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

      {/* <Popover>
        <PopoverTrigger asChild>
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
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full">
          <MediaPopover variant="image" onSubmit={addImage} />
        </PopoverContent>
      </Popover> */}
    </>
  );
}

type MediaPopoverProps = {
  variant: "image" | "youtube";
  onSubmit: (url: string) => void;
};

function MediaPopover({ variant, onSubmit }: MediaPopoverProps) {
  const [value, setValue] = useState("");

  return (
    <form className={styles.toolbarPopover}>
      <label className={styles.toolbarPopoverLabel} htmlFor="">
        Add {variant === "image" ? "image" : "YouTube"} URL
      </label>
      <div className={styles.toolbarPopoverBar}>
        <Input
          className={`${styles.toolbarPopoverInput} no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border rounded-[8px]`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            onSubmit(value);
          }}
          className={styles.toolbarPopoverButton}
        >
          Add {variant === "image" ? "image" : "video"}
        </Button>
      </div>
    </form>
  );
}
