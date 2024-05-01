import { Editor } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "@/components/editor/icons";
import { Button } from "@/components/ui/button";

type Props = {
  editor: Editor;
};

export function ToolbarAlignment({ editor }: Props) {
  return (
    <>
      <Button
        variant="ghost"
        className="p-2"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("left").run();
        }}
        disabled={!editor.can().chain().focus().setTextAlign("left").run()}
        data-active={
          editor.isActive({ textAlign: "left" }) ? "is-active" : undefined
        }
        aria-label="Align left"
      >
        <AlignLeftIcon />
      </Button>

      <Button
        variant="ghost"
        className="p-2"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("center").run();
        }}
        disabled={!editor.can().chain().focus().setTextAlign("center").run()}
        data-active={
          editor.isActive({ textAlign: "center" }) ? "is-active" : undefined
        }
        aria-label="Align center"
      >
        <AlignCenterIcon />
      </Button>

      <Button
        variant="ghost"
        className="p-2"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("right").run();
        }}
        disabled={!editor.can().chain().focus().setTextAlign("right").run()}
        data-active={
          editor.isActive({ textAlign: "right" }) ? "is-active" : undefined
        }
        aria-label="Align right"
      >
        <AlignRightIcon />
      </Button>
    </>
  );
}
