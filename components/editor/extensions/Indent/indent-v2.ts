import { Extension } from "@tiptap/core";
import { split } from "postcss/lib/list";

let indentLevel = 2;

export const IndentExtension = Extension.create({
  name: "indent",
  addOptions: () => ({}),
  addCommands: () => {
    return {
      indent:
        () =>
        ({ tr, editor }: { tr: any; editor: any }) => {
          if (!editor.isActive("codeBlock")) {
            return false;
          }
          const { $from, $to } = tr.selection;
          if (!$from) return false;
          const from = tr.mapping.map($from.pos);
          const to = tr.mapping.map($to.pos);
          if (from === to) {
            const indent = " ".repeat(indentLevel);
            tr.insertText(indent, from);

            return true;
          }
        },
      outdent:
        () =>
        ({ tr, editor }: { tr: any; editor: any }) => {
          if (!editor.isActive("codeBlock")) {
            return false;
          }
          const { $from, $to } = tr.selection;
          if (!$from) return false;
          const from = tr.mapping.map($from.pos);
          const to = tr.mapping.map($to.pos);

          const nodeOffset = $from?.textOffset;
          const nodeContent = $from?.parent?.textContent;
          if (from === to) {
            // Indent the code block
            const outdentContent = nodeContent.slice(
              nodeOffset - indentLevel,
              nodeOffset
            );
            const outdentSpaces = " ".repeat(indentLevel);
            if (outdentContent === outdentSpaces) {
              tr.delete(from - indentLevel, from);
            }
            return true;
          }
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      // ↓ your new keyboard shortcut
      Tab: () => this.editor.commands.indent(),
      "Shift-Tab": () => this.editor.commands.outdent(),
    };
  },
});
