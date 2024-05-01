"use client";

import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
import styles from "./TextEditor.module.css";
import "@/styles/text-editor.css";
import "@/styles/index.css";
import { ExtensionKit } from "./extensions/extension-kit";

export default function ReadTextEditor({ content }: { content: JSONContent }) {
  // Set up editor with plugins, and place user info into Yjs awareness and cursors
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: styles.editorReadOnly,
      },
    },
    editable: false,
    content,
    extensions: [...ExtensionKit],
  });

  return (
    <div className="flex flex-col relative text-dark300_light700 rounded-[8px] min-w-full mx-auto">
      <div className="flex-1 overflow-y-scroll p-0 min-w-full mx-auto">
        <EditorContent
          editor={editor}
          className="relative min-h-[250px] p-0 min-w-full mx-auto"
        />
      </div>
    </div>
  );
}
