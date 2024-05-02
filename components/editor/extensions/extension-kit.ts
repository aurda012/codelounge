import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import FileHandler from "@tiptap-pro/extension-file-handler";
import History from "@tiptap/extension-history";
import { lowlight } from "lowlight";
import { CustomTaskItem } from "./CustomTaskItem/CustomTaskItem";
import { ImageUpload } from "./ImageUpload";
import { ImageBlock } from "./ImageBlock";
import { Link } from "./Link";
// import { IndentExtension } from "./Indent";
import { IndentExtension } from "./Indent/indent-v2";
import API from "@/lib/api";

export const ExtensionKit = [
  StarterKit.configure({
    blockquote: {
      HTMLAttributes: {
        class: "tiptap-blockquote",
      },
    },
    code: {
      HTMLAttributes: {
        class: "tiptap-code",
      },
    },
    codeBlock: false,
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: "tiptap-heading",
      },
    },
    // The Collaboration extension comes with its own history handling
    history: false,
    horizontalRule: {
      HTMLAttributes: {
        class: "tiptap-hr",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "tiptap-list-item",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "tiptap-ordered-list",
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: "tiptap-paragraph",
      },
    },
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: null,
  }),
  Highlight.configure({
    HTMLAttributes: {
      class: "tiptap-highlight",
    },
  }),
  History.configure({
    depth: 20,
  }),
  Image.configure({
    HTMLAttributes: {
      class: "tiptap-image",
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "tiptap-link",
    },
  }),
  Placeholder.configure({
    placeholder: "Start writing…",
    emptyEditorClass: "tiptap-empty",
  }),
  CustomTaskItem,
  TaskList.configure({
    HTMLAttributes: {
      class: "tiptap-task-list",
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  IndentExtension,
  Typography,
  ImageUpload,
  ImageBlock,
  FileHandler.configure({
    allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    onDrop: (currentEditor, files, pos) => {
      files.forEach(async () => {
        const url = await API.uploadImage();

        currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run();
      });
    },
    onPaste: (currentEditor, files) => {
      files.forEach(async () => {
        const url = await API.uploadImage();

        return currentEditor
          .chain()
          .setImageBlockAt({
            pos: currentEditor.state.selection.anchor,
            src: url,
          })
          .focus()
          .run();
      });
    },
  }),
];
