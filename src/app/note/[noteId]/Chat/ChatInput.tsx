import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string
  setInput: (input: string) => void
  sendMessage: ({ text }: { text: string }) => void
  isLoading: boolean
}

export default function ChatInput({ input, setInput, sendMessage, isLoading }: ChatInputProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLoading || !input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
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
        className="absolute right-1 bottom-1 flex items-center justify-center size-6 bg-foreground text-background p-2 border-[.5px] border-neutral-200 rounded-md cursor-pointer transition-all hover:bg-foreground/90">
          {isLoading ? (
            <div className="w-2 h-2 border border-current border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Send className="size-2.5 stroke-[2.5px]" />
          )}
      </button>
    </form>
  )
}