import { createClient } from "@/lib/supabase/server"
import NotePreviews from "./NotePreviews"

export const revalidate = 0;

export default async function Notes() {
  const supabase = await createClient()
  const { data: partialNotes, error } = await supabase.from('notes').select('id, title, display_id, updated_at').order('updated_at', { ascending: false })
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <NotePreviews notes={partialNotes} />
  )
}