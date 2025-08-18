import { Lightbulb } from "lucide-react"

const EXAMPLE_PROMPTS = [
  {
    title: 'Summerize this note',
    prompt: 'Generate a thorough summary for this note, outlining key topics and main ideas.',
  },
  {
    title: 'Create a list of potential test questions',
    prompt: 'Generate a list of 5 potential test questions for this note',
  },
]

interface ExamplePromptsProps {
  setInput: (input: string) => void
  sendMessage: ({ text }: { text: string }) => void
  isLoading?: boolean
}

export default function ExamplePrompts({ setInput, sendMessage, isLoading = false }: ExamplePromptsProps) {
  function handleSelectExamplePrompt(prompt: string) {
    if (isLoading) return;
    setInput(prompt);
    sendMessage({ text: prompt });
    setInput('');
  }

  return (
    <div className="flex flex-col space-y-2">
      {EXAMPLE_PROMPTS.map(example => (
        <div 
          key={example.title} 
          onClick={() => handleSelectExamplePrompt(example.prompt)} 
          className={`bg-background border-[.5px] border-neutral-200 rounded-lg px-3 py-2 transition-all ${
            isLoading 
              ? 'opacity-50 cursor-not-allowed' 
              : 'cursor-pointer hover:bg-neutral-100'
          }`}
        >
          <div className="flex items-center space-x-1">
            <Lightbulb className="size-3 stroke-[2.5px]" />
            <div className="font-medium"> {example.title} </div>
          </div>
          <div className="text-foreground/60"> {example.prompt} </div> 
        </div>
      ))}
    </div>
  )
}