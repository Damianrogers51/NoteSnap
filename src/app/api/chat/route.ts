import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, UIMessage } from 'ai';

export async function POST(request: Request) {
  const { messages, system }: { messages: UIMessage[], system: string } = await request.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system,
    messages: convertToModelMessages(messages),
  });

  console.log(result.toUIMessageStreamResponse());

  return result.toUIMessageStreamResponse();
}