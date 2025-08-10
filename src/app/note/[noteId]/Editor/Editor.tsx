"use client";

import { BlockNoteView, Theme } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css"

import "./styles.css"

export interface EditorProps {
  image?: Blob | null;
}

export default function Editor({ image }: EditorProps) {
  const editor = useCreateBlockNote();

  useEffect(() => {
    if (image && editor) {
      // Convert blob to data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        
        // Insert image block at current cursor position
        editor.insertBlocks(
          [
            {
              type: "image",
              props: {
                url: dataUrl,
                caption: "",
              },
            },
          ],
          editor.getTextCursorPosition().block,
          "after"
        );
      };
      reader.readAsDataURL(image);
    }
  }, [image, editor]);


  return <BlockNoteView editor={editor} />;
}