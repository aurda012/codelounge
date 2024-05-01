import { Editor } from "@tiptap/react";
import { useCallback, useState } from "react";
import {
  CodeIcon,
  CrossIcon,
  HighlightIcon,
  LinkIcon,
} from "@/components/editor/icons";
// import { Button } from "@/components/editor/primitives/Button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import styles from "./Toolbar.module.css";
import { LinkEditorPanel } from "./panels";

type Props = {
  editor: Editor;
};

export function ToolbarInlineAdvanced({ editor }: Props) {
  function toggleLink(link: string) {
    editor.chain().focus().toggleLink({ href: link }).run();
  }
  const onLink = useCallback(
    (url: string, inNewTab?: boolean) =>
      editor
        .chain()
        .focus()
        .setLink({ href: url, target: inNewTab ? "_blank" : "" })
        .run(),
    [editor]
  );

  return (
    <>
      <Button
        variant="ghost"
        className="p-2"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCode().run();
        }}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        data-active={editor.isActive("code") ? "is-active" : undefined}
        aria-label="Code"
      >
        <CodeIcon style={{ width: "18px" }} />
      </Button>

      <Button
        variant="ghost"
        className="p-2"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHighlight().run();
        }}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        data-active={editor.isActive("highlight") ? "is-active" : undefined}
        aria-label="Highlight"
      >
        <HighlightIcon style={{ width: "18px" }} />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="p-2"
            disabled={!editor.can().chain().focus().setLink({ href: "" }).run()}
            data-active={editor.isActive("link") ? "is-active" : undefined}
            aria-label="Link"
          >
            <LinkIcon style={{ width: "17px" }} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full">
          <LinkEditorPanel onSetLink={onLink} />
        </PopoverContent>
      </Popover>
    </>
  );
}

type LinkPopoverProps = {
  onSubmit: (url: string) => void;
  onRemoveLink: (url: string) => void;
  showRemove: boolean;
};

function LinkPopover({ onSubmit, onRemoveLink, showRemove }: LinkPopoverProps) {
  const [value, setValue] = useState("");

  return (
    <form className={styles.toolbarPopover}>
      <label className={styles.toolbarPopoverLabel} htmlFor="">
        Add link to selected text
      </label>
      <div className={styles.toolbarPopoverBar}>
        <Input
          className={`${styles.toolbarPopoverInput} no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border rounded-[8px]`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {showRemove ? (
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveLink(value);
            }}
            aria-label="Remove link"
          >
            <CrossIcon />
          </Button>
        ) : null}
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            onSubmit(value);
          }}
          className={styles.toolbarPopoverButton}
        >
          Add link
        </Button>
      </div>
    </form>
  );
}
