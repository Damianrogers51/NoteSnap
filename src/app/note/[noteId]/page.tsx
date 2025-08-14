import { createClient } from "@/lib/supabase/server";
import Note from "./Note";

export default async function NotePage({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params;

  const supabase = await createClient()
  const { data: note, error } = await supabase.from('notes').select('*').eq('id', noteId).single()
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex justify-center w-screen max-h-screen sm:px-8 px-4 py-24">
      <Note note={note} />
    </div>
  );
}