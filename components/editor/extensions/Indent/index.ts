import { Extension } from "@tiptap/core";
import { split } from "postcss/lib/list";

let indentLevel = 2;

export const IndentExtension = Extension.create({
  name: "indent",
  addOptions: () => ({}),
  addCommands: () => {
    return {
      deleteOriginal:
        () =>
        ({ tr, editor }: { tr: any; editor: any }) => {
          if (!editor.isActive("codeBlock")) {
            return false;
          }
          const { $from, $to } = tr.selection;

          const textNode = $from?.doc?.content?.content[0]?.content?.content[0];
          if (textNode && textNode.text) {
            // console.log("DELETED ORIGINAL");
            // here we use tr.mapping.map to map the position between transaction steps
            const from = tr.mapping.map($from.pos);
            const to = tr.mapping.map($to.pos);

            tr.delete(from, to);

            return true;
          } else {
            return true;
          }
        },
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
          // console.log({ from, to });
          // Get the current block and check if it is a code block
          const nodeOffset = $from?.textOffset;
          const nodeContent = $from?.parent?.textContent;
          // console.log({ nodeOffset, nodeContent });

          if (nodeContent) {
            // Check for whitespace at end of node
            const nodeEndOffset =
              $from?.parent?.textContent.length -
              $from?.parent?.textContent.trimEnd().length;
            // console.log({ nodeEndOffset });
            if (nodeEndOffset > 0) {
              tr.delete(nodeContent.length - nodeEndOffset, nodeContent.length);
            }

            // Keep track of total indents
            let indentCount = 0;
            // Keep track of total character count for indented lines
            let linesCharCount = 0;
            // Length of selected text
            let selectedCount = to - from;
            // Split the text into lines
            const splitIntoLines = nodeContent.trimEnd().split("\n");
            // Indent Lines only if part of selected text
            const splitIntoLinesIndented = splitIntoLines.map(
              (line: string) => {
                if (linesCharCount <= selectedCount) {
                  const indented = " ".repeat(indentLevel) + line;
                  // console.log({ indented });
                  indentCount += indentLevel;
                  linesCharCount += line.length + 2;
                  return indented;
                } else {
                  return line;
                }
              }
            );
            let indentedText = splitIntoLinesIndented.join("\n").trimEnd();
            if (selectedCount === 0) {
              // console.log("Selected None");
              indentedText = indentedText.slice(0, to - from + indentCount);
            }
            if (selectedCount < nodeContent.trim().length) {
              // console.log("Selected Some");
              indentedText = indentedText.slice(
                0,
                to - from + indentCount + nodeOffset
              );
            }
            tr.delete(from, to);
            tr.insertText(indentedText, from - nodeOffset);
            if (
              selectedCount !== 0 &&
              selectedCount <= nodeContent.trim().length
            ) {
              // console.log("Selected Some or All");
              tr.delete(
                from - nodeOffset + indentedText.length,
                from + indentedText.length
              );
            }

            return true;
          } else {
            // Initial indent for the code block
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
          const nodePos = $from?.pos;
          // console.log({ nodeOffset, nodeContent, nodePos });

          if (nodeContent) {
            tr.delete(nodePos, nodePos + nodeContent.length - nodeOffset);
            // Keep track of total outdents
            let outdentCount = 0;
            // Keep track of total character count for outdented lines
            let linesCharCount = 0;
            // Length of selected text
            let selectedCount = to - from;
            // Split the text into lines
            const splitIntoLines = nodeContent.trimEnd().split("\n");
            const splitIntoLinesOutdented = splitIntoLines.map(
              (line: string) => {
                if (linesCharCount <= selectedCount) {
                  const spaces = line.search(/\S/);
                  if (spaces > 0 && spaces < indentLevel) {
                    const outdented = line.slice(spaces);
                    outdentCount -= indentLevel;
                    linesCharCount += line.length + 2;
                    return outdented;
                  } else if (spaces >= indentLevel) {
                    const outdented = line.slice(indentLevel);
                    outdentCount -= indentLevel;
                    linesCharCount += line.length + 2;
                    return outdented;
                  }
                } else {
                  return line;
                }
              }
            );
            let outdentedText = splitIntoLinesOutdented.join("\n").trimEnd();
            if (selectedCount === 0) {
              // console.log("Selected None");
            }
            if (selectedCount < nodeContent.trim().length) {
              // console.log("Selected Some");
            }
            tr.insertText(outdentedText, nodePos - nodeOffset);
            if (selectedCount <= nodeContent.trim().length) {
              // console.log("Selected Some or All");
              // tr.delete(
              //   from - nodeOffset + outdentedText.length,
              //   from + outdentedText.length
              // );
            }
            // console.log({ outdentedText });
            tr.delete(
              nodePos - nodeOffset + outdentedText.length,
              nodePos + outdentedText.length
            );
            // console.log({ tr });
            // if (selectedCount === 0) {
            //   tr.delete(
            //     from + nodeOffset + outdentedText.length,
            //     from + outdentedText.length
            //   );
            // }

            return true;
          } else {
            // console.log("UPDATING INDENT");
            // Indent the code block
            const indent = " ".repeat(indentLevel);
            tr.insertText(indent, from);

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
