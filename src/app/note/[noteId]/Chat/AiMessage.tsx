import { UIMessage } from "@ai-sdk/react";
import { Bot } from "lucide-react";

interface AiMessageProps {
  message: UIMessage
}

export default function AiMessage({ message }: AiMessageProps) {
  return (
    <div className="flex space-x-2 items-start">
      <div className="flex items-center justify-center size-6 bg-neutral-200 border-[.5px] border-neutral-300 rounded-md">
        <Bot className="size-2.5 stroke-[2px]" />
      </div>

      <div className="flex max-w-[70%] bg-background border-[.5px] border-neutral-200 px-3 py-2 rounded-lg relative">
        {message.parts.map((part, index) => {
          if (part.type === 'text') {
            return <div key={index}> {part.text} </div>
          }
        })} 
      </div>
    </div>
  )
}