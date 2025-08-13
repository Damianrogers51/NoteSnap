'use client';

import { useTransition } from "react";
import { useCompanion } from "@/app/hooks/useCompanion";
import { DynamicEditor } from "./Editor/DynamicEditor";
import CompanionCode from "./CompanionCode";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import TitleEditor from "./Editor/TitleEditor";

export interface Attachment {
  url: string;
  name: string;
}

export interface Note {
  id: string
  display_id: string
  title: string
  content: string
  updated_at: string
}

export default function Note({ note }: { note: Note }) {
  const [isTitleSavePending, startTitleSaveTransition] = useTransition()
  const [isEditorSavePending, startEditorSaveTransition] = useTransition()

  const [image] = useCompanion(note.display_id);
  const router = useRouter();

  return (
    <div className="relative flex justify-center w-screen min-h-screen px-8 pt-12">
      <div className="fixed top-8 left-8 flex items-center space-x-2">
        <button onClick={() => router.push('/')} className="text-neutral-300 hover:text-foreground transition cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
        </button>
        {(isTitleSavePending || isEditorSavePending) && (
          <Loader2 className="size-3 animate-spin text-neutral-300" />
        )}
      </div>

      <div className="fixed bottom-8 right-8 flex items-center space-x-2 text-neutral-300 z-10">
        <CompanionCode displayId={note.display_id} />
      </div>

      <div className="flex flex-col w-full max-w-5xl space-y-8">
        <TitleEditor note={note} startTitleSaveTransition={startTitleSaveTransition} />
        <DynamicEditor 
          note={note}
          image={image}
          startEditorSaveTransition={startEditorSaveTransition}
        />
      </div>
    </div>
  );
}