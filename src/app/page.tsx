import { Suspense } from "react";
import Notes from "./home/preview/Notes";
import LoadingNotes from "./home/preview/LoadingNotes";
import CreateNote from "./home/CreateNote";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center p-8 text-[11px] tracking-[-.5px]">
      <div className="w-full max-w-5xl space-y-8">
        <div className="flex justify-between items-center">
          <div className="font-medium"> Notes </div>

          <CreateNote />
        </div>

        <Suspense fallback={<LoadingNotes />}>
          <Notes />
        </Suspense>
      </div>
    </div>
  )
}
