'use client';

import { useTransition } from "react";
import { useCompanion } from "@/app/hooks/useCompanion";
import { DynamicEditor } from "./Editor/DynamicEditor";
import CompanionCode from "./CompanionCode";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import TitleEditor from "./Editor/TitleEditor";

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

  function handleBack() {
    router.push('/')
  }

  return (
    <div className="relative flex justify-center w-screen h-full pb-8">
      <div className="fixed top-0 left-0 right-0 bg-background sm:bg-transparent sm:px-4 sm:py-4 px-2 py-2 flex sm:border-none border-b-[.5px] border-neutral-100 z-10">
        <div className="flex items-center space-x-2 backdrop-blur-sm">
          <button onClick={handleBack} className="text-neutral-300 hover:text-foreground transition cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {(isTitleSavePending || isEditorSavePending) && (
            <Loader2 className="size-3 animate-spin text-neutral-300" />
          )}
        </div>

        <div className="flex items-center text-neutral-300 ml-auto">
          <CompanionCode displayId={note.display_id} />
        </div>
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