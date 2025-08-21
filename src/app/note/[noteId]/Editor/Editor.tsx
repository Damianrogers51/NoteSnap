"use client";

import { useEffect, useMemo, useCallback, useRef, TransitionStartFunction } from "react";
import { Note } from "../Note";
import { Check } from "lucide-react";
import { BlockNoteView } from "@blocknote/mantine";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { toast } from "@/components/ui/toast"
import { extractTextFromBlocks } from "@/lib/utils";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css"

import "./styles.css"

export interface EditorProps {
  note: Note
  startEditorSaveTransition: TransitionStartFunction
  setSystem: (system: string) => void
  image?: ArrayBuffer;
}

export default function Editor({ note, startEditorSaveTransition, setSystem, image }: EditorProps) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
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
      const blob = new Blob([image], { type: 'image/jpeg' });
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
                previewWidth: 200,
              },
            },
          ],
          editor.getTextCursorPosition().block,
          "after"
        );
        toast({
          title: "Image Added",
          description: "An image has been successfully added to your note",
          icon: <Check className="size-3 text-green-600" />
        })
      };
      reader.readAsDataURL(blob);
    }
  }, [image, editor]);

  const saveDocument = useCallback((blocks: Block[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(async () => {
      startEditorSaveTransition(async () => {
        try {
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
          setSystem(`This is a log of the entire note: ${extractTextFromBlocks(JSON.stringify(blocks))}`)
        } catch (err) {
          console.error('Failed to save document:', err)
        }
      })
    }, 1000);
  }, [note.id, startEditorSaveTransition, setSystem]);

  return (
    <BlockNoteView 
      editor={editor} 
      onChange={() => saveDocument(editor.document)} 
      theme="light"
    />
  )
}