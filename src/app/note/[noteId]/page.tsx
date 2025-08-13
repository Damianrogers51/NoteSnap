import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import Note from "./Note";

export default async function NotePage({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params;

  const supabase = await createClient()
  const { data: note, error } = await supabase.from('notes').select('*').eq('id', noteId).single()
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Note note={note} />
    </Suspense>
  );
}