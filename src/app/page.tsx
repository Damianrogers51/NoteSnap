import { Suspense } from "react";
import Notes from "./home/preview/Notes";
import LoadingNotes from "./home/preview/LoadingNotes";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center sm:px-8 px-4 sm:py-12 py-4">
      <Suspense fallback={<LoadingNotes />}>
        <Notes />
      </Suspense>
    </div>
  )
}
