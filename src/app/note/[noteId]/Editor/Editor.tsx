"use client";

import { useEffect, useMemo, useCallback } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { Note } from "../Note";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css"

import "./styles.css"

export interface EditorProps {
  note: Note
  image?: Blob;
  setIsSaving: (isSaving: boolean) => void;
}

export default function Editor({ note, image, setIsSaving }: EditorProps) {
  const editor = useMemo(() => {
    const initialContent = note.content !== null
      ? JSON.parse(note.content) as PartialBlock[]
      : undefined

    return BlockNoteEditor.create({
      initialContent,
      domAttributes: {
        editor: {
          style: 'font-family: "DM Sans", sans-serif;'
        }
      }
    })
  }, [note.content])

  useEffect(() => {
    if (image && editor) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
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

  const saveDocument = useCallback((() => {
    let timeoutId: NodeJS.Timeout;
    
    return (blocks: Block[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          setIsSaving(true)
          const response = await fetch(`/api/notes/${note.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: blocks
            })
          })
          if (!response.ok) {
            throw new Error('Failed to save document')
          }
          setIsSaving(false)
        } catch (error) {
          setIsSaving(false)
        }
      }, 2000);
    };
  })(), [note.id, setIsSaving]);

  return (
    <div className="size-full">
      <BlockNoteView 
        editor={editor} 
        onChange={() => saveDocument(editor.document)} 
        theme="light"
      />
    </div>
  )
}