import { UIMessage } from "@ai-sdk/react";
import UserMessage from "./UserMessage";
import AiMessage from "./AiMessage";
import { Bot } from "lucide-react";

interface MessagesProps {
  messages: UIMessage[]
  status: string
}

export default function Messages({ messages, status }: MessagesProps) {
  return (
    <div className="flex flex-col space-y-2 py-4">
      {messages.map((message) => {
        switch(message.role) {
          case 'user':
            return <UserMessage key={message.id} message={message} />
          case 'assistant':
            return <AiMessage key={message.id} message={message} />
        }
      })}

      {status === 'submitted' && (
        <div className="flex space-x-2 items-center">
          <div className="flex items-center justify-center size-6 bg-neutral-200 border-[.5px] border-neutral-300 rounded-md">
            <Bot className="size-2.5 stroke-[2px]" />
          </div>

          <div className="flex max-w-[70%] bg-background border-[.5px] border-neutral-200 px-3 py-2 rounded-lg relative">
            <div className="flex space-x-1">
              <div className="size-1 bg-neutral-200 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="size-1 bg-neutral-200 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="size-1 bg-neutral-200 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}