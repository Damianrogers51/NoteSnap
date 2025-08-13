import { TransitionStartFunction, useCallback, useEffect, useRef, useState } from "react"
import { Note } from "../Note";

export default function TitleEditor({ note, startTitleSaveTransition }: { note: Note, startTitleSaveTransition: TransitionStartFunction }) {
  const [, setTitle] = useState(note.title)

  const titleRef = useRef<HTMLDivElement>(null)
  const titleTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.textContent = note.title
    }
  }, [note.title])

  const handleTitleChange = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    const newTitle = e.currentTarget.textContent || 'Untitled';
    setTitle(newTitle);

    if (titleTimeoutRef.current) {
      clearTimeout(titleTimeoutRef.current);
    }

    titleTimeoutRef.current = setTimeout(async () => {
      startTitleSaveTransition(async () => {  
        try {
          const response = await fetch(`/api/notes/${note.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: newTitle
            })
          });
          
          if (!response.ok) {
            throw new Error('Failed to update title');
          }
        } catch (err) {
          console.error('Error updating title:', err);
        }
      })
    }, 1000);
  }, [note.id, startTitleSaveTransition])
  
  return (
    <div
      ref={titleRef}
      className="text-4xl font-bold pl-19 outline-none"
      contentEditable
      onInput={handleTitleChange}
      suppressContentEditableWarning={true}
    />
  )
}