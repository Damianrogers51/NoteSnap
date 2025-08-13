import { createClient } from "@/lib/supabase/server"
import NotePreviews from "./NotePreviews"

export const revalidate = 0;

export default async function Notes() {
  const supabase = await createClient()
  const { data: notes, error } = await supabase.from('notes').select('*').order('updated_at', { ascending: false })
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <NotePreviews notes={notes} />
  )
}