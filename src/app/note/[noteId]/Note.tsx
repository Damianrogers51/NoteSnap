'use client';

import { useState, useTransition } from "react";
import { useCompanion } from "@/app/hooks/useCompanion";
import { DynamicEditor } from "./Editor/DynamicEditor";
import CompanionCode from "./CompanionCode";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2, PanelRight } from "lucide-react";
import TitleEditor from "./Editor/TitleEditor";
import Chat from "./Chat/Chat";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { extractTextFromBlocks } from "@/lib/utils";

export interface Note {
  id: string
  display_id: string
  title: string
  content: string
  updated_at: string
}

export default function Note({ note }: { note: Note }) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [system, setSystem] = useState(`This is the note: ${extractTextFromBlocks(note.content)}`)
  const { messages, sendMessage, setMessages, status } = useChat({
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest: ({ id, messages }) => {
      return {
        body: {
          id,
          system,
          messages
        },
      };
    }}),
  })

  const [isTitleSavePending, startTitleSaveTransition] = useTransition()
  const [isEditorSavePending, startEditorSaveTransition] = useTransition()
  const [image] = useCompanion(note.id);
  const router = useRouter();

  function handleBack() {
    router.push('/')
  }

  function handleChatToggle() {
    setIsChatOpen((prev) => !prev)
  }

  function handleNewChat() {
    setMessages([])
  }

  return (
    <div className="w-full">
      <div className={`w-full relative sm:space-y-4 space-y-8 transition-all ${isChatOpen ? 'md:pr-72 pr-0' : ''}`}>
        <div className="sticky top-0 left-0 right-0 bg-background sm:bg-transparent p-4 sm:border-none border-b-[.5px] border-neutral-200 z-[10]">
          <div className="flex">
            <div className="flex items-center text-[#8c8c8c] space-x-3">
              <button onClick={handleBack} className="bg-background hover:text-foreground hover:bg-neutral-100 transition cursor-pointer border-[.5px] border-neutral-200 shadow-xs rounded-lg p-2">
                <ChevronLeft className="size-4 stroke-[2.5px]" />
              </button>
              {(isTitleSavePending || isEditorSavePending) && (
                <Loader2 className="size-4 animate-spin stroke-[2px]" />
              )}
            </div>

            <div className="flex text-[#8c8c8c] ml-auto space-x-2">
              <CompanionCode displayId={note.display_id} />
              <button onClick={handleChatToggle} className="bg-background hover:text-foreground hover:bg-neutral-100 transition cursor-pointer border-[.5px] border-neutral-200 shadow-xs rounded-lg px-3 py-2">
                <PanelRight className="size-4 stroke-[2.5px] cursor-pointer" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center w-full h-full pb-8 px-4">
          <div className="flex flex-col w-full max-w-5xl space-y-8">
            <TitleEditor note={note} startTitleSaveTransition={startTitleSaveTransition} />
            <DynamicEditor 
              note={note}
              image={image}
              setSystem={setSystem}
              startEditorSaveTransition={startEditorSaveTransition}
            />
          </div>
        </div>
      </div>

      {isChatOpen && (
        <Chat 
          messages={messages} 
          sendMessage={sendMessage} 
          status={status} 
          setIsChatOpen={setIsChatOpen} 
          handleNewChat={handleNewChat}
        />
      )}
    </div>
  );
}