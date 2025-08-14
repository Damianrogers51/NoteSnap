import CompanionForm from "./CompanionForm";

export default async function CompanionPage({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params;

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-6 overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <div className="bg-neutral-300 text-neutral-500 font-semibold rounded-lg px-2 py-1">
             {noteId.slice(0, 8).toUpperCase()}
          </div>

          <div className="flex flex-col items-center space-y-1 text-center">
            <div className="text-2xl sm:text-3xl font-bold"> Companion Link </div>
            <div className="opacity-60 text-sm sm:text-base"> Use this link to attach images directly to your note </div>
          </div>
        </div>

        <CompanionForm id={noteId} />
      </div>
    </div>
  );
}