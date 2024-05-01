import { Editor } from "@tiptap/react";
import { BoldIcon, ItalicIcon } from "@/components/editor/icons";
import { Button } from "@/components/ui/button";

type Props = {
  editor: Editor;
};

export function ToolbarInline({ editor }: Props) {
  return (
    <>
      <Button
        variant="ghost"
        className="p-2"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        data-active={editor.isActive("bold") ? "is-active" : undefined}
        aria-label="Bold"
      >
        <BoldIcon />
      </Button>

      <Button
        variant="ghost"
        className="p-2"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        data-active={editor.isActive("italic") ? "is-active" : undefined}
        aria-label="Italic"
      >
        <ItalicIcon />
      </Button>
    </>
  );
}
