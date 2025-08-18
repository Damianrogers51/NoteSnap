import { Loader2 } from "lucide-react"

interface DeleteDialogProps {
  handleCloseDialog: () => void
  handleConfirmDelete: () => void
  isDeletePending: boolean
  noteTitle: string
}

export default function DeleteDialog({ handleCloseDialog, handleConfirmDelete, isDeletePending, noteTitle }: DeleteDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={handleCloseDialog}
      />
      
      <div className="relative bg-background border-[.5px] border-neutral-200 rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
        <div className="flex flex-col space-y-2">
          <div className="font-medium">
            Delete Note
          </div>
          <div className="text-foreground opacity-60">
            Are you sure you want to delete &quot;{noteTitle}&quot;? This action cannot be undone.
          </div>
          
          <div className="flex space-x-3 pt-2">
            <button
              onClick={handleConfirmDelete}
              disabled={isDeletePending}
              className="flex-1 px-4 py-2 font-semibold bg-foreground text-background rounded-md hover:bg-foreground/97 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeletePending ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}