import { Editor } from "@tiptap/react";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const toolbarHeadings = [
  { value: "p", title: "Paragraph" },
  { value: "h1", title: "Heading 1" },
  { value: "h2", title: "Heading 2" },
  { value: "h3", title: "Heading 3" },
];

type Props = {
  editor: Editor;
};

export function ToolbarHeadings({ editor }: Props) {
  const onHeadingChange = useCallback(
    (value: string) => {
      if (!editor) {
        return;
      }

      switch (value) {
        case "p":
          editor.chain().focus().setParagraph().run();
          break;

        case "h1":
          editor.chain().focus().setHeading({ level: 1 }).run();
          break;

        case "h2":
          editor.chain().focus().setHeading({ level: 2 }).run();
          break;

        case "h3":
          editor.chain().focus().setHeading({ level: 3 }).run();
          break;
      }
    },
    [editor]
  );

  return (
    <Select value={getCurrentHeading(editor)} onValueChange={onHeadingChange}>
      <SelectTrigger className="w-[120px] focus:ring-0 focus:ring-offset-0 focus:border-none border-none background-light900_dark300">
        <SelectValue defaultValue={toolbarHeadings[0].value} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {toolbarHeadings.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function getCurrentHeading(editor: Editor) {
  if (editor.isActive("heading", { level: 1 })) {
    return "h1";
  }

  if (editor.isActive("heading", { level: 2 })) {
    return "h2";
  }

  if (editor.isActive("heading", { level: 3 })) {
    return "h3";
  }

  return "p";
}
