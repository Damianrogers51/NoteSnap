'use client'

import { useEffect, useState } from "react"
import NotePreview from "./NotePreview"
import NewNote from "./NewNote"
import { Note } from "@/app/note/[noteId]/Note"

export type PartialNote = Omit<Note, 'content'>

export default function NotePreviews({ notes }: { notes: PartialNote[] }) {
  const [notesState, setNotesState] = useState(notes)

  const handleNoteDelete = (deletedNoteId: string) => {
    setNotesState(prevNotes => prevNotes.filter(note => note.id !== deletedNoteId))
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