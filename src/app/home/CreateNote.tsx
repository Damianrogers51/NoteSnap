'use client'

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import Spinner from "@/components/ui/spinner"

export default function CreateNote() {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  async function handleCreateNote() {
    startTransition(async () => {
      try {
        const response = await fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Failed to create note')
        }

        const newNote = await response.json()
        router.push(`/note/${newNote.id}`)
      } catch (error) {
        console.error(error)
      }
    })
  } 

  return (
    <button
      onClick={handleCreateNote}
      className="px-3 py-1 border-[.5px] border-neutral-300 rounded-md cursor-pointer">
        {isPending ? <Spinner /> : 'Create Note'}
    </button>
  )
}