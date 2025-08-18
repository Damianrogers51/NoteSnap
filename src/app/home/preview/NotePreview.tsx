'use client'

import Link from "next/link"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { calculateTimeAgo } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useTransition, useState } from "react";
import { Loader2 } from "lucide-react";
import { PartialNote } from "./NotePreviews";
import DeleteDialog from "./DeleteDialog"

interface NotePreviewProps {
  note: PartialNote
  onDelete: (deletedNoteId: string) => void
}

export default function NotePreview({ note, onDelete }: NotePreviewProps) {
  const [isDeletePending, startDeleteTransition] = useTransition()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const router = useRouter()

  function handleOpen() {
    router.push(`/note/${note.id}`)
  }

  function handleOpenCompanionLink() {
    router.push(`/companion/${note.display_id}`)
  }

  function handleDeleteClick() {
    setIsDeleteDialogOpen(true)
  }

  function handleCloseDialog() {
    setIsDeleteDialogOpen(false)
  }

  async function handleConfirmDelete() {
    setIsDeleteDialogOpen(false)
    startDeleteTransition(async () => {
      try {
        const response = await fetch(`/api/notes/${note.id}`, {
          method: 'DELETE',
        })
        if (!response.ok) {
          throw new Error('Failed to delete note')
        }
        onDelete(note.id)
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link key={note.id} href={`/note/${note.id}`} className="">
            <div className="flex flex-col space-y-3" >
              <div className="relative aspect-video bg-neutral-700 border-[.5px] border-neutral-600 hover:opacity-[.97] transition rounded-xl overflow-hidden">
                {isDeletePending && (
                  <div className="absolute top-0 left-0 size-full bg-neutral-800/50 flex items-center justify-center backdrop-blur-xl">
                    <Loader2 className="size-3 animate-spin text-neutral-400" />
                  </div>
                )}

                <div className="absolute top-2 right-2">
                  <div className="bg-neutral-800 text-neutral-400 rounded-md px-2 py-1">
                    <div className="font-bold"> {note.display_id} </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-1 leading-tight">
                <div className="text-xs font-semibold tracking-[-.5px]"> {note.title} </div>
                <div className="opacity-60"> Edited {calculateTimeAgo(note.updated_at)} </div>
              </div>
            </div>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleOpen}> Open </ContextMenuItem>
          <ContextMenuItem onClick={handleOpenCompanionLink}> Open Companion Link </ContextMenuItem>

          <ContextMenuSeparator />

          <ContextMenuItem onClick={handleDeleteClick}> Delete </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {isDeleteDialogOpen && (
        <DeleteDialog
          handleCloseDialog={handleCloseDialog}
          handleConfirmDelete={handleConfirmDelete}
          isDeletePending={isDeletePending}
          noteTitle={note.title}
        />
      )}
    </>
  )
}