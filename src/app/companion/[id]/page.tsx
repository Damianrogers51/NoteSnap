import { createClient } from "@/lib/supabase/server";
import CompanionForm from "./CompanionForm";

export default async function CompanionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const displayId = id.length === 5 
    ? id
    : (await supabase.from('notes').select('*').eq('id', id).single()).data?.display_id;
  if (!displayId) {
    return <div> Error</div>;
  }

  return (
    <div className="relative flex flex-col h-[100dvh] items-center justify-center flex-1 w-full space-y-6 rounded-xl">
      <div className="flex flex-col items-center space-y-6 w-full max-w-72">
        <div className="flex flex-col items-center space-y-3">
          <div className="bg-neutral-300 text-neutral-500 font-semibold rounded-lg px-2 py-1">
              {displayId}
          </div>

          <div className="flex flex-col items-center space-y-1 text-center">
            <div className="text-3xl font-bold"> Companion Link </div>
            <div className="opacity-60"> Use this link to attach images directly to your note </div>
          </div>
        </div>

        <CompanionForm id={displayId} />
      </div>
    </div>
  );
}