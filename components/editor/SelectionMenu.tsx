import { BubbleMenu, Editor } from "@tiptap/react";
import { ToolbarInlineAdvanced } from "./TextInlineAdvanced";
import { ToolbarInline } from "./ToolbarInline";
import styles from "./TextEditor.module.css";
import { useCallback } from "react";
import { ShouldShowProps } from "./types";
import isCustomNodeSelected from "@/lib/utils";

type Props = {
  editor: Editor;
};

export function SelectionMenu({ editor }: Props) {
  const shouldShow = useCallback(
    ({ view, from }: ShouldShowProps) => {
      if (!view) {
        return false;
      }

      const domAtPos = view.domAtPos(from || 0).node as HTMLElement;
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement;
      const node = nodeDOM || domAtPos;

      if (isCustomNodeSelected(editor, node)) {
        return false;
      }

      return true;
    },
    [editor]
  );
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ zIndex: 99 }}
      shouldShow={shouldShow}
      className="bg-light-850 dark:bg-dark-100 rounded-[8px]"
    >
      {shouldShowBubbleMenu(editor) ? (
        <div className={styles.bubbleMenuWrapper}>
          <ToolbarInline editor={editor} />
          <ToolbarInlineAdvanced editor={editor} />
        </div>
      ) : null}
    </BubbleMenu>
  );
}

export function shouldShowBubbleMenu(editor: Editor) {
  const canBold = editor.can().chain().focus().toggleBold().run();
  const canItalic = editor.can().chain().focus().toggleItalic().run();
  const canStrike = editor.can().chain().focus().toggleStrike().run();
  const canCode = editor.can().chain().focus().toggleCode().run();
  return canBold || canItalic || canStrike || canCode;
}
