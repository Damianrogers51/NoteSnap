export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-4 gap-y-8">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <div className="aspect-video bg-neutral-300 rounded-xl animate-pulse"></div>

          <div className="flex flex-col space-y-1">
            <div className="bg-neutral-300 rounded-md animate-pulse h-4 w-1/2"> </div>
            <div className="bg-neutral-300 rounded-md animate-pulse h-4 w-1/3"> </div>
          </div>
        </div>
      ))}
    </div>
  )
}