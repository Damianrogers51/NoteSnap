import { UIMessage } from "@ai-sdk/react";

export default function UserMessage({ message }: { message: UIMessage }) {
  return (
    <div className="flex space-x-2 justify-end">
      <div className="max-w-[70%] bg-background border-[.5px] border-neutral-200 px-3 py-2 rounded-lg">
        {message.parts.map((part, index) => {
          if (part.type === 'text') {
            return <div key={index}>{part.text}</div>
          }
        })}
      </div>
    </div>
  )
}