"use client";

import { Plate } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { plugins } from "./Plugins";
import { MutableRefObject } from "react";
import { cn } from "@/lib/utils";

type PlateEditorProps = {
  editorRef?: MutableRefObject<null>;
  value?: any;
  onChange?: (newValue: any) => void;
};

export default function PlateEditor({
  editorRef,
  value,
  onChange,
}: PlateEditorProps) {
  return (
    <div className="max-w-[1336px] rounded-[8px] bg-background shadow">
      <DndProvider backend={HTML5Backend}>
        <Plate plugins={plugins} value={value} onChange={onChange}>
          <div
            ref={editorRef}
            className={cn(
              "relative",
              // Block selection
              "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
            )}
          >
            <FixedToolbar className="rounded-t-[8px]">
              <FixedToolbarButtons />
            </FixedToolbar>
            <Editor
              className="px-8 py-6 min-h-[250px] rounded-b-[8px]"
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />
          </div>
        </Plate>
      </DndProvider>
    </div>
  );
}
