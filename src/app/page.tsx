import { Suspense } from "react";
import Notes from "./home/preview/Notes";
import LoadingNotes from "./home/preview/LoadingNotes";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center px-8 py-12">
      <Suspense fallback={<LoadingNotes />}>
        <Notes />
      </Suspense>
    </div>
  )
}
