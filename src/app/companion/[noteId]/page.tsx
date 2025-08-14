import CompanionForm from "./CompanionForm";

export default async function CompanionPage({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params;

  return (
    <div className="flex flex-col items-center h-screen max-h-screen px-8">
      <div className="flex flex-col items-center justify-center h-full max-w-4xl space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-neutral-300 text-neutral-500 font-semibold rounded-lg px-2 py-1">
             {noteId.slice(0, 8).toUpperCase()}
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="text-3xl font-bold"> Companion Link </div>
            <div className="opacity-60"> Use this link to attach images directly to your note </div>
          </div>
        </div>

        <CompanionForm id={noteId} />
      </div>
    </div>
  );
}