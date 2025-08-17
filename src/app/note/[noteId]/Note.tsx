'use client';

import { useTransition } from "react";
import { useCompanion } from "@/app/hooks/useCompanion";
import { DynamicEditor } from "./Editor/DynamicEditor";
import CompanionCode from "./CompanionCode";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2, Share, QrCode } from "lucide-react";
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

  const [image] = useCompanion(note.id);
  const router = useRouter();

  function handleBack() {
    router.push('/')
  }

  return (
    <div className="relative flex justify-center w-screen h-full pb-8">
      <div className="fixed top-0 left-0 right-0 bg-background sm:bg-transparent p-4 flex sm:border-none border-b-[.5px] border-neutral-200 z-10">
        <div className="flex items-center text-foreground/60 space-x-3">
          <button onClick={handleBack} className="hover:text-foreground hover:bg-neutral-100 transition cursor-pointer border-[.5px] border-neutral-200 shadow-xs rounded-lg p-2">
            <ChevronLeft className="size-4 stroke-[2.5px]" />
          </button>
          {(isTitleSavePending || isEditorSavePending) && (
            <Loader2 className="size-4 animate-spin stroke-[2px]" />
          )}
        </div>

        <div className="ml-auto">
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