'use client';

import { UIMessage } from '@ai-sdk/react';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import ExamplePrompts from './ExamplePrompts';
import Messages from './Messages';
import ChatInput from './ChatInput';

interface ChatProps {
  messages: UIMessage[]
  sendMessage: ({ text }: { text: string }) => void
  status: string
  setIsChatOpen: (isChatOpen: boolean) => void
  handleNewChat: () => void
}

export default function Chat({ messages, sendMessage, status, setIsChatOpen, handleNewChat }: ChatProps) {
  const [input, setInput] = useState('');

  const isInitial = useMemo(() => {
    return messages.length <= 1
  }, [messages])

  const isLoading = status === 'submitted' || status === 'streaming';

  return (
    <div className="fixed top-0 bottom-0 right-0 md:w-72 w-full flex justify-end shadow-xs z-[20]">
      <div onClick={() => setIsChatOpen(false)} className="fixed size-full md:hidden block md:bg-transparent bg-black/50" />

      <div onWheelCapture={(e) => e.stopPropagation()} className="absolute right-0 flex flex-col md:w-full w-[80%] h-full bg-neutral-50 p-4 border-l-[.5px] border-neutral-200 overscroll-contain">
        {!isInitial && (
          <div className="sticky top-0 left-0 right-0 flex items-center justify-between border-b-[.5px] border-neutral-200 pb-4">
            <div className="font-medium"> Chat </div>
            <button onClick={handleNewChat} className="flex items-center justify-center size-6 text-[#8c8c8c] cursor-pointer border-[.5px] border-neutral-300 rounded-md transition-all hover:bg-neutral-200 hover:text-foreground">
              <Plus className="size-2.5 stroke-[2.5px]" />
            </button>
          </div>
        )}

        <div onWheelCapture={(e) => e.stopPropagation() } className="flex-1 overflow-y-auto overscroll-contain">
          {isInitial ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-xl font-semibold"> Chat with your notes </div>
              <div className="text-foreground/60"> Ask questions, get answers, and get things done. </div>
            </div>
          ) : (
            <Messages messages={messages} status={status} />
          )}
        </div>

        <div className="space-y-2">
          {isInitial && (
            <ExamplePrompts setInput={setInput} sendMessage={sendMessage} isLoading={isLoading} />
          )}

          <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}