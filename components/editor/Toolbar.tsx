import { Editor } from "@tiptap/react";
import { ToolbarInlineAdvanced } from "./TextInlineAdvanced";
import { ToolbarAlignment } from "./ToolbarAlignment";
import { ToolbarBlock } from "./ToolbarBlock";
import { ToolbarHeadings } from "./ToolbarHeadings";
import { ToolbarInline } from "./ToolbarInline";
import { ToolbarMedia } from "./ToolbarMedia";
import styles from "./Toolbar.module.css";

type Props = {
  editor: Editor;
};

export function Toolbar({ editor }: Props) {
  return (
    <div className={styles.toolbar}>
      <div>
        <ToolbarHeadings editor={editor} />
      </div>
      <div className={styles.toolbarSection}>
        <ToolbarInline editor={editor} />
      </div>
      <div className={styles.toolbarSection}>
        <ToolbarInlineAdvanced editor={editor} />
      </div>
      <div className={styles.toolbarSection}>
        <ToolbarAlignment editor={editor} />
      </div>
      <div className={styles.toolbarSection}>
        <ToolbarBlock editor={editor} />
      </div>
      <div className={styles.toolbarSection}>
        <ToolbarMedia editor={editor} />
      </div>
    </div>
  );
}
