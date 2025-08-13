'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import { useCompanion } from "@/app/hooks/useCompanion";
import { DynamicEditor } from "./Editor/DynamicEditor";
import Spinner from "@/components/ui/spinner";
import CompanionCode from "./CompanionCode";

export interface Attachment {
  url: string;
  name: string;
}

export interface Note {
  id: string
  title: string
  content: string
  updated_at: string
}

export default function Note({ note }: { note: Note }) {
  const [isSaving, setIsSaving] = useState(false)
  const [title, setTitle] = useState(note.title)
  const titleRef = useRef<HTMLDivElement>(null)
  let timeoutId: NodeJS.Timeout;

  const [image] = useCompanion(note.id);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.textContent = note.title
    }
  }, [note.title])

  const handleTitleChange = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    const newTitle = e.currentTarget.textContent || 'Untitled';
    setTitle(newTitle);
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
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
      } catch (error) {
        console.error('Error updating title:', error);
      }
    }, 1000);
  }, [note.id]);

  return (
    <div className="relative flex justify-center w-screen min-h-screen px-8 pt-12">
      <div className="fixed bottom-8 right-8 flex items-center space-x-2 text-neutral-300 z-10">
        {isSaving && (
          <Spinner />
        )}

        <CompanionCode noteId={note.id} />
      </div>

      <div className="flex flex-col w-full max-w-5xl space-y-8">
        <div
          ref={titleRef}
          className="text-4xl font-bold pl-19 outline-none"
          contentEditable
          onInput={handleTitleChange}
          suppressContentEditableWarning={true}
        >
        </div>

        <DynamicEditor 
          note={note}
          image={image ? new Blob([image]) : undefined}
          setIsSaving={setIsSaving}
        />
      </div>
    </div>
  );
}