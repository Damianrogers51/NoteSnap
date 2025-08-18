'use client';

import { Textarea } from '@/components/ui/textarea';
import { UIMessage } from '@ai-sdk/react';
import { Plus, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import ExamplePrompts from './ExamplePrompts';
import Messages from './Messages';

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLoading || !input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 md:w-72 w-full flex justify-end shadow-xs z-[20]">
      <div onClick={() => setIsChatOpen(false)} className="fixed size-full md:hidden block md:bg-transparent bg-black/50" />

      <div 
        className="absolute right-0 md:w-full w-[80%] h-full bg-neutral-50 p-4 border-l-[.5px] border-neutral-200 flex flex-col overscroll-contain"
        onWheelCapture={(e) => e.stopPropagation()}
      >
        {!isInitial && (
          <div className="sticky top-0 left-0 right-0 flex items-center justify-between text-[#8c8c8c] border-b-[.5px] border-neutral-200 pb-4">
            <div className="font-medium"> Chat </div>
            <button onClick={handleNewChat} className="flex items-center justify-center size-6 text-[#8c8c8c] cursor-pointer border-[.5px] border-neutral-300 rounded-md transition-all hover:bg-neutral-200">
              <Plus className="size-2.5 stroke-[2.5px]" />
            </button>
          </div>
        )}

        <div 
          className="flex-1 overflow-y-auto"
          onWheelCapture={(e) => e.stopPropagation() }
          style={{ overscrollBehavior: 'contain' }}
        >
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

          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={4}
              placeholder={isLoading ? "AI is thinking..." : "Type a message..."}
              disabled={isLoading}
              className={`w-full resize-none pb-8 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />

            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="absolute right-1 bottom-1 size-6 flex items-center justify-center bg-foreground text-background p-2 border-[.5px] border-neutral-200 rounded-md cursor-pointer transition-all"
            >
              {isLoading ? (
                <div className="w-2 h-2 border border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="size-2.5 stroke-[2.5px]" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}