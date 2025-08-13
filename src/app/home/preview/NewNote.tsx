'use client'

import { useTransition } from "react";
import { CopyPlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewNote() {
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
        console.log(error)
      }
    })
  }

  return (
    <div className="flex flex-col">
      <div
        onClick={handleCreateNote}
        className="flex items-center justify-center aspect-video bg-neutral-100 border-[.5px] border-neutral-300 rounded-xl overflow-hidden hover:bg-neutral-200 transition cursor-pointer space-y-2">
          <div className="flex flex-col items-center justify-center space-y-2 opacity-40">
            {isPending ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <CopyPlus className="size-3" />
            )}
            <div> Create Note </div>
          </div>
      </div>

      <div className="flex flex-col space-y-1 opacity-0">
        <div className="font-semibold tracking-[-.5px]"> Create Note </div>
        <div className="opacity-60"> Create a new note to get started </div>
      </div>
    </div>
  )
}