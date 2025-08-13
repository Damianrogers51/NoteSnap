'use client'

import { useEffect, useState, useTransition } from "react"
import { Note } from "../../note/[noteId]/Note"
import NotePreview from "./NotePreview"
import NewNote from "./NewNote"

export default function NotePreviews({ notes }: { notes: Note[] }) {
  const [notesState, setNotesState] = useState(notes)
  const [, startTransition] = useTransition()

  const handleNoteDelete = (deletedNoteId: string) => {
    startTransition(() => {
      setNotesState(prevNotes => prevNotes.filter(note => note.id !== deletedNoteId))
    })
  }

  useEffect(() => {
    setNotesState(notes)
  }, [notes])

  return (
    <div className="w-full max-w-5xl space-y-8">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 gap-y-8">
        <NewNote />

        {notesState.map((note) => (
          <NotePreview key={note.id} note={note} onDelete={handleNoteDelete} />
        ))}
      </div>
    </div>
  )
}