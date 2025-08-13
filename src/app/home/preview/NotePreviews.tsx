'use client'

import { useEffect, useState, useTransition } from "react"
import { Note } from "../../note/[noteId]/Note"
import NotePreview from "./NotePreview"

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
    <div className="grid grid-cols-3 gap-4 gap-y-8">
      {notesState.map((note) => (
        <NotePreview key={note.id} note={note} onDelete={handleNoteDelete} />
      ))}
    </div>
  )
}