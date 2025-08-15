export default function CompanionNotePreview({ title }: { title: string }) {
  return (
    <div className="relative lg:flex hidden flex-col items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center w-[40%] py-32 h-full bg-neutral-100 border-l-[.5px] border-neutral-300 ">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      <div className="aspect-[3/5] h-full bg-background px-8 py-12 space-y-4 rounded-xl z-10 flex flex-col">
        <div className="text-xl font-bold truncate"> {title} </div>

        <div className="space-y-1">
          <div className="bg-neutral-200 w-60 h-4 rounded-sm animate-pulse"> </div>
          <div className="bg-neutral-200 w-52 h-4 rounded-sm animate-pulse"> </div>
          <div className="bg-neutral-200 w-32 h-4 rounded-sm animate-pulse"> </div>
        </div>

        <div className="space-y-1">
          <div className="bg-neutral-200 w-60 h-4 rounded-sm animate-pulse"> </div>
          <div className="bg-neutral-200 w-52 h-4 rounded-sm animate-pulse"> </div>
          <div className="bg-neutral-200 w-32 h-4 rounded-sm animate-pulse"> </div>
        </div>
      </div>
    </div>
  )
}